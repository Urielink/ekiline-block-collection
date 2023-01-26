<?php
/**
 * Dynamic render and scripts for blocks
 *
 * @package ekiline-collection
 */

/**
 * Buscar un bloque y eliminarlo del loop de bloques en el contenido.
 *
 * @param array $content the content.
 * @return array $content contenido del loop.
 *
 * @link https://developer.wordpress.org/reference/functions/serialize_blocks/.
 * @link https://developer.wordpress.org/reference/functions/parse_blocks/.
 */
function ekiline_collection_remove_blocks( $content ) {

	// Idetificador de bloque.
	$find_block = 'ekiline-collection/ekiline-modal';

	// Aplicar en publicacion en frontend y solo que tenga el bloque.
	if ( ! is_admin() && is_singular() && has_block( $find_block ) ) {
		// Analizar bloques existentes.
		$blocks = parse_blocks( get_the_content() );
		$output = '';

		foreach ( $blocks as $block ) {
			// Ignorar del loop el bloque deseado.
			if ( $find_block === $block['blockName'] ) {
				continue;
			} else {
				$output .= render_block( $block );
			}
		}
		$content = $output;
	}
	return $content;
}
add_filter( 'the_content', 'ekiline_collection_remove_blocks' );

/**
 * Modal. Sin argumentos.
 * 
 * Prueba, intentar mover el contenido de un bloque al final de la pagina con PHP.
 * link https://developer.wordpress.org/reference/functions/parse_blocks/
 * Prueba render block cambiar contenido tampoco.
 * link https://developer.wordpress.org/reference/hooks/render_block/
 * Otra prueba.
 * link https://florianbrinkmann.com/en/display-specific-gutenberg-blocks-of-a-post-outside-of-the-post-content-in-the-theme-5620/
 * Falta extender esta funcion para los widgets.
 */
function ekiline_collection_block_modal_find_and_move() {

	// Idetificador de bloque.
	$find_block = 'ekiline-collection/ekiline-modal';

	// Aplicar en publicacion en frontend y solo que tenga el bloque.
	if ( ! is_admin() && is_singular() && has_block( $find_block ) ) {

		// Remover filtro (ekiline_collection_remove_blocks) para leer y rescatar dato.
		if ( has_filter( 'the_content', 'ekiline_collection_remove_blocks' ) ) {
			remove_filter( 'the_content', 'ekiline_collection_remove_blocks' );
		}

		// Analizar bloques existentes.
		$blocks = parse_blocks( get_the_content() );

		// Enviar al pie del portal el bloque deseado.
		foreach ( $blocks as $block ) {
			if ( $find_block === $block['blockName'] ) {
				echo render_block( $block );
			}
		}
	}
}
add_action( 'wp_footer', 'ekiline_collection_block_modal_find_and_move', 0 );
