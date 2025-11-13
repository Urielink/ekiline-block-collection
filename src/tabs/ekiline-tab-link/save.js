import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'tab-link nav-link',
    anchorData: '#' + attributes.dataBsTarget
  });

  return (
    <RichText.Content
      tagName="button"
      className={blockProps.className}
      value={attributes.content}
      data-bs-toggle="pill"
      data-bs-target={blockProps.anchorData}
      type="button"
    />
  );
}
