<?php
/**
 * Plugin Name:       Ekiline Block Collection
 * Description:       Actions and blocks based on bootstrap 5 (carousel, collapse and more). Includes Bootstrap library. Support this project to add new features and expand a customer service branch.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           3.0.1
 * Author:            Uri Lazcano (Urielink)
 * Author URI:        https://ekiline.com/ekiline-block-collection/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/license-list.html#GPLv2
 * Text Domain:       ekiline-block-collection
 * Domain Path:       /languages
 *
 * @package           ekiline-block-collection
 */

/**
 * Adds a settings link on the plugins page.
 */
function ekiline_block_collection_settings_links($links_array, $plugin_file_name){
    // New link.
    $site_admin_plugin_page_url = admin_url('admin.php?page=ekiline-block-collection');
    $new_link = sprintf('<a href="%s">%s</a>', $site_admin_plugin_page_url, __('Settings', 'ekiline-block-collection'));

    // Add to links array.
    if(strpos($plugin_file_name, basename(__FILE__))) {
        array_unshift($links_array, $new_link);
    }
    return $links_array;
}
add_filter('plugin_action_links', 'ekiline_block_collection_settings_links', 25, 2);

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
 * Registrar un solo bloque.
 * register_block_type(__DIR__ . '/build');
 */
function ekiline_block_collection_ekiline_collection_block_init()
{
    // Colección de bloques.
    $blocks = array(
        'accordion/ekiline-accordion',
        'accordion/ekiline-accordion-item',
        'accordion/ekiline-accordion-item-header',
        'accordion/ekiline-accordion-item-body',
        'collapse/ekiline-collapse',
        'modal/ekiline-modal',
        'modal/ekiline-modal-header',
        'modal/ekiline-modal-body',
        'modal/ekiline-modal-footer',
        'modal/ekiline-modal-button-resize',
        'offcanvas/ekiline-offcanvas',
        'offcanvas/ekiline-offcanvas-header',
        'offcanvas/ekiline-offcanvas-body',
        'tabs/ekiline-tabs',
        'tabs/ekiline-tabs-container',
        'tabs/ekiline-tabs-navbar',
        'tabs/ekiline-tab-link',
        'tabs/ekiline-tab-content',
        'toast/ekiline-toast',
        'toast/ekiline-toast-item',
        'progress/ekiline-progress',
        'progress/ekiline-progress-item',
        'navbar/ekiline-navbar'
    );

    foreach ( $blocks as $block ) {
        register_block_type( __DIR__ . '/build/' . $block );
    }

    // Caso especial, el carrusel es un bloque hibrido.
    register_block_type(
        __DIR__ . '/build/carousel/ekiline-carousel',
        array('render_callback' => 'ekiline_carousel_dynamic_render')
    );
    register_block_type(__DIR__ . '/build/carousel/ekiline-carousel-slide');
}
add_action('init', 'ekiline_block_collection_ekiline_collection_block_init');

/**
 * Scripts and styles in the front end.
 *
 * @link https://developer.wordpress.org/reference/functions/wp_script_is/
 *
 * Intervenir $style_deps[] para agregar dependencias adicionales.
 * Por ejemplo, si se requiere un estilo adicional.
 * $style_deps[] = 'my-additional-style-handler';
 * Lo mimso para scripts.
 * $script_deps[] = 'my-additional-script-handler';
 */
function ekiline_block_collection_required_scripts() {
    // Nombres de los manejadores de estilos y scripts.
    $text_domain        = 'ekiline-block-collection';
    $bs_style_handler   = $text_domain . '-bootstrap-style';
    $bs_script_handler  = $text_domain . '-bootstrap-script';
    $ebc_style_handler  = $text_domain . '-block-styles';
    $ebc_script_handler = $text_domain . '-block-scripts';

    // Registrar siempre, encolar condicionalmente.
    wp_register_style( $bs_style_handler, plugin_dir_url(__FILE__) . 'includes/assets/css/bootstrap.min.css', array(), '5', 'all' );
    wp_register_script( $bs_script_handler, plugin_dir_url(__FILE__) . 'includes/assets/js/bootstrap.bundle.min.js', array(), '5', true );

    // Obtener opciones de administracion (../wp-admin/admin.php?page=ekiline-block-collection).
    $load_bs_css = get_option('ekiline_block_collection_bootstrap_css', '1') === '1';
    $load_bs_js  = get_option('ekiline_block_collection_bootstrap_js', '1') === '1';

    // Inicializar arrays de dependencias.
    $style_deps  = $load_bs_css ? array( $bs_style_handler ) : array();
    $script_deps = $load_bs_js  ? array( $bs_script_handler ) : array();

    // Encolar si el usuario no ha deshabilitado.
    if ( $load_bs_css ) {
        wp_enqueue_style( $bs_style_handler );
    }

    if ( $load_bs_js ) {
        wp_enqueue_script( $bs_script_handler );
    }

    // Estilos y scripts personalizados que dependen de Bootstrap.
    wp_register_style( $ebc_style_handler, plugin_dir_url(__FILE__) . 'includes/assets/css/ekiline-styles.min.css', $style_deps, '1.0', 'all' );
    wp_register_script( $ebc_script_handler, plugin_dir_url(__FILE__) . 'includes/assets/js/ekiline-scripts.min.js', $script_deps, '1.0', true );

    // Encolar estilos y scripts personalizados.
    wp_enqueue_style( $ebc_style_handler );
    wp_enqueue_script( $ebc_script_handler );
}
add_action('wp_enqueue_scripts', 'ekiline_block_collection_required_scripts', 1);



/**
 * Enqueue block editor assets.
 * This function is used to enqueue scripts and styles for the block editor.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/enqueueing-assets-in-the-editor/
 */
function ekiline_block_collection_editor_assets() {
    // Solo cargar en el área de administración.
    if ( ! is_admin() ) {
        return;
    }

    // Nombres de los manejadores de estilos y scripts.
    $text_domain        = 'ekiline-block-collection';
    $bs_style_handler   = $text_domain . '-editor-bootstrap-style';
    $bs_script_handler  = $text_domain . '-editor-bootstrap-script';

    // Registrar siempre, encolar condicionalmente.
    wp_register_style( $bs_style_handler, plugin_dir_url(__FILE__) . 'includes/assets/css/bootstrap.min.css', array(), '5', 'all' );
    wp_register_script( $bs_script_handler, plugin_dir_url(__FILE__) . 'includes/assets/js/bootstrap.bundle.min.js', array(), '5', true );

    // Obtener opciones de administracion (../wp-admin/admin.php?page=ekiline-block-collection).
    $load_bs_css = get_option('ekiline_block_collection_bootstrap_css_editor', '1') === '1';
    $load_bs_js  = get_option('ekiline_block_collection_bootstrap_js_editor', '1') === '1';

    // Inicializar arrays de dependencias.
    $style_deps  = $load_bs_css ? array( $bs_style_handler ) : array();
    $script_deps = $load_bs_js  ? array( $bs_script_handler ) : array();

    // Encolar si el usuario no ha deshabilitado.
    if ( $load_bs_css ) {
        wp_enqueue_style( $bs_style_handler );
    }

    if ( $load_bs_js ) {
        wp_enqueue_script( $bs_script_handler );
    }

    // incorporar dashicons.
    wp_enqueue_style('dashicons');

}
add_action( 'enqueue_block_assets', 'ekiline_block_collection_editor_assets' );

/**
 * Enqueue block editor assets, hooks and filters.
 *
 * @see https://developer.wordpress.org/news/2024/09/how-to-build-a-multi-block-plugin/
 */
function ekiline_block_collection_editor_filters(){
	wp_register_script(
		'ekiline-global-hooks',
		plugins_url( 'build/index.js', __FILE__ ),
		array('wp-hooks', 'wp-blocks'),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' ),
		true
	);
    wp_enqueue_script('ekiline-global-hooks');
}
add_action( 'enqueue_block_editor_assets', 'ekiline_block_collection_editor_filters' );

/**
 * Other features.
 * - Plugin information page.
 * - Carousel script v2.
 */
define('EKILINE_COLLECTION_PATH', plugin_dir_path(__FILE__) . 'includes/');
require EKILINE_COLLECTION_PATH . 'ekiline-wp-api-extend.php';
require EKILINE_COLLECTION_PATH . 'ekiline-carousel-dynamic-render.php';
require EKILINE_COLLECTION_PATH . 'ekiline-collection-info.php';
