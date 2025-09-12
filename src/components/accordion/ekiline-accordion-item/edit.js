import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function Edit({ attributes, setAttributes, context }) {
  const CHILD_TEMPLATE = [
    ['ekiline-block-collection/ekiline-accordion-item-header', 
      {
        "backgroundColor":"black",
        "textColor":"white"
      }
    ],
    ['ekiline-block-collection/ekiline-accordion-item-body']
  ];

  const blockProps = useBlockProps({
    className: 'child-accordion-item accordion-item'
  });

  if (!attributes.itemTarget) {
    setAttributes({ itemTarget: context['ekiline-accordion/anchor'] + 'item' + getRandomArbitrary(10, 150) });
  }

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Accordion Item Params', 'ekiline-block-collection')} initialOpen>
          <ToggleControl
            label={__('Show element by default.', 'ekiline-block-collection')}
            checked={attributes.showDefault}
            onChange={(showDefault) => setAttributes({ showDefault })}
          />
          <ToggleControl
            label={__('Toggle.', 'ekiline-block-collection')}
            checked={attributes.keepOpen}
            onChange={(keepOpen) => setAttributes({ keepOpen })}
            help={__('Close previously active accordion elements.', 'ekiline-block-collection')}
          />
        </PanelBody>
      </InspectorControls>
      <InnerBlocks template={CHILD_TEMPLATE} />
    </div>
  );
}
