<?php

/**
 * Dynamic render for carousel v2
 *
 * @package ekiline-block-collection
 *
 * @link ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/
 * @link ref https://rudrastyh.com/gutenberg/dynamic-blocks.html
 */

function ekiline_bc_carousel_dynamic_render_callback($block_attributes, $content)
{
    $recent_posts = wp_get_recent_posts(array(
        'numberposts' => 1,
        'post_status' => 'publish',
    ));
    if (count($recent_posts) === 0) {
        return 'No posts';
    }
    $post = $recent_posts[ 0 ];
    $post_id = $post['ID'];
    return sprintf(
        '<a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a>',
        esc_url(get_permalink($post_id)),
        esc_html(get_the_title($post_id))
    );
}

function ekiline_bc_carousel_dynamic()
{
    // automatically load dependencies and version
    // $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');
    $asset_file = include(plugin_dir_path(__FILE__) . '../build/index.asset.php');

    // // Error: No se encuentra el script.
    // // Solucion temporal: desactivar ya está registrado como un grupo.
    // wp_register_script(
    //     'ekiline-carousel-dynamic',
    //     // plugins_url( 'build/block.js', __FILE__ ),
    //     plugins_url( '../build/index.js', __FILE__ ),
    //     $asset_file['dependencies'],
    //     $asset_file['version'],
    //     true
    // );

    register_block_type('ekiline-block-collection/ekiline-carousel-dynamic', array(
        'api_version' => 3,
        'editor_script' => 'ekiline-carousel-dynamic',
        'render_callback' => 'ekiline_bc_carousel_dynamic_render_callback'
    ));

}
add_action('init', 'ekiline_bc_carousel_dynamic');
