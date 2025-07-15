import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes, context }) {
  const blockProps = useBlockProps({
    className: 'child-item-accordion-header'
  });

  if (!attributes.itemTarget) {
    setAttributes({ itemTarget: context['ekiline-accordion-item/itemTarget'] });
  }

  return (
    <div {...blockProps}>
      <RichText
        withoutInteractiveFormatting
        allowedFormats={['core/bold', 'core/italic', 'core/image', 'core/align']}
        tagName='p'
        className='item-title-header'
        value={attributes.content}
        onChange={(content) => setAttributes({ content })}
        placeholder={attributes.default}
      />
    </div>
  );
}
