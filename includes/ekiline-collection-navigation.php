<?php
/**
 * Filtros para modificar las clases de los bloques.
 * Version 1  - 2021-09-29
 * 02152025: problema, aplica estas clases a cualquier navegacion.
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
        $processor->add_class( 'nav-item dropdown' ); // BS aplicar para usar bootstrap
        $processor->remove_class( 'has-child' ); // BS aplicar para usar bootstrap
        // $processor->remove_class( '_wp-block-navigation-item' );
        // $processor->remove_class( '_open-on-hover-click' );
        // $processor->remove_class( '_wp-block-navigation-submenu' );
    }
    if ( $processor->next_tag( 'a' ) ) {
        $processor->add_class( 'nav-link dropdown-toggle' ); // BS aplicar para usar bootstrap
        // $processor->remove_class( '_wp-block-navigation-item__content' );
    }
    if ( $processor->next_tag( 'button' ) ) {
        $processor->add_class( 'nav-link dropdown-toggle' );
        $processor->set_attribute( 'data-bs-toggle', 'dropdown' ); // BS aplicar para usar bootstrap
        $processor->set_attribute('aria-expanded', 'false'); // BS aplicar para usar bootstrap
        // $processor->remove_class( '_wp-block-navigation__submenu-icon' );
        // $processor->remove_class( '_wp-block-navigation-submenu__toggle' );
    }
    if ( $processor->next_tag( 'ul' ) ) {
        $processor->add_class( 'dropdown-menu' ); // test: w-100 position-relative
        // $processor->remove_class( '_wp-block-navigation__submenu-container' );
        // $processor->remove_class( '_wp-block-navigation-submenu' );
    }

    return $processor->get_updated_html();
}
add_filter( 'render_block_core/navigation-submenu', 'agregar_clase_menu_submenus', 10, 2 );

