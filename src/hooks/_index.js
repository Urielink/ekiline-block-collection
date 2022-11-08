/**
 * Complementos para crear nuevos atributos.
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
 import { __ } from '@wordpress/i18n';

/**
 * Importar otras dependencias de WP.
 */
 import { Fragment } from '@wordpress/element'; // UI.
 import { createHigherOrderComponent } from '@wordpress/compose'; // UI.

/**
 * Ejercicio, nueva opcion toolbar.
 * @see https://mariecomet.fr/en/2021/12/14/adding-options-controls-existing-gutenberg-block/
 * @see https://nickdiego.com/programmatically-add-classes-to-blocks-in-the-wordpress-editor-based-on-attributes/
 * - Setup
 * - Control
 */

const enableToolbarButtonOnBlocks = [ 'core/paragraph' ];

const setToolbarButtonAttribute = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableToolbarButtonOnBlocks.includes( name ) ) {
		return settings;
	}

	return Object.assign( {}, settings, {
		attributes: Object.assign( {}, settings.attributes, {
			paragraphAttribute: { type: 'string' }
		} ),
	} );
};
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'custom-attributes/set-toolbar-button-attribute',
	setToolbarButtonAttribute
);

//Control.
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

const withToolbarButton = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		// If current block is not allowed
		if ( ! enableToolbarButtonOnBlocks.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const { attributes, setAttributes } = props;
		const { paragraphAttribute } = attributes;

		return (
			<Fragment>
				<BlockControls group="block">
					<ToolbarGroup>
						<ToolbarButton
							icon="format-status"
							label={ __( 'Custom Button', 'core-block-custom-attributes' ) }
							isActive={ paragraphAttribute === 'custom' }
							onClick={ () => {
								if ( paragraphAttribute === 'custom' ) {
									setAttributes( { paragraphAttribute: false } )
								} else {
									setAttributes( { paragraphAttribute: 'custom' } )
								}
							} }
						/>
					</ToolbarGroup>
				</BlockControls>
				<BlockEdit { ...props } />
			</Fragment>
		);
	};
}, 'withToolbarButton' );

wp.hooks.addFilter(
	'editor.BlockEdit',
	'custom-attributes/with-toolbar-button',
	withToolbarButton
);

// Guardar y mostrar.

const saveToolbarButtonAttribute = ( extraProps, blockType, attributes ) => {
	// Do nothing if it's another block than our defined ones.
	if ( enableToolbarButtonOnBlocks.includes( blockType.name ) ) {

		const { paragraphAttribute } = attributes;

		if ( paragraphAttribute && 'custom' === paragraphAttribute ) {
			// Esta es una funcion de react, WP cuenta con su metodo de agregar clases.
			// extraProps.className = classnames( extraProps.className, 'has-custom-attribute' )
			extraProps.className = ( extraProps.className ) ? 'your-custom-class ' + extraProps.className : 'your-custom-class';
		}

	}

	return extraProps;

};
wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'custom-attributes/save-toolbar-button-attribute',
	saveToolbarButtonAttribute
);
