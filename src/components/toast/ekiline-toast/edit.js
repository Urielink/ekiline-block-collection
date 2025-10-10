import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({ 
    className: 'group-toast',
    style: { zIndex: 1080, minHeight: '180px', backgroundColor: '#f9f9f9' }
  });
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
              { label: __('Bottom left', 'ekiline-block-collection'), value: ' bottom-0 start-0' },
              { label: __('Bottom center', 'ekiline-block-collection'), value: ' bottom-0 start-50 translate-middle-x' },
              { label: __('Bottom right', 'ekiline-block-collection'), value: ' bottom-0 end-0' },
              { label: __('Middle left', 'ekiline-block-collection'), value: ' top-50 start-0 translate-middle-y' },
              { label: __('Middle center', 'ekiline-block-collection'), value: ' top-50 start-50 translate-middle' },
              { label: __('Middle right', 'ekiline-block-collection'), value: ' top-50 end-0 translate-middle-y' },
              { label: __('Top left', 'ekiline-block-collection'), value: ' top-0 start-0' },
              { label: __('Top center', 'ekiline-block-collection'), value: ' top-0 start-50 translate-middle-x' },
              { label: __('Top right', 'ekiline-block-collection'), value: ' top-0 end-0' }
            ]}
            onChange={(toastPosition) => setAttributes({ toastPosition })}
          />
        </PanelBody>
      </InspectorControls>

      {/* previsualizacion en editor */}
      <pre className='text-center p-1'>{ __( 'Display reference', 'ekiline-block-collection') }</pre>
      <div className={'toast-container' + attributes.toastPosition}>
        <InnerBlocks allowedBlocks={PARENT_ALLOWED_BLOCKS} template={CHILD_TEMPLATE} />
      </div>
    </div>
  );
}
