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
function ekiline_collection_remove_blocks($content)
{

    // Idetificador de bloque.
    $find_block = 'ekiline-collection/ekiline-modal';

    // Aplicar en publicacion en frontend y solo que tenga el bloque.
    if (! is_admin() && is_singular() && has_block($find_block)) {
        // Analizar bloques existentes.
        $blocks = parse_blocks(get_the_content());
        $output = '';

        foreach ($blocks as $block) {
            // Ignorar del loop el bloque deseado.
            if ($find_block === $block['blockName']) {
                continue;
            } else {
                $output .= render_block($block);
            }
        }
        $content = $output;
    }
    return $content;
}
add_filter('the_content', 'ekiline_collection_remove_blocks');

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
function ekiline_collection_block_modal_find_and_move()
{

    // Idetificador de bloque.
    $find_block = 'ekiline-collection/ekiline-modal';

    // Aplicar en publicacion en frontend y solo que tenga el bloque.
    if (! is_admin() && is_singular() && has_block($find_block)) {

        // Remover filtro (ekiline_collection_remove_blocks) para leer y rescatar dato.
        if (has_filter('the_content', 'ekiline_collection_remove_blocks')) {
            remove_filter('the_content', 'ekiline_collection_remove_blocks');
        }

        // Analizar bloques existentes.
        $blocks = parse_blocks(get_the_content());

        // Enviar al pie del portal el bloque deseado.
        foreach ($blocks as $block) {
            if ($find_block === $block['blockName']) {
                echo render_block($block);
            }
        }
    }
}
add_action('wp_footer', 'ekiline_collection_block_modal_find_and_move', 0);

/**
 * Javascript en linea para modal.
 *
 * @link https://developer.wordpress.org/reference/functions/wp_script_is/
 */
function ekiline_collection_block_modal_inline_script()
{
    // Condición para mostrar js en front.
    if (! is_admin() && is_singular() && ! has_block('ekiline-collection/ekiline-modal')) {
        return;
    }
    // Si existe Ekiline Theme, apoyar de su manejador, o ocupar nuevo manejador.
    $script_handle = (wp_script_is('ekiline-layout', 'enqueued')) ? 'ekiline-layout' : 'ekiline-collection-inline';
    wp_add_inline_script($script_handle, ekiline_collection_block_modal_scripts_code(), 'after');
}
add_action('wp_enqueue_scripts', 'ekiline_collection_block_modal_inline_script', 100);

/**
 * Código JS complementario.
 * Agrega opciones al modal en el front.
 */
function ekiline_collection_block_modal_scripts_code()
{
    $code = '
// Cerrar una ventana modal si está abierta.
function ekiline_collection_js_close_modal() {
	// Bucar un modal abierto.
	const ventanasAbiertas = document.querySelectorAll(\'.modal.show\');
	// Si existe cerrar con click.
	if(0!==ventanasAbiertas.length) {
		ventanasAbiertas.forEach(function(el) {
			el.click();
		});
	}
}
// Abrir un modal programado.
function ekiline_collection_js_launch_modal() {
	// Bucar un modal programado.
	const modalProgramado = document.querySelectorAll(\'[data-ek-time]\');
	// Si existe ejecutar.
	if(0!==modalProgramado.length) {
		modalProgramado.forEach(function (modalItem) {
			// Modal programado.
			const nuevoModal = new bootstrap.Modal(modalItem, {});
			// Tiempo de lanzado.
			const modalData = modalItem.dataset.ekTime;
			setTimeout(
				function() {
					// Si existe un modal abierto, cerrar.
					ekiline_collection_js_close_modal();
					// Despues de cerrar, mostrar.
					nuevoModal.show();
				},
				// tiempo.
				modalData
			);
		});
	}
}
ekiline_collection_js_launch_modal();

// Cambiar el tamaño de modal.
function ekiline_collection_js_modal_behavior(){
	var modalResizeBtn = document.querySelector(\'.modal-resize\');
	if ( modalResizeBtn ){
		modalResizeBtn.addEventListener(\'click\', function() {
			var modalOpen = document.querySelector(\'.modal-dialog\');
			modalOpen.classList.toggle(\'modal-fullscreen\');
			this.firstElementChild.classList.toggle(\'text-success\');
		}, false);
	}
}
ekiline_collection_js_modal_behavior();
';
    return $code;
}
