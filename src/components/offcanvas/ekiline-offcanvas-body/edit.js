import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit() {
  const blockProps = useBlockProps({ className: 'editor-offcanvas-body' });

  const template = [
    ['core/paragraph', { content: __('Add offcanvas content blocks', 'ekiline-block-collection') }]
  ];

  return (
    <div {...blockProps}>
      <InnerBlocks template={template} />
    </div>
  );
}
