<?php

/**
 * Plugin Name: REST API - Post list randomize
 * Description: Randomize the content list in REST API passing `orderby=rand` as parameter.
 * Version:     1.0.0
 * Author:      Felipe Elia | Codeable (adapted for Ekiline by Uri)
 * Author URI:  https://codeable.io/developers/felipe-elia?ref=qGTOJ
 */

/**
 * Add support for 'orderby=rand' to REST API queries for all post types with REST enabled.
 *
 * This allows the WordPress editor (via useSelect) and other consumers of the REST API
 * to use the 'rand' option when retrieving content. Especially useful for features like
 * randomized carousels or content blocks.
 *
 * For reference: https://developer.wordpress.org/rest-api/
 *
 * @param array $query_params Accepted parameters.
 * @return array
 */
function ekiline_add_rand_orderby_rest_param($query_params)
{
    if (isset($query_params['orderby']['enum']) && is_array($query_params['orderby']['enum'])) {
        $query_params['orderby']['enum'][] = 'rand';
    }
    return $query_params;
}

/**
 * Register the above support on all public post types with REST enabled.
 * This ensures the carousel and similar dynamic blocks can use randomized queries.
 */
function ekiline_register_rand_orderby_for_rest_post_types()
{
    $post_types = get_post_types([ 'public' => true, 'show_in_rest' => true ]);
    foreach ($post_types as $post_type) {
        add_filter("rest_{$post_type}_collection_params", 'ekiline_add_rand_orderby_rest_param');
    }
}
add_action('init', 'ekiline_register_rand_orderby_for_rest_post_types');
