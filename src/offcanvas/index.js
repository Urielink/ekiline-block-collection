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
			d: 'M9.46,12.43h1.08v-1.74h-1.08v1.74Zm0,3.12h1.08v-1.74h-1.08v1.74Zm0-6.25h1.08v-1.74h-1.08v1.74ZM13.42,1H1V19H19V1h-5.58Zm0,16.92h-2.88v-.98h-1.08v.98H2.08V2.08h7.38v.97h1.08v-.97h2.88v15.84Zm3.51-6.76l-1.44-1.17,1.44-1.17v2.34Zm-7.47-4.98h1.08v-1.74h-1.08v1.74Z'
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
registerBlockType('ekiline-block-collection/ekiline-offcanvas', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	/**
	 * Parametros de alta.
	 * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
	 */
	title: __( 'Offcanvas', 'ekiline-block-collection' ),
	icon: customIcon,
	description: __( 'Add your content here, then invoque with a link anchor #anchor.', 'ekiline-block-collection' ),
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
		parentAnchor: {
			type: 'string',
		},
	},

	/**
	 * Se ocupara contexto para pasar valores.
	 * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/
	 */
	 providesContext: {
		'ekiline-offcanvas/anchor': 'anchor',
	},

	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit: (props) => {

		const { attributes, setAttributes } = props;

		// Restringir los bloques, Cargar un preset.
		const PARENT_ALLOWED_BLOCKS = [
			'ekiline-block-collection/ekiline-offcanvas-header',
			'ekiline-block-collection/ekiline-offcanvas-body',
		];

		const CHILD_TEMPLATE = [
			[ 'ekiline-block-collection/ekiline-offcanvas-header', {
				lock: {
					remove: false,
					move: true,
				}
			} ],
			[ 'ekiline-block-collection/ekiline-offcanvas-body', {
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
						{ __( 'Add this anchor: #', 'ekiline-block-collection' ) }
						{ attributes.anchor }
						{ __( ', in a button link field and in its advanced options.', 'ekiline-block-collection' ) }
						</pre>
					</div>
					)
			}

			return(
				<div class="editor-offcanvas-route">
					{ __( 'Do not forget to add an #anchor. ', 'ekiline-block-collection' )}
				</div>
			)
		}

		return (
			<div { ...blockProps }>
				{/* Inspector controles */}
				<InspectorControls>
					<PanelBody title={ __( 'Offcanvas Params', 'ekiline-block-collection' ) } initialOpen={ true }>

					<SelectControl
						label={ __( 'Position', 'ekiline-block-collection' ) }
						value={ attributes.ocPosition }
						options={ [
							{ label: __( 'Right', 'ekiline-block-collection' ), value: ' offcanvas-end' },
							{ label: __( 'Bottom', 'ekiline-block-collection' ), value: ' offcanvas-bottom' },
							{ label: __( 'Left', 'ekiline-block-collection' ), value: ' offcanvas-start' },
							{ label: __( 'Top', 'ekiline-block-collection' ), value: ' offcanvas-top' },
						] }
						onChange={ ( ocPosition ) =>
							setAttributes( { ocPosition } )
						}
					/>

					<SelectControl
						label={ __( 'Width', 'ekiline-block-collection' ) }
						value={ attributes.ocWidth }
						options={ [
							{ label: __( 'Default', 'ekiline-block-collection' ), value: '' },
							{ label: __( 'Small', 'ekiline-block-collection' ), value: ' w-25' },
							{ label: __( 'Half', 'ekiline-block-collection' ), value: ' w-50' },
							{ label: __( 'Large', 'ekiline-block-collection' ), value: ' w-75' },
							{ label: __( 'Full window', 'ekiline-block-collection' ), value: ' w-100' },
						] }
						onChange={ ( ocWidth ) =>
							setAttributes( { ocWidth } )
						}
					/>

					<SelectControl
						label={ __( 'Height', 'ekiline-block-collection' ) }
						value={ attributes.ocHeight }
						options={ [
							{ label: __( 'Default', 'ekiline-block-collection' ), value: '' },
							{ label: __( 'Small', 'ekiline-block-collection' ), value: ' h-25' },
							{ label: __( 'Half', 'ekiline-block-collection' ), value: ' h-50' },
							{ label: __( 'Large', 'ekiline-block-collection' ), value: ' h-75' },
							{ label: __( 'Full window', 'ekiline-block-collection' ), value: ' h-100' },
						] }
						onChange={ ( ocHeight ) =>
							setAttributes( { ocHeight } )
						}
					/>

					<SelectControl
						label={ __( 'Display run', 'ekiline-block-collection' ) }
						value={ attributes.ocDisplay }
						options={ [
							{ label: __( 'All', 'ekiline-block-collection' ), value: ' offcanvas' },
							{ label: __( 'Small', 'ekiline-block-collection' ), value: ' offcanvas-sm' },
							{ label: __( 'Medium', 'ekiline-block-collection' ), value: ' offcanvas-md' },
							{ label: __( 'Large', 'ekiline-block-collection' ), value: ' offcanvas-lg' },
						] }
						onChange={ ( ocDisplay ) =>
							setAttributes( { ocDisplay } )
						}
						help={ __( 'Run only on specific screen sizes', 'ekiline-block-collection' ) }
					/>

					<ToggleControl
						label={ __( 'Keep scroll window', 'ekiline-block-collection' ) }
						checked={ attributes.ocScroll }
						onChange={ ( ocScroll ) =>
							setAttributes( { ocScroll } )
						}
					/>

					<SelectControl
						label={ __( 'Backdrop behavior', 'ekiline-block-collection' ) }
						value={ attributes.ocBackdrop }
						options={ [
							{ label: __( 'Default', 'ekiline-block-collection' ), value: 'true' },
							{ label: __( 'Static', 'ekiline-block-collection' ), value: 'static' },
							{ label: __( 'False', 'ekiline-block-collection' ), value: 'false' },
						] }
						onChange={ ( ocBackdrop ) =>
							setAttributes( { ocBackdrop } )
						}
						help={ __( 'Run only on specific screen sizes', 'ekiline-block-collection' ) }
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

registerBlockType( 'ekiline-block-collection/ekiline-offcanvas-header', {
	title: __( 'Offcanvas header', 'ekiline-block-collection' ),
	parent: ['ekiline-block-collection/ekiline-offcanvas'],
	icon: 'feedback',
	description:__( 'Offcanvas header content. ', 'ekiline-block-collection' ),
	category: 'design',
	//Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
	usesContext: ['ekiline-offcanvas/anchor'],
	supports: {
		html: false,
		reusable: false,
		multiple: false,
		inserter: true,
	},
	attributes: {
		parentId: {
			type: 'string',
			default: '', // retrive parent Id (Anchor).
		},
	},
	edit: ( props ) => {

		const { attributes, setAttributes } = props;

		// Restringir los bloques, Cargar un preset.
		const PARENT_ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph' ];
		// Cargar un preset.
		const CHILD_TEMPLATE = [
			[ 'core/heading', {
				content: __( 'Add offcanvas title', 'ekiline-block-collection' ),
				level: 4,
			} ],
		];

		// personalizar clase
		const blockProps = useBlockProps( {
			className: 'editor-offcanvas-header',
		} );

		// Precargar nombre de ID Padre en objetos internos.
		if( !attributes.parentId || ( attributes.parentId !== props.context['ekiline-offcanvas/anchor'] )  ){
			setAttributes( { parentId: props.context['ekiline-offcanvas/anchor'] } )
		}

		return (
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ PARENT_ALLOWED_BLOCKS }
					template={ CHILD_TEMPLATE }
					/>
			</div>
		);
	},

	save: ( { attributes } ) => {

		// Clases y atributos auxiliares, incluir save.
		const blockProps = useBlockProps.save( {
			className: 'offcanvas-header',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
				<button
					type="button"
					class="btn-close"
					data-bs-dismiss="offcanvas"
					data-bs-target={ (attributes.parentId)?'#' + attributes.parentId:null }
					aria-label="Close"/>
			</div>
		);
	},

} );


/**
 * - ekiline-offcanvas-body
 */

registerBlockType( 'ekiline-block-collection/ekiline-offcanvas-body', {
	title: __( 'Offcanvas body content', 'ekiline-block-collection' ),
	parent: ['ekiline-block-collection/ekiline-offcanvas'],
	icon: 'feedback',
	description:__( 'Offcanvas body content. ', 'ekiline-block-collection' ),
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
			[ 'core/paragraph', { content: __( 'Add offcanvas content blocks', 'ekiline-block-collection' ) } ],
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
