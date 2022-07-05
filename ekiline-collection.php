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


/**
 * TOAST.
 * Javascript en linea para toast.
 *
 * @link https://developer.wordpress.org/reference/functions/wp_script_is/
 */

function ekiline_block_toast_inline_script() {
	// Condición para mostrar js en front.
	if ( !is_admin() && is_singular() && ! has_block( 'ekiline-blocks/ekiline-toast' ) ) {
		return;
	}
	// Si existe Ekiline Theme, apoyar de su manejador, o ocupar nuevo manejador.
	$script_handle = ( wp_script_is( 'ekiline-layout', 'enqueued' ) ) ? 'ekiline-layout' : 'ekiline-blocks-inline' ;
	wp_add_inline_script( $script_handle, ekiline_block_toast_scripts_code(), 'after' );
}
add_action( 'wp_enqueue_scripts', 'ekiline_block_toast_inline_script', 100 );

/**
 * Código JS complementario.
 */
function ekiline_block_toast_scripts_code() {
$code = '
// Abrir un toast programado.
function ekiline_launch_toast(){
	// Bucar un toast programado.
	var toastProgramado = document.querySelectorAll(\'[data-ek-launch-time]\');
	// Si existe ejecutar.
	if(0!==toastProgramado.length){
		toastProgramado.forEach(function (toastItem) {
			// Toast programado.
			var nuevoToast = new bootstrap.Toast(toastItem, {
				autohide: false
			});
			// Tiempo de lanzado.
			var toastData = toastItem.dataset.ekLaunchTime;
			setTimeout(
				function() {
					// Mostrar.
					nuevoToast.show();
				},
				// tiempo.
				toastData
			);
		});
	}
}
ekiline_launch_toast();

// Abrir un toast con scroll.
function ekiline_scroll_toast(){
	// Buscar un toast programado.
	var toastScroll = document.querySelectorAll(\'.launch-scroll\');
	// Si existe ejecutar.
	if(0!==toastScroll.length){
		toastScroll.forEach(function (toastItem) {
			// Toast programado.
			var nuevoToast = new bootstrap.Toast(toastItem, {
				autohide: false
			});
			// Activacion por scroll.
			window.addEventListener(\'scroll\',
				function() {
					if( (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200) ) {
						nuevoToast.show();
					} 
				}
			);

		});
	}
}
ekiline_scroll_toast();
';
return $code;
}



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
