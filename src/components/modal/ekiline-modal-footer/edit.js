import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'editor-modal-footer'
  });

  const CHILD_TEMPLATE = [["core/paragraph", {"content": "Add modal footer text"}]];

  return (
    <div {...blockProps}>
      <InnerBlocks template={CHILD_TEMPLATE} />
    </div>
  );
}
