/**
 * Tarea desarrollar un nuevo boton para toolbar.
 * Este debe aparecer en core/paragraph, button, image, gallery.
 * - verificar el dato.
 * Al dar click ejecuta un popover.
 * Dentro del popover lanza un __experimentalLinkControl con opciones personalizadas.
 * Las opciones son:
 * - Ejecutar: modal, Bslink, colapse. Esto debe estar abierto a inlcuir futuras opciones.
 * Problema:
 * - Averiguar como seleccionar una palabra.
 * - Averigaur como convertirla en enlace con atributos propios:
 * - - base: rel, target, follow.
 * - - extra:
 * class="dropdown-toggle"
 * type="button"
 * href="#ejemplo"
 * data-bs-target="#ejemplo"
 * data-bs-toggle="Bslink*", collapse*, dropdown, modal*, popover, tooltip
 * role="button"
 * aria-controls="ejemplo"
 * aria-expanded="false"
 * data-bs-placement="top", right, bottom, left.
 * data-bs-title="Custom popover"
 * data-bs-content="Top popover"
 * data-bs-custom-class="custom-popover"
 * data-bs-html="true"
 * - data-bs-title="<em>Tooltip</em>"
 *
 * - - cerrar:
 * class="btn-close"
 * data-bs-dismiss="Bslink"
 * aria-label="Close"
 *
 * Referencia de bloques:
 * @see https://www.liip.ch/en/blog/how-to-extend-existing-gutenberg-blocks-in-wordpress
 */

// import assign from 'lodash.assign'; // la noenclatura es distinta.
const { assign } = lodash;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

// Enable spacing control on the following blocks
const enableSpacingControlOnBlocks = [
	'core/image',
];

// Available spacing control options
const spacingControlOptions = [
	{
		label: __( 'None' ),
		value: '',
	},
	{
		label: __( 'Small' ),
		value: 'small',
	},
	{
		label: __( 'Medium' ),
		value: 'medium',
	},
	{
		label: __( 'Large' ),
		value: 'large',
	},
];

/**
 * Add spacing control attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addSpacingControlAttribute = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableSpacingControlOnBlocks.includes( name ) ) {
		return settings;
	}

	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		spacing: {
			type: 'string',
			default: spacingControlOptions[ 0 ].value,
		},
	} );

	return settings;
};

addFilter( 'blocks.registerBlockType', 'extend-block-example/attribute/spacing', addSpacingControlAttribute );

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;

/**
 * Create HOC to add spacing control to inspector controls of block.
 */
const withSpacingControl = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        // Do nothing if it's another block than our defined ones.
        if ( ! enableSpacingControlOnBlocks.includes( props.name ) ) {
            return (
                <BlockEdit { ...props } />
            );
        }

        const { spacing } = props.attributes;

        // add has-spacing-xy class to block
        if ( spacing ) {
            props.attributes.className = `has-spacing-${ spacing }`;
        }

        return (
            <Fragment>
                <BlockEdit { ...props } />
                <InspectorControls>
                    <PanelBody
                        title={ __( 'My Spacing Control' ) }
                        initialOpen={ true }
                    >
                        <SelectControl
                            label={ __( 'Spacing' ) }
                            value={ spacing }
                            options={ spacingControlOptions }
                            onChange={ ( selectedSpacingOption ) => {
                                props.setAttributes( {
                                    spacing: selectedSpacingOption,
                                } );
                            } }
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withSpacingControl' );

addFilter( 'editor.BlockEdit', 'extend-block-example/with-spacing-control', withSpacingControl );

/**
 * Add margin style attribute to save element of block.
 *
 * @param {object} saveElementProps Props of save element.
 * @param {Object} blockType Block type information.
 * @param {Object} attributes Attributes of block.
 *
 * @returns {object} Modified props of save element.
 */
 const addSpacingExtraProps = ( saveElementProps, blockType, attributes ) => {
    // Do nothing if it's another block than our defined ones.
    if ( ! enableSpacingControlOnBlocks.includes( blockType.name ) ) {
        return saveElementProps;
    }

    const margins = {
        small: '5px',
        medium: '15px',
        large: '30px',
    };

    if ( attributes.spacing in margins ) {
        // Use Lodash's assign to gracefully handle if attributes are undefined
        assign( saveElementProps, { style: { 'margin-bottom': margins[ attributes.spacing ] } } );
    }

    return saveElementProps;
};

addFilter( 'blocks.getSaveContent.extraProps', 'extend-block-example/get-save-content/extra-props', addSpacingExtraProps );