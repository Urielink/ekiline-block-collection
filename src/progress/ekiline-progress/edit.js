import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({
    className: 'group-progress progress-stacked',
    style: {
      height: (attributes.progHeight + 22) + 'px'
    }
  });

  const CHILD_TEMPLATE = [
    ['ekiline-block-collection/ekiline-progress-item']
  ];

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Progress bar Settings', 'ekiline-block-collection')} initialOpen>
          <TextControl
            label={__('Height bar (pixels)', 'ekiline-block-collection')}
            type="number"
            value={attributes.progHeight}
            onChange={(newval) => setAttributes({ progHeight: parseInt((!newval || newval === '0') ? 1 : newval) })}
            min="1"
          />
        </PanelBody>
      </InspectorControls>
      <InnerBlocks
        orientation="horizontal"
        allowedBlocks={['ekiline-block-collection/ekiline-progress-item']}
        template={CHILD_TEMPLATE}
      />
    </div>
  );
}
