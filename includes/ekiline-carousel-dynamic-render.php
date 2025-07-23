<?php
function ekiline_carousel_dynamic_render( $attributes, $content ) {

    if (
        empty( $attributes['ChooseType'] ) ||
        $attributes['ChooseType'] !== 'content' ||
        empty( $attributes['contentIsDynamic'] )
    ) {
        return $content;
    }

    $post_type  = $attributes['contentPostType'] ?? 'post';
    $category   = $attributes['contentCategory'] ?? '';
    $limit      = $attributes['contentPostsPerPage'] ?? 6;
    $order      = $attributes['contentOrder'] ?? 'DESC';
    $orderby    = $attributes['contentOrderBy'] ?? 'date';

    $args = [
        'post_type'             => $post_type,
        'posts_per_page'        => $limit,
        'order'                 => $order,
        'orderby'               => $orderby,
        'ignore_sticky_posts'   => true,
    ];

    if ( ! empty( $category ) ) {
        if ( is_array( $category ) ) {
            $args['category__in'] = array_map( 'intval', $category );
        } else {
            $args['cat'] = (int) $category;
        }
    }

    $query = new WP_Query( $args );
    if ( ! $query->have_posts() ) {
        return '<p>' . esc_html__( 'No content found for carousel.', 'ekiline-block-collection' ) . '</p>';
    }

    // Atributos de envoltorio con propiedades de editor.
    $anchor = isset( $attributes['anchor'] ) ? sanitize_title( $attributes['anchor'] ) : 'carousel' . wp_rand();
	$wrapper_attributes = get_block_wrapper_attributes(
        array(
            'class' => 'carousel-content-dynamic carousel',
            'id' => $anchor
        )
    );
    $html = '<div ' . $wrapper_attributes . '>';

    // Carousel indicators.
    $html .= '<div class="carousel-indicators">';
    for ( $i = 0; $i < $query->post_count; $i++ ) {
        $active = ( $i === 0 ) ? ' class="active" aria-current="true"' : '';
        $html .= '<button type="button"' . $active . ' aria-label="Slide ' . ( $i + 1 ) . '"></button>';
    }
    $html .= '</div>';
    // Carousel content.
    $html .= '<div class="carousel-content">';
    $html .= '<div class="carousel-inner">';

    while ( $query->have_posts() ) {
        $query->the_post();
        $active = ( $query->current_post === 0 ) ? ' active' : '';
        $html .= '<div class="carousel-item' . esc_attr( $active ) . '">';

        if ( has_post_thumbnail() ) {
            $html .= get_the_post_thumbnail( null, 'full', [ 'class' => 'd-block w-100' ] );
        }

        $html .= '<div class="carousel-caption">';
        $html .= '<h3>' . esc_html( get_the_title() ) . '</h3>';
        $html .= '<p>' . esc_html( get_the_excerpt() ) . '</p>';
        $html .= '<a href="' . esc_url( get_permalink() ) . '">' . esc_html__( 'Read more', 'ekiline-block-collection' ) . '</a>';
        $html .= '</div>'; // .carousel-caption

        $html .= '</div>'; // .carousel-item
    }

    $html .= '</div></div>'; // .carousel-inner / .carousel-content

    // Carousel controls.
    $html .= '<button class="carousel-control-prev" type="button">';
    $html .= '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
    $html .= '<span class="visually-hidden">' . esc_html__( 'Previous', 'ekiline-block-collection' ) . '</span>';
    $html .= '</button>';

    $html .= '<button class="carousel-control-next" type="button">';
    $html .= '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
    $html .= '<span class="visually-hidden">' . esc_html__( 'Next', 'ekiline-block-collection' ) . '</span>';
    $html .= '</button>';

    // Mostrar los atributos seleccionados.
    $html .= '<pre class="ekiline-carousel-attributes">';
    // $html .= esc_html( print_r( $args, true ) );
    $html .= esc_html( print_r( $attributes, true ) );
    $html .= '</pre>';

    wp_reset_postdata();

    return $html;
}
