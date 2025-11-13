import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
  const blockProps = useBlockProps.save({
    className: 'modal-header'
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
      <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close' />
    </div>
  );
}
