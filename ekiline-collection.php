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
function ekiline_collection_ekiline_collection_block_init()
{
    // Script de coleccion.
    register_block_type(__DIR__ . '/build');
    // Bloque carrusel (ekiline-carousel.php).
    ekiline_blocks_ekiline_carousel_block_init();
}
add_action('init', 'ekiline_collection_ekiline_collection_block_init');

// Funciones complementarias.
define('EKILINE_COLLECTION_PATH', plugin_dir_path(__FILE__) . 'includes/');
require EKILINE_COLLECTION_PATH . 'ekiline-carousel.php';
require EKILINE_COLLECTION_PATH . 'shortcode-ekiline-carousel.php';
require EKILINE_COLLECTION_PATH . 'ekiline-toast.php';
require EKILINE_COLLECTION_PATH . 'ekiline-modal.php';
