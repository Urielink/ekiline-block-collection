import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

import {
  BorderBoxField,
  BorderRadiusField,
  DEFAULT_BORDER_RADIUS,
  getBorderStyles,
  getHeaderBorderBottom,
  getRadiusWithDefaults,
  sanitizeBorderValue,
  sanitizeBorderRadiusValue,
} from '../../shared/border-box';

import { hexToRgb } from '../../shared/collection';

export default function Edit({ attributes, setAttributes }) {

  const { border, borderRadius } = attributes;

  // Sanitize current border so both inspector and preview always receive valid CSS values
  // while still respecting theme palettes, defaults, and per-side overrides.
  const normalizedBorder = sanitizeBorderValue(border);
  const borderStyles = getBorderStyles(normalizedBorder);
  const headerBorderBottom = getHeaderBorderBottom(borderStyles);
  const appliedBorderRadius = getRadiusWithDefaults(borderRadius, DEFAULT_BORDER_RADIUS);

  // Persist only the sanitised border values to avoid undefined pieces after reset.
  const onChangeBorder = (newBorder) => {
    const sanitizedBorder = sanitizeBorderValue(newBorder);

    if (JSON.stringify(sanitizedBorder) === JSON.stringify(border)) {
      return;
    }

    setAttributes({ border: sanitizedBorder });
  };

  // Persist only the sanitized radius value to avoid undefined pieces after reset.
  const onChangeBorderRadius = (newRadius) => {
    const sanitizedRadius = sanitizeBorderRadiusValue(
      newRadius,
      true,
      DEFAULT_BORDER_RADIUS
    );

    if (sanitizedRadius === borderRadius) {
      return;
    }

    setAttributes({ borderRadius: sanitizedRadius });
  };

  // Block container styles.
  const blockProps = useBlockProps({
    className: 'toast-item toast',
    style:{
      ...borderStyles,
      borderRadius: appliedBorderRadius,
    }
  });

  // En caso de color de texto en header.
  if (blockProps.style.color){
    blockProps.style = {
      ...blockProps.style,
      '--bs-toast-header-color': blockProps.style.color
    }
  }

  // Función para pintar el color del texto en header. Filtrar clases por tipo 'has-'.
  function filterClassNames(string) {
    return string.split(' ').filter(function(className) {
      return className.startsWith('has-');
    }).join(' ');
  }

  // Header styles.
  const headerStyles = {
    borderBottom: headerBorderBottom,
    borderTopLeftRadius: appliedBorderRadius,
    borderTopRightRadius: appliedBorderRadius,
    backgroundColor: hexToRgb(border.color, 0.20)
  };

  // Child block template.
  const CHILD_TEMPLATE = [
    ['core/paragraph', {
      content: __('Add toast content.', 'ekiline-block-collection')
    }]
  ];

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Toast Params', 'ekiline-block-collection')} initialOpen>
          <TextControl
            label={__('Run by time', 'ekiline-block-collection')}
            type='number'
            value={attributes.toastTime}
            onChange={(newval) => setAttributes({ toastTime: parseInt(newval) })}
            help={
              (attributes.toastTime > 0)
                ? __('Run after page load ', 'ekiline-block-collection') + attributes.toastTime + __(' milliseconds.', 'ekiline-block-collection')
                : attributes.toastTime + __(' run immediately on page load.', 'ekiline-block-collection')
            }
            min={0}
          />
          <ToggleControl
            label={__('Run at end of page scroll.', 'ekiline-block-collection')}
            checked={attributes.toastScroll}
            onChange={(toastScroll) => setAttributes({ toastScroll })}
          />
        </PanelBody>
      </InspectorControls>
      <InspectorControls group='styles'>
        <PanelBody>
          {/* Shared field that wraps Gutenberg's BorderBoxControl to consume theme palettes
              and sanitize the per-side colors/styles before persisting them. */}
          <BorderBoxField
              label={__('Border', 'ekiline-block-collection')}
              value={normalizedBorder}
              onChange={onChangeBorder}
              __experimentalIsRenderedInSidebar
          />
          <BorderRadiusField
              value={borderRadius}
              onChange={onChangeBorderRadius}
          />
        </PanelBody>
      </InspectorControls>

      <div className={['toast-header',filterClassNames(blockProps.className)].filter(Boolean).join(' ')} style={headerStyles} >
        <RichText
          tagName='p'
          value={attributes.content}
          allowedFormats={['core/bold', 'core/italic']}
          onChange={(content) => setAttributes({ content })}
          placeholder={__('Add toast title', 'ekiline-block-collection')}
          className='item-title'
        />
        <button type='button' className='btn-close' data-bs-dismiss='toast' aria-label='Close' disabled/>
      </div>
      <div className='toast-body'>
        <InnerBlocks template={CHILD_TEMPLATE} />
      </div>
    </div>
  );
}
