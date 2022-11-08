<?php
/**
 * Dynamic render and scripts for blocks
 *
 * @package ekiline-collection
 */

/**
 * POPOVER.
 * Javascript en linea para popover, inicializar.
 *
 * @link https://developer.wordpress.org/reference/functions/wp_script_is/
 */
function ekiline_collection_block_popovers_inline_script()
{
    // Condición para mostrar js en front.
    if (! is_admin() && is_singular() && ! has_block('ekiline-collection/ekiline-popovers')) {
        return;
    }
    // Si existe Ekiline Theme, apoyar de su manejador, o ocupar nuevo manejador.
    $script_handle = (wp_script_is('ekiline-layout', 'enqueued')) ? 'ekiline-layout' : 'ekiline-collection-inline';
    wp_add_inline_script($script_handle, ekiline_block_popovers_scripts_code(), 'after');
}
add_action('wp_enqueue_scripts', 'ekiline_collection_block_popovers_inline_script', 100);

/**
 * Código JS complementario.
 * Bootstrap: inicializar tooltips, popovers
 */
function ekiline_block_popovers_scripts_code()
{
    $code = '
	function ekiline_collection_js_init_popovers(){
		document.querySelectorAll(\'[data-bs-toggle="tooltip"]\')
			.forEach(function (tooltip) {
				new bootstrap.Tooltip(tooltip);
			});

		document.querySelectorAll(\'[data-bs-toggle="popover"]\')
			.forEach(function (popover) {
			new bootstrap.Popover(popover);
			});
	}
	ekiline_collection_js_init_popovers();
';
    return $code;
}
