<?php

/**
 * Plantilla para botones de carrusel.
 */
function ekiline_carousel_button_template($dataTarget, $position = 'prev')
{
    $text = ($position === 'prev')
        ? esc_html__('Previous', 'ekiline-block-collection')
        : esc_html__('Next', 'ekiline-block-collection');
    $markup = '<button class="carousel-control-'.$position.'" type="button" '. $dataTarget .' data-bs-slide="'.$position.'">';
    $markup .= '<span class="carousel-control-'.$position.'-icon" aria-hidden="true"></span>';
    $markup .= '<span class="visually-hidden">' . $text . '</span>';
    $markup .= '</button>';
    return $markup;
}

/**
 * Carrusel.
 */
function ekiline_carousel_dynamic_render($attributes, $content)
{

    if (
        empty($attributes['ChooseType']) ||
        $attributes['ChooseType'] !== 'content' ||
        empty($attributes['contentIsDynamic'])
    ) {
        return $content;
    }

    $post_type  = $attributes['contentPostType'] ?? 'post';
    $category   = $attributes['contentCategory'] ?? '';
    $limit      = $attributes['contentPostsPerPage'] ?? 6;
    $order      = $attributes['contentOrder'] ?? 'DESC';
    $orderby    = $attributes['contentOrderBy'] ?? 'date';
    $selected_ids = $attributes['contentSelectedIds'] ?? array();

    if ('search' === $post_type && ! empty($selected_ids) && is_array($selected_ids)) {
        $args = array(
            'post_type'      => array( 'post', 'page' ),
            'post__in'       => array_map('intval', $selected_ids),
            'orderby'        => 'post__in',
            'posts_per_page' => count($selected_ids),
            'ignore_sticky_posts' => true,
        );
    } else {
        $args = array(
            'post_type'             => $post_type,
            'posts_per_page'        => $limit,
            'order'                 => $order,
            'orderby'               => $orderby,
            'ignore_sticky_posts'   => true,
        );
        if (! empty($category)) {
            if (is_array($category)) {
                $args['category__in'] = array_map('intval', $category);
            } else {
                $args['cat'] = (int) $category;
            }
        }
    }

    $query = new WP_Query($args);
    if (! $query->have_posts()) {
        return '<p>' . esc_html__('No content found for carousel.', 'ekiline-block-collection') . '</p>';
    }

    // Atributos de envoltorio con propiedades de editor.
    $anchor = isset($attributes['anchor']) ? sanitize_title($attributes['anchor']) : 'carousel' . wp_rand();
    // Complemento en enlaces
    $dataTarget = ' data-bs-target="#' . $anchor . '"';

    // Wrapper args.
    $wrapper_args = array(
        'id' => $anchor,
        'class' => 'carousel-content-dynamic carousel',
    );
    // Atributos extra de envoltorio.
    if ($attributes['SetAuto']) {
        $wrapper_args['data-bs-ride'] = 'carousel';
    }
    if ($attributes['SetTime']) {
        $wrapper_args['data-bs-interval'] = $attributes['SetTime'];
    }
    // Nuevas clases, columnas y animacion
    if (! empty($attributes['SetColumns']) && $attributes['SetColumns'] > '1') {
        $wrapper_args['class'] .= ' carousel-multiple x' . esc_attr($attributes['SetColumns']);
    }
    if (! empty($attributes['SetAnimation'])) {
        $wrapper_args['class'] .= ' carousel-' . esc_attr($attributes['SetAnimation']);
    }
    // Altura del carrusel.
    $carouselHeight = '';
    if (! empty($attributes['SetHeight'])) {
        $style = 'height:' . esc_attr($attributes['SetHeight']);
        $wrapper_args['style'] = $style;
        $carouselHeight = 'style="' . $style . '"';
    }
    $wrapper_attributes = get_block_wrapper_attributes($wrapper_args);

    $html = '<div ' . $wrapper_attributes . '>'; // .carousel

    // Carousel indicators.
    if (! empty($attributes['AddIndicators']) && $attributes['AddIndicators']) {
        $html .= '<div class="carousel-indicators">';
        for ($i = 0; $i < $query->post_count; $i++) {
            $active = ($i === 0) ? ' class="active" aria-current="true"' : '';
            $dataSlideTo = ' data-bs-slide-to="' . $i . '"';
            $html .= '<button type="button"' . $active . $dataTarget . $dataSlideTo . ' aria-label="Slide ' . $i . '"></button>';
        }
        $html .= '</div>';
    }


    // Carousel content.
    $html .= '<div class="carousel-inner" '. $carouselHeight .'>';

    while ($query->have_posts()) {
        $query->the_post();
        $active = ($query->current_post === 0) ? ' active' : '';
        $html .= '<div class="carousel-item' . esc_attr($active) . '" '. $carouselHeight .'>';

        // Condición envoltorio contentLinkSlide true.
        if (! empty($attributes['contentLinkSlide']) && $attributes['contentLinkSlide']) {
            $html .= '<a href="' . esc_url(get_permalink()) . '" class="carousel-link">';
        }

        if (has_post_thumbnail()) {
            $image = get_the_post_thumbnail(null, 'full', [ 'class' => 'd-block w-100' ]);
            // remove width and height attributes from the img tag
            $html .= preg_replace('/(width|height)="\d+"/', '', $image);
        }

        $html .= '<div class="carousel-caption">';
        $html .= '<h3>' . esc_html(get_the_title()) . '</h3>';

        // Condición envoltorio contentLinkSlide true.
        $link = '<a href="' . esc_url(get_permalink()) . '">' . esc_html__('Read more', 'ekiline-block-collection') . '</a>';
        if (! empty($attributes['contentLinkSlide']) && $attributes['contentLinkSlide']) {
            $link = '<span class="read-more as-link">' . esc_html__('Read more', 'ekiline-block-collection') . '</span>';
        }

        $html .= '<p>' . esc_html(get_the_excerpt()) . ' ' . $link . '</p>';
        $html .= '</div>'; // .carousel-caption

        if (! empty($attributes['contentLinkSlide']) && $attributes['contentLinkSlide']) {
            $html .= '</a>'; // .carousel-link
        }

        $html .= '</div>'; // .carousel-item
    }

    $html .= '</div>'; // .carousel-inner / .carousel-content

    // Carousel controls.
    if (! empty($attributes['AddControls']) && $attributes['AddControls']) {
        $html .= ekiline_carousel_button_template($dataTarget, 'prev');
        $html .= ekiline_carousel_button_template($dataTarget, 'next');
    }

    $html .= '</div>'; // .carousel


    // // LOG ATRIBUTOS.
    // $html .= '<pre class="ekiline-carousel-attributes">';
    // // $html .= esc_html( print_r( $args, true ) );
    // $html .= esc_html( print_r( $attributes, true ) );
    // $html .= '</pre>';

    wp_reset_postdata();

    return $html;
}
