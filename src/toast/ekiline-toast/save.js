import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'toast-container position-fixed p-md-1 p-md-3' + attributes.toastPosition
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
