/**
 * Tarea desarrollar un nuevo boton para toolbar.
 * Este debe aparecer en core/paragraph, button, image, gallery.
 * - verificar el dato.
 * Al dar click ejecuta un popover.
 * Dentro del popover lanza un __experimentalLinkControl con opciones personalizadas.
 * Las opciones son:
 * - Ejecutar: modal, offcanvas, colapse. Esto debe estar abierto a inlcuir futuras opciones.
 * Problema:
 * - Averiguar como seleccionar una palabra.
 * - Averigaur como convertirla en enlace con atributos propios:
 * - - base: rel, target, follow.
 * - - extra:
 * class="dropdown-toggle"
 * type="button"
 * href="#ejemplo"
 * data-bs-target="#ejemplo"
 * data-bs-toggle="offcanvas*", collapse*, dropdown, modal*, popover, tooltip
 * role="button"
 * aria-controls="ejemplo"
 * aria-expanded="false"
 * data-bs-placement="top", right, bottom, left.
 * data-bs-title="Custom popover"
 * data-bs-content="Top popover"
 * data-bs-custom-class="custom-popover"
 * data-bs-html="true"
 * - data-bs-title="<em>Tooltip</em>"
 *
 * - - cerrar:
 * class="btn-close"
 * data-bs-dismiss="offcanvas"
 * aria-label="Close"
 */


/**
 * Ejercicio de boton simple: 
 * @see https://wordpress.org/support/topic/how-to-add-a-toolbar-button-to-image-block/
 */
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { AlignmentToolbar, BlockControls } from '@wordpress/blockEditor';
import { Fragment } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';

const withGalleryExtension = createHigherOrderComponent( BlockEdit => {
	return ( props ) => {

		if ( 'core/image' === props.name ) {
			return (
				<Fragment>
					<BlockEdit { ...props } />
					<BlockControls>
						<AlignmentToolbar
							value={ 'left' }
							onChange={ console.log }
						/>
					</BlockControls>
				</Fragment>
			);
		}

		return <BlockEdit { ...props } />;
	};
}, 'withGalleryExtension' );

addFilter( 'editor.BlockEdit', 'themeisle-gutenberg/gallery-extension', withGalleryExtension );