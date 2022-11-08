/**
 * Tarea desarrollar un nuevo boton para toolbar.
 * Este debe aparecer en core/paragraph, button, image, gallery.
 * - verificar el dato.
 * Al dar click ejecuta un popover.
 * Dentro del popover lanza un __experimentalLinkControl con opciones personalizadas.
 * Las opciones son:
 * - Ejecutar: modal, Bslink, colapse. Esto debe estar abierto a inlcuir futuras opciones.
 * Problema:
 * - Averiguar como seleccionar una palabra.
 * - Averigaur como convertirla en enlace con atributos propios:
 * - - base: rel, target, follow.
 * - - extra:
 * class="dropdown-toggle"
 * type="button"
 * href="#ejemplo"
 * data-bs-target="#ejemplo"
 * data-bs-toggle="Bslink*", collapse*, dropdown, modal*, popover, tooltip
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
 * data-bs-dismiss="Bslink"
 * aria-label="Close"
 */


/**
 * Importar otras dependencias de WP.
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl, TextControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks'; // este permite crear filtros.
import { Fragment } from '@wordpress/element'; // UI.
import { InspectorAdvancedControls } from '@wordpress/block-editor'; // UI.
import { createHigherOrderComponent } from '@wordpress/compose'; // UI.

// Restringir el uso a botones.
// const allowedBlocks = [ 'core/button', 'core/buttons', 'core/paragraph', 'core/image', 'core/gallery', 'core/navigation-link' ];
const allowedBlocks = [ 'core/image' ];

/**
 * Asignar nuevos valores.
 * @param {*} settings Valores nuevos a incluir
 * @returns Deveulve los valores modificados.
 */
 function addAttributesImgBslink( settings ) {

	//Restriccion
	if( allowedBlocks.includes( settings.name ) ){

		settings.attributes = Object.assign( settings.attributes, {
			addDataImgBslink: {
				type: 'string',
				default: '',
			},
			// Cerrar Bslink.
			closeBslink:{
				type: 'boolean',
				default: true,
			}
		});

	}

	return settings;
}
/**
 * Control para los nuevos valore del boton.
 *
 * @param {function} BlockEdit componente WP.
 *
 * @return {function} Devuelve el BlockEdit modificado.
 */
const withAdvancedControlsImgBslink = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		// Cerrar Bslink.
		const{ attributes, setAttributes } = props;
		const{ closeBslink } = attributes;

		if( allowedBlocks.includes( props.name ) ){

			return (

				<Fragment>
				<BlockEdit {...props} />
				{/* Era props.attributes.url */}
					{props.attributes.href && (
						<InspectorAdvancedControls>
							<TextControl
								label={ __( 'Bslink anchor for execute it.', 'ekiline-collection'  ) }
								value={props.attributes.addDataImgBslink}
								onChange={newData => props.setAttributes({addDataImgBslink: newData})}
							/>
							{/* Cerrar Bslink */}
							<ToggleControl
								label={ __( 'Is close button?', 'ekiline-collection'  ) }
								checked={ ! closeBslink }
								onChange={ () => setAttributes( {  closeBslink: ! closeBslink } ) }
								help={ ! closeBslink ? __( 'Yes.', 'ekiline-collection'  ) : __( 'No.', 'ekiline-collection'  ) }
							/>
						</InspectorAdvancedControls>
					)}
				</Fragment>
			);

		}
		return <BlockEdit {...props} />;
	};
}, 'withAdvancedControlsImgBslink');

/**
 * Guardar el nuevo valor, en este caso como atributo.
 *
 * @param {Object} element      Elemento a seleccionar.
 * @param {Object} block        El bloque a modificar.
 * @param {Object} attributes   Los atributos del bloque.
 *
 * @return {Object} Devuelve los nuevos atributos al bloque.
 */
function applyExtraClassImgBslink( element, block, attributes ) {

	// Nuevo: Cerrar Bslink, sobrescribe los atributos.
	const { closeBslink } = attributes;

	if( allowedBlocks.includes( block.name ) ){

		if( attributes.addDataImgBslink && attributes.href && closeBslink ) {

			console.log(closeBslink)

			return wp.element.cloneElement(
				element,
				{},
				wp.element.cloneElement(
					element.props.children,
					{
						'data-bs-target': attributes.addDataImgBslink,
						'data-bs-toggle': 'testdata',
						// 'type': 'button',
					}
				)
			);
		}

		if ( !closeBslink && attributes.addDataImgBslink && attributes.href ) {

			return wp.element.cloneElement(
				element,
				{},
				wp.element.cloneElement(
					element.props.children,
					{
						'data-bs-dismiss': 'testdata',
					}
				)
			);

		}

	}

	return element;
}

addFilter(
	'blocks.registerBlockType',
	'ekilineBslinkBtnData/dataAttribute',
	addAttributesImgBslink
);

addFilter(
	'editor.BlockEdit',
	'ekilineBslinkBtnData/dataInput',
	withAdvancedControlsImgBslink
);

addFilter(
	'blocks.getSaveElement',
	'ekilineBslinkBtnData/dataModified',
	applyExtraClassImgBslink
);


/**
 * Referencia de bloques:
 * @see https://developer.wordpress.org/block-editor/reference-guides/core-blocks/
 */