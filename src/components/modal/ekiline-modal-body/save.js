import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
  const blockProps = useBlockProps.save({
    className: 'modal-body'
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
      
    </div>
  );
}
