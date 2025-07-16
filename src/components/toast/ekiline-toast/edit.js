import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({ className: 'group-toast' });
  const PARENT_ALLOWED_BLOCKS = ['ekiline-block-collection/ekiline-toast-item'];
  const CHILD_TEMPLATE = [
    ['ekiline-block-collection/ekiline-toast-item', {
      lock: { remove: false, move: true }
    }]
  ];

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Toast group options', 'ekiline-block-collection')} initialOpen>
          <SelectControl
            label={__('Display position', 'ekiline-block-collection')}
            value={attributes.toastPosition}
            options={[
              { label: __('Bottom right', 'ekiline-block-collection'), value: ' bottom-0 end-0' },
              { label: __('Bottom left', 'ekiline-block-collection'), value: ' bottom-0 start-0' },
              { label: __('Top right', 'ekiline-block-collection'), value: ' top-0 end-0' },
              { label: __('Top left', 'ekiline-block-collection'), value: ' top-0 start-0' }
            ]}
            onChange={(toastPosition) => setAttributes({ toastPosition })}
          />
        </PanelBody>
      </InspectorControls>
      <InnerBlocks allowedBlocks={PARENT_ALLOWED_BLOCKS} template={CHILD_TEMPLATE} />
    </div>
  );
}
