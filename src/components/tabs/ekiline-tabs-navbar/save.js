import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
  const blockProps = useBlockProps.save({
    className: 'nav'
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
