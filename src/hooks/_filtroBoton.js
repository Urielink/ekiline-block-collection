/**
 * Complementos para crear nuevos atributos.
 */


/**
 * nuevo experimento, verificado, esto agrega valores a un boton.
 * @see https://gist.github.com/junaidbhura/cafa1b83fe4906638371ac1ffedebea4
 */

/**
 * Button.
 */

import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, cloneElement } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';


//  import wp from 'wp';
//  const { __ } = wp.i18n;
//  const { addFilter } = wp.hooks;
//  const { createHigherOrderComponent } = wp.compose;
//  const { Fragment, cloneElement } = wp.element;
//  const { InspectorControls } = wp.editor;
//  const { PanelBody, ToggleControl } = wp.components;

// Attributes.
addFilter(
	'blocks.registerBlockType',
	'jb/core-button',
	( props, name ) => {
		if ( 'core/button' !== name ) {
			return props;
		}

		const attributes = {
			...props.attributes,
			target: {
				type: 'string',
				default: '',
				source: 'attribute',
				attribute: 'target',
				selector: 'a',
			},
		};

		return { ...props, attributes };
	}
);

// Edit.
const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		if ( 'core/button' !== props.name ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes } = props;
		const checked = '_blanktest' === attributes.target;

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody title={ __( 'Options' ) }>
						<ToggleControl
							label={ __( 'New Window' ) }
							checked={ checked }
							onChange={ () => setAttributes( { target: checked ? '' : '_blanktest' } ) }
							help={ __( 'Open this link in a new window?' ) }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withInspectorControls' );

addFilter(
	'editor.BlockEdit',
	'jb/core-button',
	withInspectorControls
);

// Save.
addFilter(
	'blocks.getSaveElement',
	'jb/core-button',
	( element, block, attributes ) => {
		if ( 'core/button' !== block.name ) {
			return element;
		}

		if ( '_blanktest' === attributes.target ) {
			return cloneElement(
				element,
				{},
				cloneElement( element.props.children, {
					target: '_blanktest',
					rel: 'noreferrer noopener',
				} )
			);
		}

		return element;
	}
);


/**
 * otra prueba
 */
// const { createHigherOrderComponent } = wp.compose;
// const { Fragment } = wp.element;
// const { InspectorControls } = wp.blockEditor;
// const { PanelBody } = wp.components;

// const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
// 	return ( props ) => {
// 		return (
// 			<Fragment>
// 				<BlockEdit { ...props } />
// 				<InspectorControls>
// 					<PanelBody>My custom control</PanelBody>
// 				</InspectorControls>
// 			</Fragment>
// 		);
// 	};
// }, 'withInspectorControl' );

// wp.hooks.addFilter(
// 	'editor.BlockEdit',
// 	'my-plugin/with-inspector-controls',
// 	withInspectorControls
// );