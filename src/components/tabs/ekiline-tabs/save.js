import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({attributes}) {

  // clase de envoltorio.
  const addClassNames = [
    'tabs-wrapper',
    attributes.tabsDesign
  ].filter(Boolean).join(' ');

  const blockProps = useBlockProps.save({ className: addClassNames });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
