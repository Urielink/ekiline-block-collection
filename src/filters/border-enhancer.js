import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Ajusta esta ruta según dónde tengas tu módulo de bordes.
// Debe apuntar al índice que exporta BorderBoxField, BorderRadiusField,
// DEFAULT_BORDER, DEFAULT_BORDER_RADIUS, sanitizeBorderValue, sanitizeBorderRadiusValue.
import {
  BorderBoxField,
  BorderRadiusField,
  DEFAULT_BORDER,
  DEFAULT_BORDER_RADIUS,
  sanitizeBorderValue,
  sanitizeBorderRadiusValue,
  getBorderStyles,
  getRadiusWithDefaults,
} from '../shared/border-box';

// 🔧 Bloques que soportarán el panel global de bordes.
// Agrega aquí todos los bloques donde quieras activar esta característica.
const BORDER_ENABLED_BLOCKS = [
  'ekiline-block-collection/ekiline-toast-item',
  'ekiline-block-collection/ekiline-offcanvas',
  'ekiline-block-collection/ekiline-modal',
  'ekiline-block-collection/ekiline-modal-header',
  'ekiline-block-collection/ekiline-modal-body',
  'ekiline-block-collection/ekiline-modal-footer'
];

export const isBorderEnabledBlock = ( blockName ) =>
  BORDER_ENABLED_BLOCKS.includes( blockName );

/**
 * Filtro: añadir atributos `border` y `borderRadius` a los bloques permitidos.
 */
function addBorderAttributes( settings, name ) {
  if ( ! isBorderEnabledBlock( name ) ) {
    return settings;
  }

  const newSettings = { ...settings };

  newSettings.attributes = newSettings.attributes || {};

  // No pisamos atributos existentes: solo los añadimos si no están definidos.
  if ( ! newSettings.attributes.border ) {
    newSettings.attributes.border = {
      type: 'object',
      default: { ...DEFAULT_BORDER },
    };
  }

  if ( ! newSettings.attributes.borderRadius ) {
    newSettings.attributes.borderRadius = {
      type: 'string',
      default: DEFAULT_BORDER_RADIUS,
    };
  }

  // Opcional: nos aseguramos de que supports.border exista para aprovechar
  // la integración futura con el soporte nativo de bordes.
  newSettings.supports = newSettings.supports || {};
  newSettings.supports.border = newSettings.supports.border || {
    color: true,
    radius: true,
    style: true,
    width: true,
  };

  return newSettings;
}

addFilter(
  'blocks.registerBlockType',
  'ekiline/border-attributes',
  addBorderAttributes
);

/**
 * HOC: añade un panel de "Border" al InspectorControls (grupo styles)
 * para los bloques definidos en BORDER_ENABLED_BLOCKS.
 */
const withBorderControls = createHigherOrderComponent( ( BlockEdit ) => {
  return ( props ) => {
    const { name, attributes, setAttributes } = props;

    if ( ! isBorderEnabledBlock( name ) ) {
      return <BlockEdit { ...props } />;
    }

    const { border, borderRadius } = attributes;

    // Siempre normalizamos antes de pasar al control.
    const normalizedBorder = sanitizeBorderValue( border );

    const handleBorderChange = ( nextBorder ) => {
      const sanitized = sanitizeBorderValue( nextBorder );

      if ( JSON.stringify( sanitized ) === JSON.stringify( border ) ) {
        return;
      }

      setAttributes( { border: sanitized } );
    };

    const handleBorderRadiusChange = ( nextRadius ) => {
      // allowEmpty = true para que el usuario pueda limpiar el valor.
      const sanitized = sanitizeBorderRadiusValue(
        nextRadius,
        true,
        DEFAULT_BORDER_RADIUS
      );

      if ( sanitized === borderRadius ) {
        return;
      }

      setAttributes( { borderRadius: sanitized } );
    };

    return (
      <>
        <BlockEdit { ...props } />
        <InspectorControls group="styles">
        {/* Shared field that wraps Gutenberg's BorderBoxControl to consume theme palettes
            and sanitize the per-side colors/styles before persisting them. */}
          <PanelBody
            title={ __( 'Border', 'ekiline-block-collection' ) }
            initialOpen={ true }
          >
            <BorderBoxField
              label={ __( 'Border', 'ekiline-block-collection' ) }
              value={ normalizedBorder }
              onChange={ handleBorderChange }
              __experimentalIsRenderedInSidebar
            />
            <BorderRadiusField
              value={ borderRadius }
              onChange={ handleBorderRadiusChange }
            />
          </PanelBody>
        </InspectorControls>
      </>
    );
  };
}, 'withBorderControls' );

addFilter(
  'editor.BlockEdit',
  'ekiline/with-border-controls',
  withBorderControls
);

/**
 * HOC: aplica estilos de borde al wrapper del bloque en el editor.
 */
const withBorderWrapperStyles = createHigherOrderComponent(
  ( BlockListBlock ) => {
    return ( props ) => {
      const { name, attributes, wrapperProps = {} } = props;

      if ( ! isBorderEnabledBlock( name ) ) {
        return <BlockListBlock { ...props } />;
      }

      const { border, borderRadius } = attributes;

      const normalizedBorder    = sanitizeBorderValue( border );
      const borderStyles        = getBorderStyles( normalizedBorder );
      const appliedBorderRadius = getRadiusWithDefaults(
        borderRadius,
        DEFAULT_BORDER_RADIUS
      );

      const mergedWrapperProps = {
        ...wrapperProps,
        style: {
          ...( wrapperProps.style || {} ),
          ...borderStyles,
          borderRadius: appliedBorderRadius,
        },
      };

      return (
        <BlockListBlock
          { ...props }
          wrapperProps={ mergedWrapperProps }
        />
      );
    };
  },
  'withBorderWrapperStyles'
);

addFilter(
  'editor.BlockListBlock',
  'ekiline/with-border-wrapper-styles',
  withBorderWrapperStyles
);

/**
 * Filtro: añade estilos de borde al wrapper en el markup guardado.
 */
function addBorderSaveProps( extraProps, blockType, attributes ) {
  if ( ! isBorderEnabledBlock( blockType.name ) ) {
    return extraProps;
  }

  const { border, borderRadius } = attributes;

  const normalizedBorder    = sanitizeBorderValue( border );
  const borderStyles        = getBorderStyles( normalizedBorder );
  const appliedBorderRadius = getRadiusWithDefaults(
    borderRadius,
    DEFAULT_BORDER_RADIUS
  );

  return {
    ...extraProps,
    style: {
      ...( extraProps.style || {} ),
      ...borderStyles,
      borderRadius: appliedBorderRadius,
    },
  };
}

addFilter(
  'blocks.getSaveContent.extraProps',
  'ekiline/border-save-props',
  addBorderSaveProps
);

export { BORDER_ENABLED_BLOCKS };
