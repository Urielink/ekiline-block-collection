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
			d: 'M12.16,5.26l-.76-.76-3.56,3.56,.76,.76,3.56-3.56Zm-2.99,.57c.28-.28,.28-.74,0-1.02s-.74-.28-1.02,0c-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm1.65,1.65c-.28,.28-.28,.74,0,1.02s.74,.28,1.02,0c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0Zm3.46,3.13H1v5.04H19v-5.04h-4.72Zm-7.16,4.14h-1.08v-3.24h1.08v3.24Zm2.47,0h-1.15v-3.24h1.15v3.24Zm3.38,0h-2.07v-3.24h2.07v3.24Zm5.13,0h-3.82v-3.24h3.82v3.24Z'
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
 * Bloques necesarios:
 * - .progress + style:{height:val}
 * - - .progress-bar acumulable.
 * - - .progress-bar + bg-* + progress-bar-striped + progress-bar-animated
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType('ekiline-block-collection/ekiline-progress', {

	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	/**
	 * Parametros de alta.
	 * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/ 
	 */
	title: __( 'Progress', 'ekiline-block-collection' ),
	icon: customIcon,
	description: __( 'Show a bootstrap progress bar for your data.', 'ekiline-block-collection' ),
	category: 'design',
	supports: {
			anchor: true,
			color: { // Text UI control is enabled.
				background: true, // Disable background UI control.
				gradients: true, // Enable gradients UI control.
				text: false // Enable gradients UI control.
			},
	},
	attributes:{
		progHeight: {
			type: 'number',
			default: 50, // Alto de barra, 0 a 100px.
		},
	},

	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit: ( props ) => {

		const { attributes, setAttributes } = props;

		// Restringir los bloques, Cargar un preset.
		const PARENT_ALLOWED_BLOCKS = [ 'ekiline-block-collection/ekiline-progress-item' ];
		const CHILD_TEMPLATE = [ [ 'ekiline-block-collection/ekiline-progress-item' ] ];

		// Personalizar clase.
		const blockProps = useBlockProps( {
			className: 'group-progress',
			style:{
				// 22 pixeles de padding para maniobrar.
				height: (attributes.progHeight + 22) + 'px',
			}
		} );

		return (
			<div { ...blockProps }>

				{/* Inspector controles */}
				<InspectorControls>
					<PanelBody title={ __( 'Progress bar Settings', 'ekiline-block-collection' ) } initialOpen={ true }>
						<TextControl
							label={ __( 'Height bar (pixels)', 'ekiline-block-collection' ) }
							type="number"
							value={ attributes.progHeight }
							onChange={ ( newval ) =>
								setAttributes( { progHeight: parseInt( ( !newval || '0'===newval )?1:newval ) } )
							}
							min="1"
						/>
					</PanelBody>
				</InspectorControls>

				{/* El bloque */}
				<InnerBlocks
					orientation="horizontal"
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
			className: 'progress',
			style:{
				height: attributes.progHeight+'px',
			}
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
registerBlockType('ekiline-block-collection/ekiline-progress-item', {
	title: __( 'Progress data bar', 'ekiline-block-collection' ),
	parent: ['ekiline-block-collection/ekiline-progress'],
	icon: 'ellipsis',
	description: __( 'Progress data, could be multiple bars between 1 to 100.', 'ekiline-block-collection' ),
	category: 'design',
	supports: {
		anchor: false,
		color: { // Text UI control is enabled.
			background: true, // Disable background UI control.
			gradients: true, // Enable gradients UI control.
			text: true // Enable gradients UI control.
		},
	},
	attributes:{
		progRange: {
			type: 'number',
			default: 10, // Rango o contador, 0 a 100 int.
		},
		progLabel: {
			type: 'boolean',
			default: false, // Mostrar texto.
		},
		progStripes: {
			type: 'boolean',
			default: false, // Mostrar rayas + progress-bar-striped.
		},
		progAnimation: {
			type: 'boolean',
			default: false, // Animar rayas + progress-bar-animated.
		},
	},

	/**
	 * @see ./edit.js
	 */
	// edit: Edit,
	edit: ( props ) => {

		const { attributes, setAttributes } = props;

		// Personalizar clase.
		const blockProps = useBlockProps( {
			className: 'item-progress progress-bar' + ( (attributes.progAnimation) ? ' progress-bar-animated' : '' ) + ( (attributes.progStripes) ? ' progress-bar-striped' : '' ),
			// Se suple con un filtro en el editor (ver newWrapperAtts).
			// style:{
			// 	width: attributes.progRange+'%',
			// },
		} );

		return (
			<div { ...blockProps } >
				{/* Inspector controles */}
				<InspectorControls>
					<PanelBody title={ __( 'Progress bar Settings', 'ekiline-block-collection' ) } initialOpen={ true }>
						<TextControl
							label={ __( 'Data range min 1% max 100%', 'ekiline-block-collection' ) }
							type="number"
							value={ attributes.progRange }
							onChange={ ( newval ) =>
								setAttributes( { progRange: parseInt( ( !newval || '0'===newval )?1:newval ) } )
							}
							min="1"
							max="100"
						/>
						<ToggleControl
							label={ __( 'Hide number in bar.', 'ekiline-block-collection' ) }
							checked={ attributes.progLabel }
							onChange={ ( progLabel ) =>
								setAttributes( { progLabel } )
							}
						/>
						<ToggleControl
							label={ __( 'Show stripes over background.', 'ekiline-block-collection' ) }
							checked={ attributes.progStripes }
							onChange={ ( progStripes ) =>
								setAttributes( { progStripes } )
							}
						/>
						<ToggleControl
							label={ __( 'Show animation.', 'ekiline-block-collection' ) }
							checked={ attributes.progAnimation }
							onChange={ ( progAnimation ) =>
								setAttributes( { progAnimation } )
							}
						/>
					</PanelBody>
				</InspectorControls>

				{/* El bloque */}
				<p>{ attributes.progRange }</p>

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
			className: 'progress-bar' + ( (attributes.progAnimation) ? ' progress-bar-animated' : '' ) + ( (attributes.progStripes) ? ' progress-bar-striped' : '' ),
			style:{
				width: attributes.progRange+'%',
			},
		} );

		return (
			<div { ...blockProps }>
				{ (!attributes.progLabel) ? attributes.progRange : null }
			</div>
		)

	},

});


/**
 * Modificar envoltorio de editor para ver en tiempo real los cambios.
 * @link https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/
 * @link https://gist.github.com/tousignant-christopher/cd6d08c8145bb1866fd275fcb61890ca 
 * Conocer atributos.
 * console.log(props.name, props.attributes, props.attributes.progRange)
 */

import { addFilter } from '@wordpress/hooks'; // este permite crear filtros.
import { createHigherOrderComponent } from '@wordpress/compose'; // UI.

const newWrapperAtts = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {

		// Aplicar solo a bloque item progress.
		if( props.name === 'ekiline-block-collection/ekiline-progress-item' ){

			// Hook para maniobrar (wrapperProps).
			const wrapperProps = {
				...props.wrapperProps,
				style : {
					width: props.attributes.progRange+'%',
				},
			};

			return (
				<BlockListBlock { ...props }
					// className={ 'myfix-' + props.clientId }
					wrapperProps={ wrapperProps }
				/>
			);

		}

		return ( <BlockListBlock { ...props } /> );

	};
}, 'newWrapperAtts');

addFilter(
	'editor.BlockListBlock',
	'ekiline-block-collection/ekiline-progress-item',
	newWrapperAtts
);