import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const CHILD_TEMPLATE = [['core/paragraph', { content: __('Add your content', 'ekiline-block-collection') }]];
  const blockProps = useBlockProps({ className: 'group-collapse' });

  function CollapseUserRemind() {
    return (
      <div className='block-note'>
        { attributes.anchor ? '#' + attributes.anchor + __(' is the anchor you should include in the advanced options of a button.', 'ekiline-block-collection') : __('Do not forget to add an #anchor. ', 'ekiline-block-collection') }
      </div>
    );
  }

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Collapse Params', 'ekiline-block-collection')} initialOpen>
          <ToggleControl
            label={__('Horizontal collapse', 'ekiline-block-collection')}
            checked={attributes.horizontal}
            onChange={(horizontal) => setAttributes({ horizontal })}
          />
        </PanelBody>
      </InspectorControls>
      <InnerBlocks template={CHILD_TEMPLATE} />
      <CollapseUserRemind />
    </div>
  );
}
