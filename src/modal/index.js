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
 * Bloques necesarios para modal.
 * - .modal
 * - - .modal-dialog
 * - - - .modal-content
 * - - - - .modal-header, modal-title, btn-close
 * - - - - .modal-body, [bloques]
 * - - - - .modal-footer, btn-close, [bloques]
 *
 * Variables:
 * - staticBackdrop = data-bs-backdrop="static"
 * - longcontent = .modal-dialog-scrollable
 * - centrado = modal-dialog-centered
 * - size = modal-xl, modal-lg, modal-sm, modal-fullscreen
 *
 * Referencias para anidado.
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 *
 * No mostrar en inspector.
 * @ref https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
 *
 * Uso de Lock
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 * @ref https://github.com/WordPress/gutenberg/blob/17baf6f33c391daa44daf8b3465f27aba8cf200d/docs/reference-guides/block-api/block-templates.md#individual-block-locking.
 * @ref https://github.com/WordPress/gutenberg/blob/17baf6f33c391daa44daf8b3465f27aba8cf200d/packages/block-editor/src/components/inner-blocks/README.md#templatelock
 *
 */
registerBlockType('ekiline-blocks/ekiline-modal', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	/**
	 * Parametros de alta.
	 * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
	 */
	title: __( 'Modal group, full control', 'ekiline-collection' ),
	icon: 'editor-kitchensink',
	description: __( 'Add your content here, then invoque with a link anchor #anchor.', 'ekiline-collection' ),
	category: 'design',
	supports: {
		anchor: true,
	},

	/**
	 * Argumentos para personalizacion.
	 */
	attributes:{
		modalShow: {
			type: 'string',
			default: 'default', // top, right, bottom, left.
		},
		modalSize: {
			type: 'string',
			default: 'default', // small, large, extralarge, fullwindow.
		},
		modalAlign: {
			type: 'boolean',
			default: true, // center.
		},
		modalBackdrop: {
			type: 'boolean',
			default: true, // cerrar modal dando clic fuera.
		},
		modalKeyboard: {
			type: 'boolean',
			default: true, // cerrar modal con teclado.
		},
		modalGrow: {
			type: 'boolean',
			default: false,
		},
		modalTime: {
			type: 'number',
			default: 0,
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
			'ekiline-blocks/ekiline-modal-header',
			'ekiline-blocks/ekiline-modal-body',
			'ekiline-blocks/ekiline-modal-footer'
		];

		const CHILD_TEMPLATE = [
			[ 'ekiline-blocks/ekiline-modal-header', {
				lock: {
					remove: false,
					move: true,
				}
			} ],
			[ 'ekiline-blocks/ekiline-modal-body', {
				lock: {
					remove: false,
					move: true,
				}
			} ],
			[ 'ekiline-blocks/ekiline-modal-footer', {
				lock: {
					remove: false,
					move: true,
				}
			} ],
		];

		// personalizar clase
		const blockProps = useBlockProps( {
			className: 'group-modal',
		} );

		/**
		 * Control personalizado: recordatorio
		 */
		function ModalUserRemind(){

			if ( attributes.anchor ){
				return(
					<div class="editor-modal-route has-anchor">
						<pre>
						{ '#' + attributes.anchor }
						<br></br>
						{ __( 'Add this #anchor to a button and its advanced options.', 'ekiline-collection' ) }
						</pre>
					</div>
					)
			}

			return(
				<div class="editor-modal-route">
					{ __( 'Do not forget to add an anchor. ', 'ekiline-collection' )}
				</div>
			)
		}

		return (
			<div { ...blockProps }>
				{/* Inspector controles */}
				<InspectorControls>
					<PanelBody title={ __( 'Modal Params', 'ekiline-collection' ) } initialOpen={ true }>

					<SelectControl
						label={ __( 'Rise modal', 'ekiline-collection' ) }
						value={ attributes.modalShow }
						options={ [
							{ label: __( 'Default', 'ekiline-collection' ), value: '' },
							{ label: __( 'Right', 'ekiline-collection' ), value: ' right-aside' },
							{ label: __( 'Bottom', 'ekiline-collection' ), value: ' move-from-bottom' },
							{ label: __( 'Left', 'ekiline-collection' ), value: ' left-aside' },
						] }
						onChange={ ( modalShow ) =>
							setAttributes( { modalShow } )
						}
					/>

					<SelectControl
						label={ __( 'Size modal', 'ekiline-collection' ) }
						value={ attributes.modalSize }
						options={ [
							{ label: __( 'Default', 'ekiline-collection' ), value: '' },
							{ label: __( 'Small', 'ekiline-collection' ), value: ' modal-sm' },
							{ label: __( 'Large', 'ekiline-collection' ), value: ' modal-lg' },
							{ label: __( 'Extra Large', 'ekiline-collection' ), value: ' modal-xl' },
							{ label: __( 'Full window', 'ekiline-collection' ), value: ' modal-fullscreen' },
						] }
						onChange={ ( modalSize ) =>
							setAttributes( { modalSize } )
						}
					/>

					<ToggleControl
						label={ __( 'Center in window', 'ekiline-collection' ) }
						checked={ attributes.modalAlign }
						onChange={ ( modalAlign ) =>
							setAttributes( { modalAlign } )
						}
					/>
					<ToggleControl
						label={ __( 'Enable background click to close', 'ekiline-collection' ) }
						checked={ attributes.modalBackdrop }
						onChange={ ( modalBackdrop ) =>
							setAttributes( { modalBackdrop } )
						}
					/>
					<ToggleControl
						label={ __( 'Enable ESC key to close', 'ekiline-collection' ) }
						checked={ attributes.modalKeyboard }
						onChange={ ( modalKeyboard ) =>
							setAttributes( { modalKeyboard } )
						}
					/>
					<ToggleControl
						label={ __( 'Show resize modal button', 'ekiline-collection' ) }
						checked={ attributes.modalGrow }
						onChange={ ( modalGrow ) =>
							setAttributes( { modalGrow } )
						}
					/>
					<TextControl
						label={ __( 'Show with timer', 'ekiline-collection' ) }
						type="number"
						value={ attributes.modalTime }
						onChange={ ( newval ) =>
							setAttributes( { modalTime: parseInt( newval ) } )
						}
						help={
							( attributes.modalTime > 0 )
							? __( 'Run after page load "' + attributes.modalTime + '" milliseconds.', 'ekiline-collection' )
							: __( '"' + attributes.modalTime + '" do nothing.', 'ekiline-collection' )
						}
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
				<ModalUserRemind/>
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
				'group-modal modal fade'
				+ ( attributes.modalShow != 'default' ? attributes.modalShow : '' )
			,
			'data-bs-backdrop' : attributes.modalBackdrop,
			'data-bs-keyboard' : attributes.modalKeyboard,
			'data-ek-time'   : ( attributes.modalTime || null ),
		} );

		const dialogProps = useBlockProps.save({
			className:
			'modal-dialog'
			+ ( attributes.modalAlign ? ' modal-dialog-centered' : '' )
			+ ( attributes.modalSize != 'default' ? attributes.modalSize : '' )
			,
		});

	// Componente Boton.
		function ModalGrowBtn() {
			if ( attributes.modalGrow ) {
				return (
					<button
						type="button"
						class="modal-resize btn btn-sm btn-outline-secondary"
						aria-label={__( 'play btn', 'ekiline-collection' )}>
							<span class="dashicons dashicons-editor-expand"></span>
					</button>
				)
			}
		}


		return (
			<div
				{ ...blockProps }
				tabindex="-1"
				role="dialog"
				aria-labelledby={ blockProps.id + 'Label' }
				aria-hidden="true"
			>
				<div class={dialogProps.className}>
					<div class="modal-content">
						<ModalGrowBtn/>
						<InnerBlocks.Content />
					</div>
				</div>

			</div>
		);
	},

});

/**
 * - ekiline-modal-header
 */

registerBlockType( 'ekiline-blocks/ekiline-modal-header', {
	title: __( 'Modal header', 'ekiline-collection' ),
	parent: ['ekiline-blocks/ekiline-modal'],
	icon: 'feedback',
	description:__( 'Modal header content. ', 'ekiline-collection' ),
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
				content: __( 'Add modal title', 'ekiline-collection' ),
				level: 4,
			} ],
		];

		// personalizar clase
		const blockProps = useBlockProps( {
			className: 'editor-modal-header',
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
			className: 'modal-header',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
			</div>
		);
	},

} );


/**
 * - ekiline-modal-body
 */

registerBlockType( 'ekiline-blocks/ekiline-modal-body', {
	title: __( 'Modal body content', 'ekiline-collection' ),
	parent: ['ekiline-blocks/ekiline-modal'],
	icon: 'feedback',
	description:__( 'Modal body content. ', 'ekiline-collection' ),
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
			[ 'core/paragraph', { content: __( 'Add modal content blocks', 'ekiline-collection' ) } ],
		];

		// personalizar clase
		const blockProps = useBlockProps( {
			className: 'editor-modal-body',
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
			className: 'modal-body',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},

} );


/**
 * - ekiline-modal-footer
 */

registerBlockType( 'ekiline-blocks/ekiline-modal-footer', {
	title: __( 'Modal footer', 'ekiline-collection' ),
	parent: ['ekiline-blocks/ekiline-modal'],
	icon: 'feedback',
	description:__( 'Inner footer content. ', 'ekiline-collection' ),
	category: 'design',
	supports: {
		html: false,
		reusable: false,
		multiple: false,
		inserter: true,
	},
	edit: () => {

		// Restringir los bloques, Cargar un preset.
		const PARENT_ALLOWED_BLOCKS = [ 'core/paragraph', 'core/buttons', 'core/button' ];
		// Cargar un preset.
		const CHILD_TEMPLATE = [
			[ 'core/paragraph', { content: __( 'Add modal footer text', 'ekiline-collection' ) } ],
		];

		// personalizar clase
		const blockProps = useBlockProps( {
			className: 'editor-modal-footer',
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
			className: 'modal-footer',
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
function addAttributesBtn( settings ) {

	//Restriccion
	if( allowedBlocks.includes( settings.name ) ){

		settings.attributes = Object.assign( settings.attributes, {
			addDataBtn: {
				type: 'string',
				default: '',
			},
			// Nuevo: Cerrar modal
			closeModal:{
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
const withAdvancedControlsBtn = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		// Nuevo: Cerrar modal
		const{ attributes, setAttributes } = props;
		const{ closeModal } = attributes;

		if( allowedBlocks.includes( props.name ) ){

			return (

				<Fragment>
				<BlockEdit {...props} />
					{props.attributes.url && (
						<InspectorAdvancedControls>
							<TextControl
								label={ __( 'Modal anchor for execute it.', 'ekiline-collection'  ) }
								value={props.attributes.addDataBtn}
								onChange={newData => props.setAttributes({addDataBtn: newData})}
							/>
							{/* Nuevo: Cerrar modal */}
							<ToggleControl
								label={ __( 'Close modal button.', 'ekiline-collection'  ) }
								checked={ ! closeModal }
								onChange={ () => setAttributes( {  closeModal: ! closeModal } ) }
								help={ ! closeModal ? __( 'Yes.', 'ekiline-collection'  ) : __( 'No.', 'ekiline-collection'  ) }
							/>
						</InspectorAdvancedControls>
					)}
				</Fragment>
			);

		}
		return <BlockEdit {...props} />;
	};
}, 'withAdvancedControlsBtn');

/**
 * Guardar el nuevo valor, en este caso como atributo.
 *
 * @param {Object} element      Elemento a seleccionar.
 * @param {Object} block        El bloque a modificar.
 * @param {Object} attributes   Los atributos del bloque.
 *
 * @return {Object} Devuelve los nuevos atributos al bloque.
 */
function applyExtraClassBtn( element, block, attributes ) {

	// Nuevo: Cerrar modal, sobrescribe los atributos.
	const { closeModal } = attributes;

	if( allowedBlocks.includes( block.name ) ){

		if( attributes.addDataBtn && attributes.url && closeModal ) {

			return wp.element.cloneElement(
				element,
				{},
				wp.element.cloneElement(
					element.props.children,
					{
						'data-bs-target': attributes.addDataBtn,
						'data-bs-toggle': 'modal',
						// 'type': 'button',
					}
				)
			);
		}

		if ( !closeModal && attributes.addDataBtn && attributes.url ) {

			return wp.element.cloneElement(
				element,
				{},
				wp.element.cloneElement(
					element.props.children,
					{
						'data-bs-dismiss': 'modal',
					}
				)
			);

		}

	}
	return element;
}

addFilter(
	'blocks.registerBlockType',
	'ekilineModalBtnData/dataAttribute',
	addAttributesBtn
);

addFilter(
	'editor.BlockEdit',
	'ekilineModalBtnData/dataInput',
	withAdvancedControlsBtn
);

addFilter(
	'blocks.getSaveElement',
	'ekilineModalBtnData/dataModified',
	applyExtraClassBtn
);
