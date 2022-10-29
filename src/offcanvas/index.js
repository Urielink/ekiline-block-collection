/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, TextControl } from '@wordpress/components';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Crear un icono.
 * Import the element creator function (React abstraction layer)
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
 import { createElement } from '@wordpress/element';
const customIcon = createElement(
	'svg',
	{ width: 20, height: 20 },
	createElement(
		'path',
		{
			d: 'M15.32,5.14l.64-.64,.64,.64,.76-.76-.64-.64,.63-.63-.76-.76-.63,.63-.63-.63-.76,.76,.63,.63-.64,.64,.76,.76Zm2.78-4.14H1.9c-.5,0-.9,.4-.9,.9V18.1c0,.5,.4,.9,.9,.9H18.1c.5,0,.9-.4,.9-.9V1.9c0-.5-.4-.9-.9-.9Zm-.18,16.92H2.08v-3.36h15.84v3.36Zm0-4.44H2.08V6.52h15.84v6.97Zm0-8.05H2.08V2.08h15.84v3.36Z'
		}
	)
);

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';
// import './editor.scss';

/**
 * Internal dependencies
 * - Reemplazadas, necesidad de anidar mas bloques.
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 *
 * Bloques necesarios para offcanvas.
 * - .offcanvas
 * - - .offcanvas-header
 * - - - variable: h5
 * - - - variable: .btn-close
 * - - .offcanvas-body
 * - - - variable: [bloques]
 * Variables:
 * attributos:
 * - anchor: true
 * Look:
 * - ocPosition: string, default: offcanvas-end. Opciones:  *-start, end, top, bottom
 * - ocWidth: string, default: ''. // Opciones: w-25, w-50, w-75, w-100
 * - ocHeight: string, default: ''. // Opciones: h-25, h-50, h-75, h-100
 * - ocScroll: boolean, default: false. // true. attr: data-bs-scroll="true"
 * - ocBackdrop: string, default: true. // Opciones: false,static. attr: data-bs-backdrop="false"
 * - ocDisplay: string, default: offcanvas. Opciones: offcanvas-sm, md, lg, xl, xxl.
 *
 * Referencias para anidado.
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 * No mostrar en inspector.
 * @ref https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
 * Uso de Lock
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 * @ref https://github.com/WordPress/gutenberg/blob/17baf6f33c391daa44daf8b3465f27aba8cf200d/docs/reference-guides/block-api/block-templates.md#individual-block-locking.
 * @ref https://github.com/WordPress/gutenberg/blob/17baf6f33c391daa44daf8b3465f27aba8cf200d/packages/block-editor/src/components/inner-blocks/README.md#templatelock
 *
 */
registerBlockType('ekiline-collection/ekiline-offcanvas', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	/**
	 * Parametros de alta.
	 * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
	 */
	title: __( 'Offcanvas', 'ekiline-collection' ),
	icon: customIcon,
	description: __( 'Add your content here, then invoque with a link anchor #anchor.', 'ekiline-collection' ),
	category: 'design',
	supports: {
		anchor: true,
	},

	/**
	 * Argumentos para personalizacion.
	 */
	attributes:{
		ocPosition: {
			type: 'string',
			default: ' offcanvas-end', // -start, -end, -top, -bottom.
		},
		ocWidth: {
			type: 'string',
			default: '', // w-25, w-50, w-75, w-100.
		},
		ocHeight: {
			type: 'string',
			default: '', // h-25, h-50, h-75, h-100.
		},
		ocScroll: {
			type: 'boolean',
			default: false, // true = data-bs-scroll="true".
		},
		ocBackdrop: {
			type: 'string',
			default: 'true', // false, static = data-bs-backdrop="false".
		},
		ocDisplay: {
			type: 'string',
			default: ' offcanvas', // -sm, -md, -lg, -xl, -xxl.
		},
	},

	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit: (props) => {

		const { attributes, setAttributes } = props;

		// Restringir los bloques, Cargar un preset.
		const PARENT_ALLOWED_BLOCKS = [
			'ekiline-collection/ekiline-offcanvas-header',
			'ekiline-collection/ekiline-offcanvas-body',
		];

		const CHILD_TEMPLATE = [
			[ 'ekiline-collection/ekiline-offcanvas-header', {
				lock: {
					remove: false,
					move: true,
				}
			} ],
			[ 'ekiline-collection/ekiline-offcanvas-body', {
				lock: {
					remove: false,
					move: true,
				}
			} ],
		];

		// personalizar clase
		const blockProps = useBlockProps( {
			className: 'group-offcanvas',
		} );

		/**
		 * Control personalizado: recordatorio
		 */
		function OffcanvasUserRemind(){

			if ( attributes.anchor ){
				return(
					<div class="editor-offcanvas-route has-anchor">
						<pre>
						{ '#' + attributes.anchor }
						<br></br>
						{ __( 'Add this #anchor to a button and its advanced options.', 'ekiline-collection' ) }
						</pre>
					</div>
					)
			}

			return(
				<div class="editor-offcanvas-route">
					{ __( 'Do not forget to add an anchor. ', 'ekiline-collection' )}
				</div>
			)
		}

		return (
			<div { ...blockProps }>
				{/* Inspector controles */}
				<InspectorControls>
					<PanelBody title={ __( 'Offcanvas Params', 'ekiline-collection' ) } initialOpen={ true }>

					<SelectControl
						label={ __( 'Position', 'ekiline-collection' ) }
						value={ attributes.ocPosition }
						options={ [
							{ label: __( 'Right', 'ekiline-collection' ), value: ' offcanvas-end' },
							{ label: __( 'Bottom', 'ekiline-collection' ), value: ' offcanvas-bottom' },
							{ label: __( 'Left', 'ekiline-collection' ), value: ' offcanvas-start' },
							{ label: __( 'Top', 'ekiline-collection' ), value: ' offcanvas-top' },
						] }
						onChange={ ( ocPosition ) =>
							setAttributes( { ocPosition } )
						}
					/>

					<SelectControl
						label={ __( 'Width', 'ekiline-collection' ) }
						value={ attributes.ocWidth }
						options={ [
							{ label: __( 'Default', 'ekiline-collection' ), value: '' },
							{ label: __( 'Small', 'ekiline-collection' ), value: ' w-25' },
							{ label: __( 'Half', 'ekiline-collection' ), value: ' w-50' },
							{ label: __( 'Large', 'ekiline-collection' ), value: ' w-75' },
							{ label: __( 'Full window', 'ekiline-collection' ), value: ' w-100' },
						] }
						onChange={ ( ocWidth ) =>
							setAttributes( { ocWidth } )
						}
					/>

					<SelectControl
						label={ __( 'Height', 'ekiline-collection' ) }
						value={ attributes.ocHeight }
						options={ [
							{ label: __( 'Default', 'ekiline-collection' ), value: '' },
							{ label: __( 'Small', 'ekiline-collection' ), value: ' h-25' },
							{ label: __( 'Half', 'ekiline-collection' ), value: ' h-50' },
							{ label: __( 'Large', 'ekiline-collection' ), value: ' h-75' },
							{ label: __( 'Full window', 'ekiline-collection' ), value: ' h-100' },
						] }
						onChange={ ( ocHeight ) =>
							setAttributes( { ocHeight } )
						}
					/>

					<SelectControl
						label={ __( 'Display run', 'ekiline-collection' ) }
						value={ attributes.ocDisplay }
						options={ [
							{ label: __( 'All', 'ekiline-collection' ), value: ' offcanvas' },
							{ label: __( 'Small', 'ekiline-collection' ), value: ' offcanvas-sm' },
							{ label: __( 'Medium', 'ekiline-collection' ), value: ' offcanvas-md' },
							{ label: __( 'Large', 'ekiline-collection' ), value: ' offcanvas-lg' },
						] }
						onChange={ ( ocDisplay ) =>
							setAttributes( { ocDisplay } )
						}
						help={ __( 'Run only on specific screen sizes', 'ekiline-collection' ) }
					/>

					<ToggleControl
						label={ __( 'Keep scroll window', 'ekiline-collection' ) }
						checked={ attributes.ocScroll }
						onChange={ ( ocScroll ) =>
							setAttributes( { ocScroll } )
						}
					/>

					<SelectControl
						label={ __( 'Backdrop behavior', 'ekiline-collection' ) }
						value={ attributes.ocBackdrop }
						options={ [
							{ label: __( 'Default', 'ekiline-collection' ), value: 'true' },
							{ label: __( 'Static', 'ekiline-collection' ), value: 'static' },
							{ label: __( 'False', 'ekiline-collection' ), value: 'false' },
						] }
						onChange={ ( ocBackdrop ) =>
							setAttributes( { ocBackdrop } )
						}
						help={ __( 'Run only on specific screen sizes', 'ekiline-collection' ) }
					/>

					</PanelBody>
				</InspectorControls>

				{/* El bloque */}
				<InnerBlocks
				allowedBlocks={ PARENT_ALLOWED_BLOCKS }
					template={ CHILD_TEMPLATE }
					// templateLock="all"
					// templateLock="insert"
				/>
				<OffcanvasUserRemind/>
			</div>
		);
	},

	/**
	 * @see ./save.js
	 */
	// save,
	save: ( { attributes } ) => {

		// Clases y atributos auxiliares, incluir save.
		const blockProps = useBlockProps.save( {
			className:
				'group-offcanvas'
				+ attributes.ocDisplay
				+ attributes.ocPosition
				+ attributes.ocWidth
				+ attributes.ocHeight
			,
			'data-bs-backdrop' : attributes.ocBackdrop,
			'data-bs-scroll' : attributes.ocScroll,
		} );

		return (
			<div
				{ ...blockProps }
				tabindex="-1"
				role="dialog"
				aria-labelledby={ blockProps.id + 'Label' }
				aria-hidden="true"
			>
				<InnerBlocks.Content />
			</div>
		);
	},

});

/**
 * - ekiline-offcanvas-header
 */

registerBlockType( 'ekiline-collection/ekiline-offcanvas-header', {
	title: __( 'Offcanvas header', 'ekiline-collection' ),
	parent: ['ekiline-collection/ekiline-offcanvas'],
	icon: 'feedback',
	description:__( 'Offcanvas header content. ', 'ekiline-collection' ),
	category: 'design',
	supports: {
		html: false,
		reusable: false,
		multiple: false,
		inserter: true,
	},
	edit: () => {

		// Restringir los bloques, Cargar un preset.
		const PARENT_ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph' ];
		// Cargar un preset.
		const CHILD_TEMPLATE = [
			[ 'core/heading', {
				content: __( 'Add offcanvas title', 'ekiline-collection' ),
				level: 4,
			} ],
		];

		// personalizar clase
		const blockProps = useBlockProps( {
			className: 'editor-offcanvas-header',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ PARENT_ALLOWED_BLOCKS }
					template={ CHILD_TEMPLATE }
					/>
			</div>
		);
	},

	save: () => {

		// Clases y atributos auxiliares, incluir save.
		const blockProps = useBlockProps.save( {
			className: 'offcanvas-header',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
				<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"/>
			</div>
		);
	},

} );


/**
 * - ekiline-offcanvas-body
 */

registerBlockType( 'ekiline-collection/ekiline-offcanvas-body', {
	title: __( 'Offcanvas body content', 'ekiline-collection' ),
	parent: ['ekiline-collection/ekiline-offcanvas'],
	icon: 'feedback',
	description:__( 'Offcanvas body content. ', 'ekiline-collection' ),
	category: 'design',
	supports: {
		html: false,
		reusable: false,
		multiple: false,
		inserter: true,
	},
	edit: () => {

		// Cargar un preset.
		const CHILD_TEMPLATE = [
			[ 'core/paragraph', { content: __( 'Add offcanvas content blocks', 'ekiline-collection' ) } ],
		];

		// personalizar clase
		const blockProps = useBlockProps( {
			className: 'editor-offcanvas-body',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks
					template={ CHILD_TEMPLATE }
					/>
			</div>
		);
	},

	save: () => {

		// Clases y atributos auxiliares, incluir save.
		const blockProps = useBlockProps.save( {
			className: 'offcanvas-body',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},

} );




/**
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
import { addFilter } from '@wordpress/hooks'; // este permite crear filtros.
import { Fragment } from '@wordpress/element'; // UI.
import { InspectorAdvancedControls } from '@wordpress/block-editor'; // UI.
import { createHigherOrderComponent } from '@wordpress/compose'; // UI.

// Restringir el uso a botones.
const allowedBlocks = [ 'core/button', 'core/buttons' ];

/**
 * Asignar nuevos valores.
 * @param {*} settings Valores nuevos a incluir
 * @returns Deveulve los valores modificados.
 */
function addAttributesBtnOffcanvas( settings ) {

	//Restriccion
	if( allowedBlocks.includes( settings.name ) ){

		settings.attributes = Object.assign( settings.attributes, {
			addDataBtnOffcanvas: {
				type: 'string',
				default: '',
			},
			// Cerrar offcanvas.
			closeOffcanvas:{
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
const withAdvancedControlsBtnOffcanvas = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		// Cerrar offcanvas.
		const{ attributes, setAttributes } = props;
		const{ closeOffcanvas } = attributes;

		if( allowedBlocks.includes( props.name ) ){

			return (

				<Fragment>
				<BlockEdit {...props} />
					{props.attributes.url && (
						<InspectorAdvancedControls>
							<TextControl
								label={ __( 'Offcanvas anchor for execute it.', 'ekiline-collection'  ) }
								value={props.attributes.addDataBtnOffcanvas}
								onChange={newData => props.setAttributes({addDataBtnOffcanvas: newData})}
							/>
							{/* Cerrar offcanvas */}
							<ToggleControl
								label={ __( 'Close offcanvas button.', 'ekiline-collection'  ) }
								checked={ ! closeOffcanvas }
								onChange={ () => setAttributes( {  closeOffcanvas: ! closeOffcanvas } ) }
								help={ ! closeOffcanvas ? __( 'Yes.', 'ekiline-collection'  ) : __( 'No.', 'ekiline-collection'  ) }
							/>
						</InspectorAdvancedControls>
					)}
				</Fragment>
			);

		}
		return <BlockEdit {...props} />;
	};
}, 'withAdvancedControlsBtnOffcanvas');

/**
 * Guardar el nuevo valor, en este caso como atributo.
 *
 * @param {Object} element      Elemento a seleccionar.
 * @param {Object} block        El bloque a modificar.
 * @param {Object} attributes   Los atributos del bloque.
 *
 * @return {Object} Devuelve los nuevos atributos al bloque.
 */
function applyExtraClassBtnOffcanvas( element, block, attributes ) {

	// Nuevo: Cerrar offcanvas, sobrescribe los atributos.
	const { closeOffcanvas } = attributes;

	if( allowedBlocks.includes( block.name ) ){

		if( attributes.addDataBtnOffcanvas && attributes.url && closeOffcanvas ) {

			return wp.element.cloneElement(
				element,
				{},
				wp.element.cloneElement(
					element.props.children,
					{
						'data-bs-target': attributes.addDataBtnOffcanvas,
						'data-bs-toggle': 'offcanvas',
						// 'type': 'button',
					}
				)
			);
		}

		if ( !closeOffcanvas && attributes.addDataBtnOffcanvas && attributes.url ) {

			return wp.element.cloneElement(
				element,
				{},
				wp.element.cloneElement(
					element.props.children,
					{
						'data-bs-dismiss': 'offcanvas',
					}
				)
			);

		}

	}
	return element;
}

addFilter(
	'blocks.registerBlockType',
	'ekilineOffcanvasBtnData/dataAttribute',
	addAttributesBtnOffcanvas
);

addFilter(
	'editor.BlockEdit',
	'ekilineOffcanvasBtnData/dataInput',
	withAdvancedControlsBtnOffcanvas
);

addFilter(
	'blocks.getSaveElement',
	'ekilineOffcanvasBtnData/dataModified',
	applyExtraClassBtnOffcanvas
);
