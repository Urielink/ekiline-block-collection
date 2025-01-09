/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

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
			d: 'M10,1H1V19H19V1H10Zm-3.33,1.8l-1.17,1.44-1.17-1.44h2.34Zm11.25,15.12H2.08V6.04h15.84v11.88Zm0-13.23h-7.92V2.08h7.92v2.61Z'
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
 * Bloques necesarios para tabs.
 * .tabs-wrapper
 * - .tabs-navbar
 * - - .tab-link
 * - .tabs-container
 * - - .tab-content
 *
 * Referencias para anidado.
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 *
 * No mostrar en inspector.
 * @ref https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
 */
registerBlockType( 'ekiline-collection/ekiline-tabs', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	/**
	 * Parametros de alta.
	 * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
	 */
	title: __( 'Tabs', 'ekiline-block-collection' ),
	icon: customIcon,
	description: __( 'Add a tabs for your posts, full control.', 'ekiline-block-collection' ),
	category: 'design',
	supports: {
		inserter: true,
		anchor: true,
		align: [ 'wide', 'full' ],
		html: false,
		color: {
			background: true,
		},
	},

	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit: () => {

		// Restringir los bloques, Cargar un preset.
		const PARENT_ALLOWED_BLOCKS = [ 'ekiline-collection/ekiline-tabs-navbar', 'ekiline-collection/ekiline-tabs-container' ];
		const CHILD_TEMPLATE = [
			[ 'ekiline-collection/ekiline-tabs-navbar',{
				className: 'is-style-nav-tabs',
			} ],
			[ 'ekiline-collection/ekiline-tabs-container' ]
		];
		// personalizar clase
		const blockProps = useBlockProps( {
			className: 'tabs-wrapper',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ PARENT_ALLOWED_BLOCKS }
					template={ CHILD_TEMPLATE }/>
			</div>
		);
	},

	/**
	 * @see ./save.js
	 */
	// save,
	save: () => {

		// personalizar clase
		const blockProps = useBlockProps.save( {
			className: 'tabs-wrapper',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

/**
 * tabs-navbar
 */

registerBlockType( 'ekiline-collection/ekiline-tabs-navbar', {
	title: __( 'Tabs Nav Bar', 'ekiline-block-collection' ),
	parent: ['ekiline-collection/ekiline-tabs'],
	icon: 'editor-kitchensink',
	description: __( 'Tab navigation, add your links.', 'ekiline-block-collection' ),
	category: 'design',
	supports: {
		html: false,
		reusable: false,
		multiple: false,
		inserter: false,
	},
	// Register block styles.
	styles: [
		{
			name: 'nav-tabs',
			label: __( 'Tabs' ),
			className: 'nav-tabs',
			isDefault: true,
		},
		{
			name: 'nav-pills',
			label: __( 'Pills' ),
			className: 'nav-pills',
		},
	],

	edit: (props) => {

		const { attributes, setAttributes } = props;

		// Restringir los bloques, Cargar un preset.
		const PARENT_ALLOWED_BLOCKS = [ 'ekiline-collection/ekiline-tab-link' ];
		const CHILD_TEMPLATE = [
			[ 'ekiline-collection/ekiline-tab-link', {
				content: __( 'Tab link 1', 'ekiline-block-collection' ),
				className: 'active',
			} ],
			[ 'ekiline-collection/ekiline-tab-link', { content: __( 'Tab link 2', 'ekiline-block-collection' ) } ],
		];

		const blockProps = useBlockProps( {
			className: 'tabs-navbar',
		} );

		// Nueva clase de apoyo, reemplazar para ocupar bootstrap.
		if ( attributes.className ){

			function addnewClassName(clase){

				if( clase.includes('is-style-nav-tabs') ){
					if( clase.includes('nav-pills') ){
						clase = clase.replaceAll('nav-pills', '')
					}
					clase = clase.replace('is-style-nav-tabs', 'nav-tabs')
				}

				if( clase.includes('is-style-nav-pills') ){
					if( clase.includes('nav-tabs') ){
						clase = clase.replaceAll('nav-tabs', '')
					}
					clase = clase.replace('is-style-nav-pills', 'nav-pills')
				}

				return clase;
			}

			setAttributes( { className: addnewClassName(attributes.className) } );
		}

		return (
			<div { ...blockProps }>
				<InnerBlocks
					orientation="horizontal"
					allowedBlocks={ PARENT_ALLOWED_BLOCKS }
					template={ CHILD_TEMPLATE }/>
			</div>
		);
	},

	save: () => {

		// personalizar clase
		const blockProps = useBlockProps.save( {
			className: 'nav',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

/**
 * - - tab-link
 * p1) Requiere RichText
 * p2) Requiere Registrar un nuevo formato para insertar un boton.
 */
import { RichText } from '@wordpress/block-editor';

registerBlockType( 'ekiline-collection/ekiline-tab-link', {
	title: __( 'Tab Link', 'ekiline-block-collection' ),
	parent: ['ekiline-collection/ekiline-tabs-navbar'],
	icon: 'button',
	description: __( 'Tab button link. Copy Anchor text and paste on Tab Content Anchor field.', 'ekiline-block-collection' ),
	category: 'design',
	supports: {
		html: false,
		reusable: false,
		// inserter: false,
		color: {
			background: true,
		},
	},
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'button',
			default: __( 'Tab link', 'ekiline-block-collection' ),
		},
		dataBsTarget: {
			type: 'string',
			default: '', // id from title.
		},
	},

	edit: ( props ) => {

		const { attributes, setAttributes } = props;

		// personalizar clase
		const blockProps = useBlockProps( {
			className: 'tab-link',
		} );

		// limpiar tambien caracteres especiales. anchor + replace/lowercase.
		// https://ricardometring.com/javascript-replace-special-characters
		const replaceSpecialChars = (str) => {
			return str.normalize('NFD').replace(/(<([^>]+)>)/gi, "") // Eliminar HTML
				.replace(/[\u0300-\u036f]/g, '') // Remove accents
				.replace(/([^\w]+|\s+)/g, '-') // Replace space and other characters by hyphen
				.replace(/\-\-+/g, '-')	// Replaces multiple hyphens by one hyphen
				.replace(/(^-+|-+$)/, '') // Remove extra hyphens from beginning or end of the string
				.toLowerCase(); // convierte a minusculas
		}

		return (
			<div>
				{/* Inspector controles */}
				<InspectorControls>
					<PanelBody title={ __( 'Tab Link Params', 'ekiline-block-collection' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Copy this value in a Content Tab HTML anchor field.', 'ekiline-block-collection' ) }
						type="string"
						value={ attributes.dataBsTarget = replaceSpecialChars( attributes.content ) }
						onChange={ (dataBsTarget) =>
							setAttributes( { dataBsTarget } )
						}
						readOnly
					/>
					</PanelBody>
				</InspectorControls>

				<RichText
					withoutInteractiveFormatting={ true }
					allowedFormats={ ['core/bold', 'core/italic', 'core/image', 'core/align', 'ekiline-format/find-anchor' ] } //un formato nuevo para TAB.
					tagName="p" // The tag here is the element output and editable in the admin
					className={ blockProps.className }
					value={ attributes.content } // Any existing content, either from the database or an attribute default
					onChange={ ( content ) => setAttributes( { content } ) } // Store updated content as a block attribute
					// placeholder={ __( 'Titlulo de tab...' ) } // Display this text before any content has been added by the user
				/>
			</div>
		);
	},
	save: ( { attributes } ) => {

		// personalizar clase
		const blockProps = useBlockProps.save( {
			className: 'tab-link nav-link',
			anchorData: '#'+attributes.dataBsTarget,
		} );

		return (
			<RichText.Content
				tagName="button"
				className={ blockProps.className }
				value={ attributes.content }
				data-bs-toggle="pill"
				data-bs-target={ blockProps.anchorData }
				type="button"
			/>
		)

	},
} );

/**
 * P2) Boton auxiliar:
 * Declaro un estilo y lo ocupo como control para acceder a una funcion.
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/format-api/
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/introducing-attributes-and-editable-fields/
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/format-api/3-apply-format/
 */
import { compose, ifCondition } from '@wordpress/compose';
import { registerFormatType } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';

// Boton.
const findAnchorButton = ( props ) => {
	return (
		<RichTextToolbarButton
			icon="code-standards"
			title="Find anchor"
			onClick={ () => {
				// console.log( props.value.text );
				// limpiar tambien caracteres especiales. anchor + replace/lowercase.
				const replaceSpecialChars = (str) => {
					return str.normalize('NFD').replace(/(<([^>]+)>)/gi, "") // Eliminar HTML
						.replace(/[\u0300-\u036f]/g, '') // Remove accents
						.replace(/([^\w]+|\s+)/g, '-') // Replace space and other characters by hyphen
						.replace(/\-\-+/g, '-')	// Replaces multiple hyphens by one hyphen
						.replace(/(^-+|-+$)/, '') // Remove extra hyphens from beginning or end of the string
						.toLowerCase(); // convierte a minusculas
				}
				const linkToTab = replaceSpecialChars( props.value.text );

				alert( __( 'Tab-Content Anchor: ' + linkToTab , 'ekiline-block-collection' ) )
			} }
		/>
	);
};

// Condicion.
const ConditionalButton = compose(
	withSelect( function ( select ) {
		return {
			selectedBlock: select( 'core/block-editor' ).getSelectedBlock(),
		};
	} ),
	ifCondition( function ( props ) {
		return (
			// props.selectedBlock && props.selectedBlock.name === 'core/paragraph'
			props.selectedBlock && props.selectedBlock.name === 'ekiline-collection/ekiline-tab-link'
		);
	} )
)( findAnchorButton );

// Formato a registrar.
registerFormatType( 'ekiline-format/find-anchor', {
	title: 'Find anchor',
	tagName: 'findanchor',
	className: null,
	edit: ConditionalButton,
} );


/**
 * - tabs-container
 */

registerBlockType( 'ekiline-collection/ekiline-tabs-container', {
	title: __( 'Tabs container', 'ekiline-block-collection' ),
	parent: ['ekiline-collection/ekiline-tabs'],
	icon: 'editor-kitchensink',
	description: __( 'All tabs add here.', 'ekiline-block-collection' ),
	category: 'design',
	supports: {
		html: false,
		reusable: false,
		multiple: false,
		inserter: false,
	},

	edit: () => {

		// Restringir los bloques, Cargar un preset.
		const PARENT_ALLOWED_BLOCKS = [ 'ekiline-collection/ekiline-tab-content' ];
		const CHILD_TEMPLATE = [
			[ 'ekiline-collection/ekiline-tab-content', {
				className: 'active show',
				anchor: 'tab-link-1'
			} ],
			[ 'ekiline-collection/ekiline-tab-content', {
				anchor: 'tab-link-2'
			} ],
		];
		// personalizar clase
		const blockProps = useBlockProps( {
			className: 'tabs-container',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ PARENT_ALLOWED_BLOCKS }
					template={ CHILD_TEMPLATE }/>
			</div>
		);
	},
	save: () => {

		// personalizar clase
		const blockProps = useBlockProps.save( {
			className: 'tabs-container tab-content',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

/**
 * - - tab-content
 */

registerBlockType( 'ekiline-collection/ekiline-tab-content', {
	title: __( 'Tab Content', 'ekiline-block-collection' ),
	parent: ['ekiline-collection/ekiline-tabs-container'],
	icon: 'feedback',
	description:__( 'Inner tab content. Find Tab Link anchor text, and paste on Anchor field.', 'ekiline-block-collection' ),
	category: 'design',
	supports: {
		anchor: true,
		html: false,
		reusable: false,
		// multiple: false,
		// inserter: false,
	},
	edit: () => {
		// Cargar un preset.
		const CHILD_TEMPLATE = [
			[ 'core/paragraph', { content: __( 'Add your content and blocks, then copy anchor name to tab content block', 'ekiline-block-collection' ) } ],
		];

		// personalizar clase
		const blockProps = useBlockProps( {
			className: 'tab-content',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks
					template={ CHILD_TEMPLATE }/>
			</div>
		);
	},

	save: () => {

		// Clases y atributos auxiliares, incluir save.
		const blockProps = useBlockProps.save( {
			className: 'tab-content tab-pane fade',
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},

} );

