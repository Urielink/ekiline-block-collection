import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({attributes}) {

  const addClassNames = [
    'nav',
    attributes.alignTabs,
    attributes.styleNav
  ].filter(Boolean).join(' ');


  const blockProps = useBlockProps.save({
    className: addClassNames
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
