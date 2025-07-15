import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function Edit({ attributes, setAttributes }) {
  const PARENT_ALLOWED_BLOCKS = ['ekiline-block-collection/ekiline-accordion-item'];
  const CHILD_TEMPLATE = [
    ['ekiline-block-collection/ekiline-accordion-item'],
    ['ekiline-block-collection/ekiline-accordion-item'],
    ['ekiline-block-collection/ekiline-accordion-item']
  ];

  const blockProps = useBlockProps({
    className: 'group-accordion'
  });

  if (!attributes.anchor) {
    setAttributes({ anchor: 'accordion' + getRandomArbitrary(10, 150) });
  }

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Accordion Settings', 'ekiline-block-collection')} initialOpen>
          <ToggleControl
            label={__('Use bootstrap default style.', 'ekiline-block-collection')}
            checked={attributes.noStyle}
            onChange={(noStyle) => setAttributes({ noStyle })}
          />
        </PanelBody>
      </InspectorControls>
      <InnerBlocks allowedBlocks={PARENT_ALLOWED_BLOCKS} template={CHILD_TEMPLATE} />
    </div>
  );
}
