<?php
/**
 * Filtros para modificar las clases de los bloques.
 * Version 1  - 2021-09-29
 **/
function agregar_clase_menu( $block_content, $block ) {

    // Add the custom class to the block content using the HTML API.
    $processor = new WP_HTML_Tag_Processor( $block_content );

    if ( $processor->next_tag( 'ul' ) ) {
        $processor->add_class( 'navbar-nav' );
    }

    return $processor->get_updated_html();
}
add_filter( 'render_block_core/navigation', 'agregar_clase_menu', 10, 2 );


function agregar_clase_menu_links( $block_content, $block ) {

    // Add the custom class to the block content using the HTML API.
    $processor = new WP_HTML_Tag_Processor( $block_content );

    if ( $processor->next_tag( 'li' ) ) {
        $processor->add_class( 'nav-item' );
    }
    if ( $processor->next_tag( 'a' ) ) {
        $processor->add_class( 'nav-link' );
    }

    return $processor->get_updated_html();
}
add_filter( 'render_block_core/navigation-link', 'agregar_clase_menu_links', 10, 2 );


function agregar_clase_menu_submenus( $block_content, $block ) {

    // Add the custom class to the block content using the HTML API.
    $processor = new WP_HTML_Tag_Processor( $block_content );

    if ( $processor->next_tag( 'li' ) ) {
        // $processor->remove_class( 'wp-block-navigation-item' );
        $processor->add_class( 'nav-item' ); // test: dropdown w-100 flex-wrap
    }
    if ( $processor->next_tag( 'button' ) ) {
        $processor->add_class( 'nav-link dropdown-toggle ps-1 pe-3' );
        // $processor->set_attribute( 'data-bs-toggle', 'dropdown' );
        // $processor->set_attribute('aria-expanded', 'false');
    }
    if ( $processor->next_tag( 'ul' ) ) {
        $processor->add_class( 'dropdown-menu' ); // test: w-100 position-relative
    }

    return $processor->get_updated_html();
}
add_filter( 'render_block_core/navigation-submenu', 'agregar_clase_menu_submenus', 10, 2 );

