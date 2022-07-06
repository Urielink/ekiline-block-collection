/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

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
// import '../editor.scss';

/**
 * Internal dependencies
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * Bloques necesarios para acordion.
 * - .accordion
 * - - .accordion-item
 * - - - .accordion-header
 * - - - - .accordion-button / [ RichText ]
 * - - - .accordion-collapse collapse / show
 * - - - - .accordion-body [bloques]
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType('ekiline-blocks/ekiline-accordion', {

	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	/**
	 * Parametros de alta.
	 * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
	 */
	title: __( 'Ekiline Accordion, full control', 'ekiline-collection' ),
	icon: 'menu-alt',
	description: __( 'Show your content as an accordion.', 'ekiline-collection' ),
	category: 'design',
	supports: {
		anchor: true,
	},
	attributes:{
		noStyle: {
			type: 'boolean',
			default: false, // add classname .accordion-flush.
		},
	},
	/**
	 * Se ocupara contexto para pasar valores.
	 * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/
	 */
	providesContext: {
		'ekiline-accordion/anchor': 'anchor',
	},

	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit: ( props ) => {

		const { attributes, setAttributes } = props;

		// Restringir los bloques, Cargar un preset.
		const PARENT_ALLOWED_BLOCKS = [ 'ekiline-blocks/ekiline-accordion-item' ];
		const CHILD_TEMPLATE = [
			[ 'ekiline-blocks/ekiline-accordion-item' ],
			[ 'ekiline-blocks/ekiline-accordion-item' ],
			[ 'ekiline-blocks/ekiline-accordion-item' ]
		];

		// Personalizar clase.
		const blockProps = useBlockProps( {
			className: 'group-accordion',
		} );

		// Precargar nombre ID.
		if( !attributes.anchor ){
			function getRandomArbitrary(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			}
			setAttributes( { anchor: 'accordion' + getRandomArbitrary(10,150) } )
		}

		return (
			<div { ...blockProps }>
				{/* Inspector controles */}
				<InspectorControls>
					<PanelBody title={ __( 'Accordion Settings', 'ekiline-collection' ) } initialOpen={ true }>
						<ToggleControl
							label={ __( 'Clear style.', 'ekiline-collection' ) }
							checked={ attributes.noStyle }
							onChange={ ( noStyle ) =>
								setAttributes( { noStyle } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				{/* El bloque */}

				<InnerBlocks
					allowedBlocks={ PARENT_ALLOWED_BLOCKS }
					template={ CHILD_TEMPLATE }/>

			</div>
		)
	},

	/**
	 * @see ./save.js
	 */
	// save,
	save: ( { attributes } ) => {

		// Clases y atributos auxiliares, incluir save.
		const blockProps = useBlockProps.save( {
			className: ( !attributes.noStyle ? 'accordion' : 'accordion accordion-flush' ),
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		)

	},


});

/**
 * Bloque interno
 */

registerBlockType('ekiline-blocks/ekiline-accordion-item', {

	title: __( 'Accordion item', 'ekiline-collection' ),
	parent: ['ekiline-blocks/ekiline-accordion'],
	icon: 'menu-alt',
	description: __( 'Set tittle and content in your accordion container', 'ekiline-collection' ),
	category: 'design',
	//Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
	usesContext: ['ekiline-accordion/anchor'],
	supports: {
		anchor: true,
		html: false,
		reusable: false,
	},
	attributes:{
		showDefault: {
			type: 'boolean',
			default: false, // remove dataset [data-bs-parent].
		},
		keepOpen: {
			type: 'boolean',
			default: true, // remove dataset [data-bs-parent].
		},
		parentId: {
			type: 'string',
			default: '', // retrive parent Id (Anchor).
		},
		content: {
			type: 'string',
			source: 'html',
			selector: 'button',
			default: __( 'Item title.', 'ekiline-collection' ),
		},
	},

	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit: ( props ) => {

		const { attributes, setAttributes } = props;

		// Cargar un preset.
		const CHILD_TEMPLATE = [
			[ 'core/paragraph', 
				{ content: __( 'Item content.', 'ekiline-collection' ) } 
			],
		];

		// personalizar clase
		const blockProps = useBlockProps( {
			className: 'child-item-accordion',
		} );

		// Precargar nombre ID en hijos.
		if( !attributes.anchor ){
			function getRandomArbitrary(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			}
			setAttributes( { anchor: 'accordionChild' + getRandomArbitrary(10,150) } )
		}

		// Precargar nombre de ID Padre en objetos internos.
		if( !attributes.parentId || ( attributes.parentId !== props.context['ekiline-accordion/anchor'] )  ){
			setAttributes( { parentId: props.context['ekiline-accordion/anchor'] } )
		}

		return (
			<div { ...blockProps }>
				{/* Inspector controles */}
				<InspectorControls>
					<PanelBody title={ __( 'Accordion Item Params', 'ekiline-collection' ) } initialOpen={ true }>
					<ToggleControl
						label={ __( 'Show element by default.', 'ekiline-collection' ) }
						checked={ attributes.showDefault }
						onChange={ ( showDefault ) =>
							setAttributes( { showDefault } )
						}
					/>
					<ToggleControl
						label={ __( 'Toggle.', 'ekiline-collection' ) }
						checked={ attributes.keepOpen }
						onChange={ ( keepOpen ) =>
							setAttributes( { keepOpen } )
						}
						help={__('Close previously active accordion elements.', 'ekiline-collection')}
					/>
					</PanelBody>
				</InspectorControls>

				{/* El bloque */}
				<RichText
					withoutInteractiveFormatting={ true }
					allowedFormats={ ['core/bold', 'core/italic', 'core/image', 'core/align' ] } //Formatos de texto.
					tagName="p" // The tag here is the element output and editable in the admin
					className={ 'item-title' }
					value={ attributes.content } // Any existing content, either from the database or an attribute default
					onChange={ ( content ) => setAttributes( { content } ) } // Store updated content as a block attribute
					placeholder={ __( 'Accordion Title', 'ekiline-collection' ) } // Display this text before any content has been added by the user
				/>
				<InnerBlocks
					template={ CHILD_TEMPLATE }/>
			</div>
		)
	},

	/**
	 * @see ./save.js
	 */
	// save,
	save: ( { attributes } ) => {

		// Clases y atributos auxiliares, incluir save.
		const blockProps = useBlockProps.save( {
			className: 'accordion-item',
		} );

		const itemBlockProps = useBlockProps.save( {
			headingId: (!blockProps.id)?null:'heading' + blockProps.id,
			itemId: (!blockProps.id)?null:'item' + blockProps.id,
			itemClassName: ( !attributes.showDefault ? 'accordion-collapse collapse' : 'accordion-collapse collapse show' ),
		} );

		return (
			<div { ...blockProps }>
				<h2 class="accordion-header"
					id={ itemBlockProps.headingId }
				>
					<RichText.Content
						tagName="button"
						className={ 'accordion-button' }
						type="button"
						value={ attributes.content }
						data-bs-toggle="collapse"
						data-bs-target={ (itemBlockProps.itemId)?'#' + itemBlockProps.itemId:null }
					/>
				</h2>
				<div
					id={ itemBlockProps.itemId }
					className={ itemBlockProps.itemClassName }
					data-bs-parent={ (attributes.keepOpen && attributes.parentId)?'#' + attributes.parentId:null }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		)

	},


});
