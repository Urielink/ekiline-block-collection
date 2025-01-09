/**
 * Nuevo complemento:
 * Permitir enlazar componentes bs desde boton.
 *
 * Referencia de bloques y filtros:
 * @see https://developer.wordpress.org/block-editor/reference-guides/core-blocks/
 * @see https://joshpress.net/blog/add-block-attributes
 * @see https://jschof.com/gutenberg-blocks/using-gutenberg-filters-to-extend-blocks/
 * @see https://www.liip.ch/en/blog/writing-a-wrapper-block-for-gutenberg-in-wordpress
 * @see https://www.liip.ch/en/blog/how-to-extend-existing-gutenberg-blocks-in-wordpress
 * @see https://stackoverflow.com/questions/36064277/how-to-inject-pass-attributes-to-nested-elements
 *
 * Controles auxiliares
 * @see https://mariecomet.fr/en/2021/12/14/adding-options-controls-existing-gutenberg-block/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/toolbar-button/
 * @see https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/
 * genera un nuevo control, general en el panel.
 * @see https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#editor-blockedit
 * genera agregar una nueva clase o atributo.
 * @see https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#editor-blocklistblock
 * nuevo experimento
 * @see https://jeffreycarandang.com/extending-gutenberg-core-blocks-with-custom-attributes-and-controls/
 * nuevo, LinkControl.
 * @see https://wp-gb.com/linkcontrol/
 * prueba, como formato extra
 * @see https://developer.wordpress.org/block-editor/how-to-guides/format-api/
 * Este ejemplo trae parametros que no estan en la doc.
 * @see https://jeffreycarandang.com/how-to-create-custom-text-formats-for-gutenberg-block-editor/
 * Prueba nueva uso de Hooks.
 * hya que instalar: npm install @wordpress/hooks --save
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/
 * Prueba con otra inforamcion, es la mejor!!
 * @see https://chap.website/adding-a-custom-attribute-to-gutenberg-block/
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
const bsBtnAllowedBlocks = [ 'core/button', 'core/buttons' ];

/**
 * Asignar nuevos valores.
 * @param {*} settings Valores nuevos a incluir
 * @returns Deveulve los valores modificados.
 */
function addAttributesBsButtonLink( settings ) {
	// Restriccion.
	if( bsBtnAllowedBlocks.includes( settings.name ) ){
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
const withAdvancedControlsBsButtonLink = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		// Cerrar Bslink.
		const{ attributes, setAttributes } = props;
		const{ dissmissBsComponent } = attributes;

		if( bsBtnAllowedBlocks.includes( props.name ) ){

			return (

				<Fragment>
				<BlockEdit {...props} />
					{/**
					 * Nota: Los botones ocupan: props.attributes.url
					 * Las imagenes ocupan: props.attributes.href
					 **/}
					{props.attributes.url && (
						<InspectorControls>
							<PanelBody title={ __( 'Link to Block (Ekiline)', 'ekiline-block-collection' ) } initialOpen={ true }>
								{/* Anchor */}
								<TextControl
									label={ __( 'Anchor block name', 'ekiline-block-collection'  ) }
									value={props.attributes.anchorBsComponent}
									onChange={newData => props.setAttributes({anchorBsComponent: newData})}
								/>
								{/* Tipo de componente */}
								<SelectControl
									label={ __( 'Choose block', 'ekiline-block-collection' ) }
									value={ attributes.selectBsComponent }
									options={ [
										{ label: __( 'None', 'ekiline-block-collection' ), value: '' },
										{ label: __( 'Collapse', 'ekiline-block-collection' ), value: 'collapse' },
										{ label: __( 'Modal', 'ekiline-block-collection' ), value: 'modal' },
										{ label: __( 'Offcanvas', 'ekiline-block-collection' ), value: 'offcanvas' },
									] }
									onChange={ ( selectBsComponent ) =>
										setAttributes( { selectBsComponent } )
									}
								/>
								{/* Cerrar Bslink */}
								<ToggleControl
									label={ __( 'Is close button?', 'ekiline-block-collection'  ) }
									checked={ ! dissmissBsComponent }
									onChange={ () => setAttributes( {  dissmissBsComponent: ! dissmissBsComponent } ) }
									help={ ! dissmissBsComponent ? __( 'Yes.', 'ekiline-block-collection'  ) : __( 'No.', 'ekiline-block-collection'  ) }
								/>
							</PanelBody>
						</InspectorControls>
					)}
				</Fragment>
			);

		}
		return <BlockEdit {...props} />;
	};
}, 'withAdvancedControlsBsButtonLink');

/**
 * Guardar el nuevo valor, en este caso como atributo.
 *
 * @param {Object} element      Elemento a seleccionar.
 * @param {Object} block        El bloque a modificar.
 * @param {Object} attributes   Los atributos del bloque.
 *
 * @return {Object} Devuelve los nuevos atributos al bloque.
 */
function applyExtraClassBsButtonLink( element, block, attributes ) {

	// Nuevo: Cerrar Bslink, sobrescribe los atributos.
	const { dissmissBsComponent } = attributes;

	if( bsBtnAllowedBlocks.includes( block.name ) ){

		if( dissmissBsComponent && attributes.anchorBsComponent && attributes.selectBsComponent && attributes.url ) {

			return cloneElement(
				element,
				{},
				cloneElement( element.props.children, {
						'data-bs-target': attributes.anchorBsComponent,
						'data-bs-toggle': attributes.selectBsComponent,
					}
				)
			);

		}

		if ( ! dissmissBsComponent && attributes.anchorBsComponent && attributes.selectBsComponent && attributes.url ) {
			return cloneElement(
				element,
				{},
				cloneElement( element.props.children, {
						'data-bs-dismiss': attributes.selectBsComponent,
					}
				)
			);
		}

	}

	return element;
}

addFilter(
	'blocks.registerBlockType',
	'ekilineBsButtonLinkData/dataAttribute',
	addAttributesBsButtonLink
);

addFilter(
	'editor.BlockEdit',
	'ekilineBsButtonLinkData/dataInput',
	withAdvancedControlsBsButtonLink
);

addFilter(
	'blocks.getSaveElement',
	'ekilineBsButtonLinkData/dataModified',
	applyExtraClassBsButtonLink
);

/**
 * Nuevo complemento:
 * Permitir enlazar componentes bs desde imagen.
 */

// Restringir el uso a botones:'core/button, buttons, paragraph, image, gallery, navigation-link'.
const bsImgAllowedBlocks = [ 'core/image' ];

/**
 * Asignar nuevos valores.
 * @param {*} settings Valores nuevos a incluir
 * @returns Deveulve los valores modificados.
 */
function addAttributesBsImageLink( settings ) {
	// Restriccion.
	if( bsImgAllowedBlocks.includes( settings.name ) ){
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
const withAdvancedControlsBsImageLink = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		// Cerrar Bslink.
		const{ attributes, setAttributes } = props;
		const{ dissmissBsComponent } = attributes;

		if( bsImgAllowedBlocks.includes( props.name ) ){

			return (

				<Fragment>
				<BlockEdit {...props} />
					{/**
					 * Nota: Los botones ocupan: props.attributes.url
					 * Las imagenes ocupan: props.attributes.href
					 **/}
					{props.attributes.href && (
						<InspectorControls>
							<PanelBody title={ __( 'Link to Ekiline Block', 'ekiline-block-collection' ) } initialOpen={ true }>
								{/* Anchor */}
								<TextControl
									label={ __( 'Anchor block name', 'ekiline-block-collection'  ) }
									value={props.attributes.anchorBsComponent}
									onChange={newData => props.setAttributes({anchorBsComponent: newData})}
								/>
								{/* Tipo de componente */}
								<SelectControl
									label={ __( 'Choose block', 'ekiline-block-collection' ) }
									value={ attributes.selectBsComponent }
									options={ [
										{ label: __( 'None', 'ekiline-block-collection' ), value: '' },
										{ label: __( 'Collapse', 'ekiline-block-collection' ), value: 'collapse' },
										{ label: __( 'Modal', 'ekiline-block-collection' ), value: 'modal' },
										{ label: __( 'Offcanvas', 'ekiline-block-collection' ), value: 'offcanvas' },
									] }
									onChange={ ( selectBsComponent ) =>
										setAttributes( { selectBsComponent } )
									}
								/>
								{/* Cerrar Bslink */}
								<ToggleControl
									label={ __( 'Is close button?', 'ekiline-block-collection'  ) }
									checked={ ! dissmissBsComponent }
									onChange={ () => setAttributes( {  dissmissBsComponent: ! dissmissBsComponent } ) }
									help={ ! dissmissBsComponent ? __( 'Yes.', 'ekiline-block-collection'  ) : __( 'No.', 'ekiline-block-collection'  ) }
								/>
							</PanelBody>
						</InspectorControls>
					)}
				</Fragment>
			);

		}
		return <BlockEdit {...props} />;
	};
}, 'withAdvancedControlsBsImageLink');

/**
 * Guardar el nuevo valor, en este caso como atributo.
 *
 * @param {Object} element      Elemento a seleccionar.
 * @param {Object} block        El bloque a modificar.
 * @param {Object} attributes   Los atributos del bloque.
 *
 * @return {Object} Devuelve los nuevos atributos al bloque.
 */
function applyExtraClassBsImageLink( element, block, attributes ) {

	// Nuevo: Cerrar Bslink, sobrescribe los atributos.
	const { dissmissBsComponent } = attributes;

	if( bsImgAllowedBlocks.includes( block.name ) ){

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
	'ekilineBsImageLinkData/dataAttribute',
	addAttributesBsImageLink
);

addFilter(
	'editor.BlockEdit',
	'ekilineBsImageLinkData/dataInput',
	withAdvancedControlsBsImageLink
);

addFilter(
	'blocks.getSaveElement',
	'ekilineBsImageLinkData/dataModified',
	applyExtraClassBsImageLink
);
