<?php
/**
 * Plugin Name:       Ekiline Block Collection
 * Description:       Actions and blocks based on bootstrap 5 (carousel, collapse and more). Includes Bootstrap library. Support this project to add new features and expand a customer service branch.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           2.0.1
 * Author:            Uri Lazcano (Urielink)
 * Author URI:        https://ekiline.com/ekiline-block-collection/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/license-list.html#GPLv2
 * Text Domain:       ekiline-block-collection
 *
 * @package           ekiline-block-collection
 */

/**
 * Adds a settings link on the plugins page.
 */
function ekiline_block_collection_settings_links($links_array, $plugin_file_name)
{
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
 */
function ekiline_collection_ekiline_collection_block_init()
{
    // Collection script.
    register_block_type(__DIR__ . '/build');
    // Language plugin for PHP.
    load_plugin_textdomain('ekiline-block-collection', false, basename(dirname(__FILE__)) . '/languages/');
    // Language plugin for JS Blocks.
    wp_set_script_translations('ekiline-block-collection-ekiline-block-collection-editor-script', 'ekiline-block-collection', plugin_dir_path(__FILE__) . 'languages');
}
add_action('init', 'ekiline_collection_ekiline_collection_block_init');

/**
 * Scripts and styles in the front end.
 *
 * @link https://developer.wordpress.org/reference/functions/wp_script_is/
 */
function ekiline_collection_required_scripts()
{
    // Condition: If Ekiline is not your theme, enable bootstrap plugins.
    $theme       = wp_get_theme();
    $text_domain = 'ekiline-block-collection';

    if ('Ekiline' !== $theme->name || 'Ekiline' !== $theme->parent_theme) {
        wp_enqueue_style($text_domain . '-bootstrap-style', plugin_dir_url(__FILE__) . 'includes/assets/css/bootstrap.min.css', array(), '5', 'all');
        wp_enqueue_script($text_domain . '-bootstrap-script', plugin_dir_url(__FILE__) . 'includes/assets/js/bootstrap.bundle.min.js', array(), '5', true);
    }
    if ('Ekiline' === $theme->name || 'Ekiline' === $theme->parent_theme) {
        wp_dequeue_style($text_domain . '-bootstrap-style');
        wp_dequeue_script($text_domain . '-bootstrap-script');
    }

    // Condition: If Ekiline is not your theme, enable plugin manager.
    $style_handler  = $text_domain . '-bootstrap-style';
    $script_handler = $text_domain . '-bootstrap-script';
    if('Ekiline' === $theme->name || 'Ekiline' === $theme->parent_theme) {
        $style_handler  = 'ekiline-style';
        $script_handler = 'ekiline-layout';
    }
    wp_enqueue_style($text_domain . '-block-styles', plugin_dir_url(__FILE__) . 'includes/assets/css/ekiline-collection-block-styles.css', array( $style_handler ), '1.0', 'all');
    wp_enqueue_script($text_domain . '-block-scripts', plugin_dir_url(__FILE__) . 'includes/assets/js/ekiline-collection-block-scripts.js', array( $script_handler ), '1.0', true);

    // Plugin options.
    $opcion_plugin_styles  = get_option('ekiline_block_collection_bootstrap_css', '1');
    $opcion_plugin_scripts = get_option('ekiline_block_collection_bootstrap_js', '1');

    if ($opcion_plugin_styles == '0') {
        wp_dequeue_style($text_domain . '-bootstrap-style');
        wp_dequeue_style($text_domain . '-block-styles');
    }
    if ($opcion_plugin_scripts == '0') {
        wp_dequeue_script($text_domain . '-bootstrap-script');
        wp_dequeue_script($text_domain . '-block-scripts');
    }
}
add_action('wp_enqueue_scripts', 'ekiline_collection_required_scripts', 1);

/**
 * Other features.
 * - Plugin information page.
 * - Carousel script v2.
 */
define('EKILINE_COLLECTION_PATH', plugin_dir_path(__FILE__) . 'includes/');
require EKILINE_COLLECTION_PATH . 'ekiline-collection-info.php';
require EKILINE_COLLECTION_PATH . 'ekiline-collection-carousel.php';
