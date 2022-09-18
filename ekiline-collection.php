<?php
/**
 * Plugin Name:       Ekiline Block Collection
 * Description:       HTML plugins for your project, based on Bootstrap 5.
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
 *
 * Para incorporar el idioma se requiere una serie de pasos, y crear POT manual.
 * @link https://developer.wordpress.org/block-editor/how-to-guides/internationalization/
 * @link https://developer.wordpress.org/cli/commands/i18n/make-json/
 * El manual indica que hagas un registro del script con dependencias.
 * Pero, también es posible abstraerlo, se requiere saber el handler del script.
 */
function ekiline_collection_ekiline_collection_block_init()
{
    // Script de coleccion.
    register_block_type(__DIR__ . '/build');
    // Bloque carrusel (ekiline-carousel.php).
    ekiline_carousel_block_init();
    // Idioma plugin para PHP.
    load_plugin_textdomain('ekiline-collection', false, basename(dirname(__FILE__)) . '/languages/');
    // Idioma plugin para Bloques JS.
    wp_set_script_translations('ekiline-collection-ekiline-collection-editor-script', 'ekiline-collection', plugin_dir_path(__FILE__) . 'languages');
}
add_action('init', 'ekiline_collection_ekiline_collection_block_init');

// Funciones complementarias.
define('EKILINE_COLLECTION_PATH', plugin_dir_path(__FILE__) . 'includes/');
require EKILINE_COLLECTION_PATH . 'ekiline-carousel.php';
require EKILINE_COLLECTION_PATH . 'shortcode-ekiline-carousel.php';
require EKILINE_COLLECTION_PATH . 'ekiline-toast.php';
require EKILINE_COLLECTION_PATH . 'ekiline-modal.php';
require EKILINE_COLLECTION_PATH . 'ekiline-tabs.php';


/*
* Auxiliar solo para desarrollo.
* Para conocer la lista de bloques:
* @ref https://developer.wordpress.org/reference/functions/get_dynamic_block_names/
* @ref https://developer.wordpress.org/block-editor/reference-guides/core-blocks/
* get_dynamic_block_names();
*/

function show_registered_blocks()
{
    // Conocer los bloques existentes.
    $bloques = get_dynamic_block_names();
    $lista = '';
    foreach ($bloques as $key => $bloque) {
        $lista .= '(' . $key  . ') ' . $bloque . (next($bloques) === true ? ', ' : '') ;
    }
    $aviso = '<div class="alert alert-success">' . $lista . '</div>';
    echo $aviso;
}
    // add_action('wp_footer','show_registered_blocks',100);


    /**
     * Detectar si un bloque esta en funcionamineto en los widgets.
     * @link https://wordpress.stackexchange.com/questions/392493/find-if-widget-block-is-active
     */
    function is_active_block_widget_wpse($blockname)
    {
        $widget_blocks = get_option('widget_block');
        foreach ((array) $widget_blocks as $widget_block) {
            if (! empty($widget_block['content'])
                && has_block($blockname, $widget_block['content'])
            ) {
                return true;
            }
        }
        return false;
    }

    function detectar_widget()
    {
        // Funcion para detectar widget.
        $resultado = is_active_block_widget_wpse('ekiline-blocks/ekiline-modal');
        if (true === $resultado) {
            echo 'widget activo';
        }
    }
    // add_action( 'wp_footer', 'detectar_widget', 0 );



/**
 * Scripts y estilos en el front.
 * @link https://developer.wordpress.org/reference/functions/wp_script_is/
 */
function ekiline_collection_required_scripts()
{
    // Condicion: Si Ekiline no es su tema, habilitar complementos bootstrap.
    $theme       = wp_get_theme();
    $text_domain = 'ekiline-collection';

    if ('Ekiline' !== $theme->name || 'Ekiline' !== $theme->parent_theme) {
        wp_enqueue_style($text_domain . '-bootstrap-style', plugin_dir_url(__FILE__) . 'assets/css/bootstrap.min.css', array(), '5', 'all');
        wp_enqueue_script($text_domain . '-bootstrap-script', plugin_dir_url(__FILE__) . 'assets/js/bootstrap.bundle.min.js', array(), '5', true);
        // Si no existe el manejador 'ekiline-layout' de Ekiline Theme, crear uno nuevo.
        wp_register_script($text_domain . '-inline', '', array(), '', true);
        wp_enqueue_script($text_domain . '-inline');
    }
    if ('Ekiline' === $theme->name || 'Ekiline' === $theme->parent_theme) {
        wp_dequeue_style($text_domain . '-bootstrap-style');
        wp_dequeue_script($text_domain . '-bootstrap-script');
        wp_dequeue_script($text_domain . '-inline');
    }
}
// add_action( 'wp_enqueue_scripts', 'ekiline_collection_required_scripts', 1 );
