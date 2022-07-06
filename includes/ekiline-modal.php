<?php
/**
 * Modal.
 * Prueba, intentar mover el contenido de un bloque al final de la pagina con PHP.
 * https://developer.wordpress.org/reference/functions/parse_blocks/
 * Prueba render block cambiar contenido tampoco.
 * @https://developer.wordpress.org/reference/hooks/render_block/
 * Otra prueba.
 * https://florianbrinkmann.com/en/display-specific-gutenberg-blocks-of-a-post-outside-of-the-post-content-in-the-theme-5620/
 * Falta extender esta funcion para los widgets.
 */
function ekiline_block_modal_find_and_move() {

	// global $post;
	// print_r($post);

	// necesita ser definido si el bloque esta en una publicacion, le afecta en el admin.
	// if ( is_singular() && in_the_loop() && is_main_query() ) {
	if ( !is_admin() && is_singular() ){
		if ( has_filter( 'the_content', 'remove_blocks' ) ){
			// echo 'remove_blocks() is active<br>';
			remove_filter( 'the_content', 'remove_blocks');
		}

		// $blocks = parse_blocks( $post->post_content );

		$blocks = parse_blocks( get_the_content() );
		// print_r($blocks);
		foreach ( $blocks as $block ) {
			if ( 'ekiline-blocks/ekiline-modal' === $block['blockName'] ) {
				echo apply_filters( 'the_content', render_block( $block ) );
				// break; // imprime solo uno y continua.
			}
		}
	}
}
add_action( 'wp_footer', 'ekiline_block_modal_find_and_move', 0 );


//If single block exists on page or post don't show it with the other blocks
function remove_blocks() {
	// Revisar si el bloque esta en el contenido. le afecta en el admin.
	//   if ( is_singular() && in_the_loop() && is_main_query() ) {
		if ( !is_admin() && is_singular() ){
		//parse the blocks so they can be run through the foreach loop
		$blocks = parse_blocks( get_the_content() );
		foreach ( $blocks as $block ) {
			//look to see if your block is in the post content -> if yes continue past it if no then render block as normal
			if ( 'ekiline-blocks/ekiline-modal' === $block['blockName'] ) {
				continue;
			} else {
				echo render_block( $block );
			}
		}
	  }
	}
add_filter( 'the_content', 'remove_blocks');


/**
 * Javascript en linea para modal.
 *
 * @link https://developer.wordpress.org/reference/functions/wp_script_is/
 */

function ekiline_block_modal_inline_script() {
	// Condición para mostrar js en front.
	if ( !is_admin() && is_singular() && ! has_block( 'ekiline-blocks/ekiline-modal' ) ) {
		return;
	}
	// Si existe Ekiline Theme, apoyar de su manejador, o ocupar nuevo manejador.
	$script_handle = ( wp_script_is( 'ekiline-layout', 'enqueued' ) ) ? 'ekiline-layout' : 'ekiline-blocks-inline' ;
	wp_add_inline_script( $script_handle, ekiline_block_modal_scripts_code(), 'after' );
}
add_action( 'wp_enqueue_scripts', 'ekiline_block_modal_inline_script', 100 );

/**
 * Código JS complementario.
 * Afecta al marcado de los banners, dependen de la clase css .adsbygoogle.
 */
function ekiline_block_modal_scripts_code() {
$code = '
// Cerrar una ventana modal si está abierta.
function ekiline_close_modal(){
	// Bucar un modal abierto.
	const ventanasAbiertas = document.querySelectorAll(\'.modal.show\');
	// Si existe cerrar con click.
	if(0!==ventanasAbiertas.length){
		ventanasAbiertas.forEach(function(el){
			el.click();
		});
	}
}
// Abrir un modal programado.
function ekiline_launch_modal(){
	// Bucar un modal programado.
	const modalProgramado = document.querySelectorAll(\'[data-ek-time]\');
	// Si existe ejecutar.
	if(0!==modalProgramado.length){
		modalProgramado.forEach(function (modalItem) {
			// Modal programado.
			const nuevoModal = new bootstrap.Modal(modalItem, {});
			// Tiempo de lanzado.
			const modalData = modalItem.dataset.ekTime;
			setTimeout(
				function() {
					// Si existe un modal abierto, cerrar.
					ekiline_close_modal();
					// Despues de cerrar, mostrar.
					nuevoModal.show();
				},
				// tiempo.
				modalData
			);
		});
	}
}
ekiline_launch_modal();
';
return $code;
}
