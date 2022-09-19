<?php
/**
 * Dynamic render and scripts for blocks
 *
 * @package ekiline-collection
 */

/**
 * Javascript en linea para tabs.
 *
 * @link https://developer.wordpress.org/reference/functions/wp_script_is/
 */
function ekiline_block_tabs_inline_script() {
	// Condición para mostrar js en front.
	if ( ! is_admin() && is_singular() && ! has_block( 'ekiline-collection/ekiline-tabs' ) ) {
		return;
	}
	// Si existe Ekiline Theme, apoyar de su manejador, o ocupar nuevo manejador.
	$script_handle = ( wp_script_is( 'ekiline-layout', 'enqueued' ) ) ? 'ekiline-layout' : 'ekiline-collection-inline';
	wp_add_inline_script( $script_handle, ekiline_block_tabs_scripts_code(), 'after' );
}
add_action( 'wp_enqueue_scripts', 'ekiline_block_tabs_inline_script', 100 );

/**
 * Código JS complementario.
 * Afecta al marcado de los banners, dependen de la clase css .adsbygoogle.
 */
function ekiline_block_tabs_scripts_code() {
	$code = '
function persistir_tab_seleccionado(allTabs, linkItem){

	// Confirmar la existencia de tabs.
	let gtabs = document.querySelectorAll(allTabs);
	if ( !gtabs.length ) return;

	// Loop: Identificar cada grupo de tabs.
	gtabs.forEach(tgroup => {

		// ID de grupo para localStorage.
		let gtabId = tgroup.id;

		// Identificar botones dentro de grupo.
		let tabLinks = tgroup.querySelectorAll(linkItem);

		// Loop: Agregar evento a cada boton.
		tabLinks.forEach( tlink => {

			tlink.addEventListener(\'show.bs.tab\', function(ev){
				// Nomenclatura BS:  target = Tab seleccionado. relatedTarget = Tab previo.
				let tabActivo = ev.target.getAttribute(\'data-bs-target\');
				// Local storage selected tab.
				localStorage.setItem( gtabId, tabActivo );
			});

		});

		// En la recarga, buscar dato segun el id.
		const activeTab = localStorage.getItem(gtabId);

		if( activeTab ){
			const someTabTriggerEl = document.querySelector(\'[data-bs-target="\' + activeTab + \'"]\');
			const tab = new bootstrap.Tab(someTabTriggerEl);
			tab.show();
		}

	});

}
persistir_tab_seleccionado(\'.tabs-wrapper\',\'[data-bs-target]\');
';
	return $code;
}
