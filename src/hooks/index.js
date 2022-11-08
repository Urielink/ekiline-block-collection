/**
 * Nuevo complemento:
 * Permitir enlazar componentes bs desde imagen.
 *
 * Referencia de bloques y filtros:
 * @see https://developer.wordpress.org/block-editor/reference-guides/core-blocks/
 * @see https://joshpress.net/blog/add-block-attributes
 * @see https://jschof.com/gutenberg-blocks/using-gutenberg-filters-to-extend-blocks/
 * @see https://www.liip.ch/en/blog/writing-a-wrapper-block-for-gutenberg-in-wordpress
 * @see https://www.liip.ch/en/blog/how-to-extend-existing-gutenberg-blocks-in-wordpress
 * @see https://stackoverflow.com/questions/36064277/how-to-inject-pass-attributes-to-nested-elements
 */

/**
 * Importar otras dependencias de WP.
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl, TextControl, SelectControl, PanelBody } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks'; // este permite crear filtros.
import { Fragment, cloneElement } from '@wordpress/element'; // UI.
import { InspectorControls } from '@wordpress/block-editor'; // UI.
import { createHigherOrderComponent } from '@wordpress/compose'; // UI.

// Restringir el uso a botones:'core/button, buttons, paragraph, image, gallery, navigation-link'.
const allowedBlocks = [ 'core/image' ];

/**
 * Asignar nuevos valores.
 * @param {*} settings Valores nuevos a incluir
 * @returns Deveulve los valores modificados.
 */
function addAttributesImgBslink( settings ) {
	// Restriccion.
	if( allowedBlocks.includes( settings.name ) ){
		// Atributos: anchor, componente y dismiss.
		settings.attributes = Object.assign( settings.attributes, {
			anchorBsComponent: {
				type: 'string',
				default: '',
			},
			selectBsComponent: {
				type: 'string',
				default: '',
			},
			dissmissBsComponent:{
				type: 'boolean',
				default: true,
			},
		});
	}
	return settings;
}

/**
 * Control para los nuevos valore del boton.
 *
 * @param {function} BlockEdit componente WP.
 * @return {function} Devuelve el BlockEdit modificado.
 */
const withAdvancedControlsImgBslink = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		// Cerrar Bslink.
		const{ attributes, setAttributes } = props;
		const{ dissmissBsComponent } = attributes;

		if( allowedBlocks.includes( props.name ) ){

			return (

				<Fragment>
				<BlockEdit {...props} />
					{/**
					 * Nota: Los botones ocupan: props.attributes.url
					 * Las imagenes ocupan: props.attributes.href
					 **/}
					{props.attributes.href && (
						<InspectorControls>
							<PanelBody title={ __( 'Link to Ekiline Block', 'ekiline-collection' ) } initialOpen={ true }>
								{/* Anchor */}
								<TextControl
									label={ __( 'Anchor block name', 'ekiline-collection'  ) }
									value={props.attributes.anchorBsComponent}
									onChange={newData => props.setAttributes({anchorBsComponent: newData})}
								/>
								{/* Tipo de componente */}
								<SelectControl
									label={ __( 'Choose block', 'ekiline-collection' ) }
									value={ attributes.selectBsComponent }
									options={ [
										{ label: __( 'None', 'ekiline-collection' ), value: '' },
										{ label: __( 'Collapse', 'ekiline-collection' ), value: 'collapse' },
										{ label: __( 'Modal', 'ekiline-collection' ), value: 'modal' },
										{ label: __( 'Offcanvas', 'ekiline-collection' ), value: 'offcanvas' },
									] }
									onChange={ ( selectBsComponent ) =>
										setAttributes( { selectBsComponent } )
									}
								/>
								{/* Cerrar Bslink */}
								<ToggleControl
									label={ __( 'Is close button?', 'ekiline-collection'  ) }
									checked={ ! dissmissBsComponent }
									onChange={ () => setAttributes( {  dissmissBsComponent: ! dissmissBsComponent } ) }
									help={ ! dissmissBsComponent ? __( 'Yes.', 'ekiline-collection'  ) : __( 'No.', 'ekiline-collection'  ) }
								/>
							</PanelBody>
						</InspectorControls>
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
	const { dissmissBsComponent } = attributes;

	if( allowedBlocks.includes( block.name ) ){

		if( dissmissBsComponent && attributes.anchorBsComponent && attributes.selectBsComponent && attributes.href ) {

			/**
			 * Nota: la manipulación del marcado por objetos:
			 * - cloneElement( element.props, ... ) queda en un nivel superior.
			 * Se necesita ir a profundidad y encontrar el elemento de marcado requerido:
			 * - - console.log(element.props.children.props.children[0])  // revisar objeto.
			 * - - console.log(element.props.children.props.children[0].type)  // revisar objeto tipo.
			 * - cloneElement( element.props.children.props.children[0], ...)
			 * Probablemente, debo crear una función que valide la existencia de <a/> con type: 'a'.
			 * - - Por ello hay una validacion, podria cambiar el metodo.
			 */
			if ( ('a' === element.props.children.props.children[0].type)  ){
				return cloneElement(
					element,
					{},
					cloneElement( element.props.children.props.children[0], {
							'data-bs-target': attributes.anchorBsComponent,
							'data-bs-toggle': attributes.selectBsComponent,
						}
					)
				);
			}

		}

		if ( ! dissmissBsComponent && attributes.anchorBsComponent && attributes.selectBsComponent && attributes.href ) {
			if ( ('a' === element.props.children.props.children[0].type)  ){
				return cloneElement(
					element,
					{},
					cloneElement( element.props.children.props.children[0], {
							'data-bs-dismiss': attributes.selectBsComponent,
						}
					)
				);
			}
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
