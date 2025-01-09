/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';

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
			d: 'M15.55,11.31h-1.74v1.08h1.74v-1.08Zm-3.12,0h-1.74v1.08h1.74v-1.08ZM1,1V19H19V1H1Zm16.19,1.8l-1.17,1.44-1.17-1.44h2.34Zm.73,8.51h-.98v1.08h.98v5.53H2.08v-5.53h.97v-1.08h-.97V6.04h15.84v5.27Zm-11.74,0h-1.74v1.08h1.74v-1.08Zm3.12,0h-1.74v1.08h1.74v-1.08Z'
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
 *
 * Bloques necesarios para collapse.
 * - button/a: {data-bs-toggle:collapse, href:#id} (usar filtros.)
 * - .collapse, #id
 * - ó -
 * - div:{min-height}
 * - collapse, #id
 * - div:{width:opcional}
 */
registerBlockType('ekiline-collection/ekiline-collapse', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	/**
	 * Parametros de alta.
	 * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
	 */
	title: __( 'Collapse', 'ekiline-block-collection' ),
	icon: customIcon,
	description: __( 'Set a collapse behavior block. You can activate from any button.', 'ekiline-block-collection' ),
	category: 'design',
	supports: {
		anchor: true,
	},

	/**
	 * Argumentos para personalizacion.
	 */
	attributes:{
		horizontal: {
			type: 'boolean',
			default: false, // set horizontal (.collapse-horizontal).
		},
	},

	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit:(props)=>{

		const { attributes, setAttributes } = props;
		// const PARENT_ALLOWED_BLOCKS = [ 'core/buttons' ];
		const CHILD_TEMPLATE = [ [ 'core/paragraph', { content: __( 'Add your content', 'ekiline-block-collection' ) } ] ];

		const blockProps = useBlockProps( {
			className: 'group-collapse',
		} );

		/**
		 * Control personalizado: recordatorio
		 */
		function CollapseUserRemind(){

			if ( attributes.anchor ){
				return(
					<div class="editor-collapse-route has-anchor">
						<pre>
						{ '#' + attributes.anchor }
						<br></br>
						{ __( 'Add this #anchor to a button and its advanced options.', 'ekiline-block-collection' ) }
						</pre>
					</div>
					)
			}

			return(
				<div class="editor-collapse-route">
					{ __( 'Do not forget to add an anchor. ', 'ekiline-block-collection' )}
				</div>
			)
		}

		return (
			<div {...blockProps}>
				{/* Inspector controles */}
				<InspectorControls>
					<PanelBody title={ __( 'Collapse Params', 'ekiline-block-collection' ) } initialOpen={ true }>
					<ToggleControl
						label={ __( 'Horizontal collapse', 'ekiline-block-collection' ) }
						checked={ attributes.horizontal }
						onChange={ ( horizontal ) =>
							setAttributes( { horizontal } )
						}
					/>
					</PanelBody>
				</InspectorControls>
				{/* Contenido */}
				<InnerBlocks
					template={ CHILD_TEMPLATE }
				/>
				<CollapseUserRemind/>
			</div>
		);
	},

	/**
	 * @see ./save.js
	 */
	// save,
	save:( { attributes } )=>{

		const blockProps = useBlockProps.save( {
			className: 'collapse' + ( ( attributes.horizontal ) ? ' collapse-horizontal' : '' ),
			style: {
				'min-height': ( ( attributes.horizontal ) ? '120px' : null ),
			},
			contentStyle: {
				'min-width':  ( ( attributes.horizontal ) ? '300px' : null ),
			}
		} );

		// Condicion para crear envoltorio.
		function CollapseWrapper(){
			if (attributes.horizontal){
				return (
					<div style={ (attributes.horizontal)?blockProps.contentStyle:null }>
						<InnerBlocks.Content/>
					</div>
				);
			} else {
				return(
					<InnerBlocks.Content/>
				)
			}
		}

		return (
				<div { ...blockProps }>
					<CollapseWrapper/>
				</div>
		);
	},
});
