<?php
/**
 * Plugin Name:       Ekiline Block Collection
 * Description:       Complementos para tu sitio, basado en Bootstrap.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Uri Lazcano (Urielink)
 * License:           GPL-2.0-or-later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       ekiline-collection
 *
 * @package           ekiline-collection
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function ekiline_collection_ekiline_collection_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'ekiline_collection_ekiline_collection_block_init' );
