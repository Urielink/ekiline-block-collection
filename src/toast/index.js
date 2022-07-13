/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor';
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
			d: 'M5.35,3.63l-2.03,.3,.84,5.66,2.03-.3-.84-5.66Zm.73,6.69c-.48-.36-1.16-.26-1.51,.22s-.26,1.16,.22,1.51c.48,.36,1.16,.26,1.51-.22s.26-1.16-.22-1.51Zm12.93-1.1h-5.4V1H1V19H13.6v-2.22h5.4v-7.56Zm-6.48,8.7H2.08V2.08H12.52v7.14h-2.88c-.99,0-1.8,.81-1.8,1.8v3.96c0,.99,.81,1.8,1.8,1.8h2.88v1.14Zm-2.88-2.22c-.4,0-.72-.32-.72-.72v-3.96c0-.4,.32-.72,.72-.72h8.28v5.4H9.64Zm7.86-4.37l-.76-.76-.63,.63-.63-.63-.76,.76,.63,.63-.64,.64,.76,.76,.64-.64,.64,.64,.76-.76-.64-.64,.63-.63Z'
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
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( 'ekiline-collection/ekiline-toast', {

	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	/**
	 * Parametros de alta.
	 * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
	 */
	title: __( 'Ekiline toast, full control', 'ekiline-collection' ),
	icon: customIcon,
	description: __( 'Show small bootstrap-style notices.', 'ekiline-collection' ),
	category: 'design',
	supports: {
		anchor: true,
		html: false,
	},

	/**
	 * Argumentos para personalizacion.
	 */
	attributes:{
		toastPosition: {
			type: 'string',
			default: ' bottom-0 end-0',
		},
	},

	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit:(props)=>{

		const { attributes, setAttributes } = props;

		const blockProps = useBlockProps( {
			className: 'group-toast',
		} );

		// Restringir los bloques, Cargar un preset.
		const PARENT_ALLOWED_BLOCKS = [ 'ekiline-collection/ekiline-toast-item' ];
		const CHILD_TEMPLATE = [
			[ 'ekiline-collection/ekiline-toast-item', {
				lock: {
					remove: false,
					move: true,
				}
			} ],
		];

		return (
			<div {...blockProps}>
				{/* Inspector controles */}
				<InspectorControls>
					<PanelBody title={ __( 'Toast group options', 'ekiline-collection' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Display position', 'ekiline-collection' ) }
						value={ attributes.toastPosition }
						options={ [
							{ label: __( 'Bottom right', 'ekiline-collection' ), value: ' bottom-0 end-0' },
							{ label: __( 'Bottom left', 'ekiline-collection' ), value: ' bottom-0 start-0' },
							{ label: __( 'Top right', 'ekiline-collection' ), value: ' top-0 end-0' },
							{ label: __( 'Top left', 'ekiline-collection' ), value: ' top-0 start-0' },
						] }
						onChange={ ( toastPosition ) =>
							setAttributes( { toastPosition } )
						}
					/>
					</PanelBody>
				</InspectorControls>
				{/* Contenido */}
				<InnerBlocks
					allowedBlocks={ PARENT_ALLOWED_BLOCKS }
					template={ CHILD_TEMPLATE }
				/>
			</div>
		);
	},

	/**
	 * @see ./save.js
	 */
	// save,
	save:( { attributes } )=>{

		const blockProps = useBlockProps.save( {
			className: 'toast-container position-fixed p-md-1 p-md-3' + attributes.toastPosition,
		} );

		return (
		<div {...blockProps}>
			<InnerBlocks.Content/>
		</div>
		);
	},

} );

/**
 * Toast Item.
 */
registerBlockType( 'ekiline-collection/ekiline-toast-item', {
	title: __( 'Ekiline toast item.', 'ekiline-collection' ),
	parent: ['ekiline-collection/ekiline-toast'],
	icon: 'lightbulb',
	description: __( 'Each toast can be executed by time, at the end of scrolling, or with the cursor outside the window. You can stack as many as you need.', 'ekiline-collection' ),
	category: 'design',
	supports: {
		anchor: true,
		html: false,
		multiple: false,
		reusable: true,
		// inserter: false,
	},
	/**
	 * Argumentos para personalizacion.
	 */
	attributes:{
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		toastTime: {
			type: 'number',
			default: 0,
		},
		toastScroll: {
			type: 'boolean',
			default: false,
		}
	},

	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit:(props)=>{

		const { attributes, setAttributes } = props;

		const blockProps = useBlockProps( {
			className: 'toast-item',
		} );

		// Cargar un preset.
		const CHILD_TEMPLATE = [
			[ 'core/paragraph', {
				content: __( 'Add toast content.', 'ekiline-modal' ),
			} ],
		];

		return (
			<div {...blockProps}>

				{/* Inspector controles */}
				<InspectorControls>
					<PanelBody title={ __( 'Toast Params', 'ekiline-collection' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Run by time', 'ekiline-collection' ) }
						type="number"
						value={ attributes.toastTime }
						onChange={ ( newval ) =>
							setAttributes( { toastTime: parseInt( newval ) } )
						}
						help={
							( attributes.toastTime > 0 )
							? __( 'Run after page load "' + attributes.toastTime + '" milliseconds.', 'ekiline-collection' )
							: __( '"' + attributes.toastTime + '" run immediately on page load.', 'ekiline-collection' )
						}
					/>
					<ToggleControl
						label={ __( 'Run at end of page scroll.', 'ekiline-collection' ) }
						checked={ attributes.toastScroll }
						onChange={ ( toastScroll ) =>
							setAttributes( { toastScroll } )
						}
					/>
					</PanelBody>
				</InspectorControls>

				{/* Contenido */}
				<RichText
					tagName="p"
					value={ attributes.content }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					onChange={ ( content ) => setAttributes( { content } ) }
					placeholder={ __( 'Add toast title', 'ekiline-collection' ) }
					className={'item-title'}
				/>
				<InnerBlocks
					template={ CHILD_TEMPLATE }
				/>

			</div>
		);
	},

	/**
	 * @see ./save.js
	 */
	// save,
	save:( { attributes } )=>{

		const blockProps = useBlockProps.save( {
			className: 'toast-item toast'
			+ ((attributes.toastScroll)?' launch-scroll hide':'')
			+ ((attributes.toastTime!==0)?' launch-time hide':''),
			'data-ek-launch-time' : ( attributes.toastTime || null ),
		} );

		return (
		<div {...blockProps}>
			<div class="toast-header">
				<p class="me-auto my-0">{ attributes.content }</p>
				<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
			</div>
			<div class="toast-body">
				<InnerBlocks.Content/>
			</div>
		</div>
		);
	},

} );
