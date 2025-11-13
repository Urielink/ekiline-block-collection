import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({ className: 'offcanvas-header' });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        data-bs-target={attributes.parentId ? '#' + attributes.parentId : null}
        aria-label="Close"
      />
    </div>
  );
}
