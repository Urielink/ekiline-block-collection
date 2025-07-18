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
        'post_type'      => $post_type,
        'posts_per_page' => $limit,
        'order'          => $order,
        'orderby'        => $orderby,
    ];

    if ( $category ) {
        $args['cat'] = (int) $category;
    }

    $query = new WP_Query( $args );
    if ( ! $query->have_posts() ) {
        return '<p>' . esc_html__( 'No content found for carousel.', 'ekiline-block-collection' ) . '</p>';
    }

    $html = '<div class="wp-block-ekiline-block-collection-ekiline-carousel carousel-content-dynamic">';
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

    // Mostrar los atributos.
    // $html .= '<pre class="ekiline-carousel-attributes">';
    // $html .= esc_html( print_r( $attributes, true ) );
    // $html .= '</pre>';

    wp_reset_postdata();

    return $html;
}
