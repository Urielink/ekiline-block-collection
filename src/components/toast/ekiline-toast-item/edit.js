import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InspectorControls,
  InnerBlocks,
  RichText
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  ToggleControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({ className: 'toast-item' });

  const CHILD_TEMPLATE = [
    ['core/paragraph', {
      content: __('Add toast content.', 'ekiline-modal')
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

      <RichText
        tagName='p'
        value={attributes.content}
        allowedFormats={['core/bold', 'core/italic']}
        onChange={(content) => setAttributes({ content })}
        placeholder={__('Add toast title', 'ekiline-block-collection')}
        className='item-title'
      />
      <InnerBlocks template={CHILD_TEMPLATE} />
    </div>
  );
}
