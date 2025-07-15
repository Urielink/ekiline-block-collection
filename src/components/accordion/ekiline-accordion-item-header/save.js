import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'accordion-header'
  });

  const buttonClasses = blockProps.className.replace(
    'wp-block-ekiline-block-collection-ekiline-accordion-item-header accordion-header',
    'accordion-button'
  );

  return (
    <div {...blockProps}>
      <RichText.Content
        tagName='button'
        className={buttonClasses}
        type='button'
        value={attributes.content}
        data-bs-toggle='collapse'
        data-bs-target={attributes.itemTarget ? '#' + attributes.itemTarget : null}
        style={blockProps.style || null}
      />
    </div>
  );
}
