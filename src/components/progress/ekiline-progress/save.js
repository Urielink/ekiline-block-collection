import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'progress',
    style: {
      height: attributes.progHeight + 'px'
    }
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
