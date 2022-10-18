<?php
/**
 * Plugin Name:       Ekiline Block Collection
 * Description:       Actions and blocks based on bootstrap 5 (carousel, collapse and more). Includes Bootstrap library. Support this project to add new features and expand a customer service branch.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.3
 * Author:            Uri Lazcano (Urielink)
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/license-list.html#GPLv2
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
 *
 * Para incorporar el idioma se requiere una serie de pasos, y crear POT manual.
 * @link https://developer.wordpress.org/block-editor/how-to-guides/internationalization/
 * @link https://developer.wordpress.org/cli/commands/i18n/make-json/
 * El manual indica que hagas un registro del script con dependencias.
 * Pero, también es posible abstraerlo, se requiere saber el handler del script.
 */
function ekiline_collection_ekiline_collection_block_init() {
	// Script de coleccion.
	register_block_type( __DIR__ . '/build' );
	// Bloque carrusel (ekiline-carousel.php).
	ekiline_collection_carousel_block_init();
	// Idioma plugin para PHP.
	load_plugin_textdomain( 'ekiline-collection', false, basename( dirname( __FILE__ ) ) . '/languages/' );
	// Idioma plugin para Bloques JS.
	wp_set_script_translations( 'ekiline-collection-ekiline-collection-editor-script', 'ekiline-collection', plugin_dir_path( __FILE__ ) . 'languages' );
}
add_action( 'init', 'ekiline_collection_ekiline_collection_block_init' );

// Funciones complementarias.
define( 'EKILINE_COLLECTION_PATH', plugin_dir_path( __FILE__ ) . 'includes/' );
require EKILINE_COLLECTION_PATH . 'ekiline-collection-carousel.php';
require EKILINE_COLLECTION_PATH . 'ekiline-collection-shortcode-carousel.php';
require EKILINE_COLLECTION_PATH . 'ekiline-collection-toast.php';
require EKILINE_COLLECTION_PATH . 'ekiline-collection-modal.php';
require EKILINE_COLLECTION_PATH . 'ekiline-collection-tabs.php';
require EKILINE_COLLECTION_PATH . 'ekiline-collection-popover.php';
require EKILINE_COLLECTION_PATH . 'ekiline-collection-info.php';

/**
 * Scripts y estilos en el front.
 *
 * @link https://developer.wordpress.org/reference/functions/wp_script_is/
 */
function ekiline_collection_required_scripts() {
	// Condicion: Si Ekiline no es su tema, habilitar complementos bootstrap.
	$theme       = wp_get_theme();
	$text_domain = 'ekiline-collection';

	if ( 'Ekiline' !== $theme->name || 'Ekiline' !== $theme->parent_theme ) {
		wp_enqueue_style( $text_domain . '-bootstrap-style', plugin_dir_url( __FILE__ ) . 'includes/assets/css/bootstrap.min.css', array(), '5', 'all' );
		wp_enqueue_script( $text_domain . '-bootstrap-script', plugin_dir_url( __FILE__ ) . 'includes/assets/js/bootstrap.bundle.min.js', array(), '5', true );
		wp_register_script( $text_domain . '-inline', '', array(), '1', true );
		wp_enqueue_script( $text_domain . '-inline' );
	}
	if ( 'Ekiline' === $theme->name || 'Ekiline' === $theme->parent_theme ) {
		wp_dequeue_style( $text_domain . '-bootstrap-style' );
		wp_dequeue_script( $text_domain . '-bootstrap-script' );
		wp_dequeue_script( $text_domain . '-inline' );
	}
}
add_action( 'wp_enqueue_scripts', 'ekiline_collection_required_scripts', 1 );

/**
 * Estilos de apoyo para el editor.
 * Incorporar los estilos de bootstrap.
 * @link https://developer.wordpress.org/reference/functions/add_editor_style/
 */
// if ( 'Ekiline' !== wp_get_theme()->name || 'Ekiline' !== wp_get_theme()->parent_theme ) {
// 	$block_styles = array(
// 		plugin_dir_url( __FILE__ ) . 'includes/assets/css/bootstrap.min.css',
// 	);
// 	add_editor_style( $block_styles );
// }
