import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks, RichText } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, TextControl, ToggleControl, BorderBoxControl } from '@wordpress/components';
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';

import {
  DEFAULT_BORDER_RADIUS,
  getBorderStyles,
  getHeaderBorderBottom,
  sanitizeBorderValue,
} from './utils';

export default function Edit({ attributes, setAttributes }) {

  const { border, borderRadius } = attributes;

  const { colors, disableCustomColors, enableAlpha } = useSelect((select) => {
    const settings = select('core/block-editor').getSettings?.() || {};
    return {
      colors: settings.colors || [],
      disableCustomColors: settings.disableCustomColors,
      enableAlpha: settings.disableCustomColors ? false : true,
    };
  }, []);

  // Normalise the current border so the inspector always receives complete data.
  const normalizedBorder = sanitizeBorderValue(border);
  const borderStyles = getBorderStyles(normalizedBorder);
  const headerBorderBottom = getHeaderBorderBottom(borderStyles);
  const appliedBorderRadius = borderRadius || DEFAULT_BORDER_RADIUS;

  // Persist only the sanitised border values to avoid undefined pieces after reset.
  const onChangeBorder = (newBorder) => {
    const sanitizedBorder = sanitizeBorderValue(newBorder);

    if (JSON.stringify(sanitizedBorder) === JSON.stringify(border)) {
      return;
    }

    setAttributes({ border: sanitizedBorder });
  };

  const onChangeBorderRadius = (newRadius) => {
    setAttributes({ borderRadius: newRadius || undefined });
  };

  const blockProps = useBlockProps({ 
    className: 'toast-item toast',
    style:{
      ...borderStyles,
      borderRadius: appliedBorderRadius,
    }
  });

  const headerStyles = {
    borderBottom: headerBorderBottom,
    borderTopLeftRadius: appliedBorderRadius,
    borderTopRightRadius: appliedBorderRadius,
  };

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
          <BorderBoxControl
              label={__('Border', 'ekiline-block-collection')}
              value={normalizedBorder}
              onChange={onChangeBorder}
              colors={colors}
              disableCustomColors={disableCustomColors}
              enableAlpha={enableAlpha}
              __experimentalIsRenderedInSidebar
          />
          <UnitControl
            label={__('Border radius', 'ekiline-block-collection')}
            value={borderRadius}
            onChange={onChangeBorderRadius}
            units={[
              { value: 'px', label: 'px', default: 6 },
              { value: 'em', label: 'em' },
              { value: 'rem', label: 'rem' },
              { value: '%', label: '%' },
            ]}
            isResetValueOnUnitChange={false}
          />
        </PanelBody>
      </InspectorControls>

      <div className='toast-header' style={headerStyles}>
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
