import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes, context }) {
  const CHILD_TEMPLATE = [
    ['core/paragraph', { content: __('Item content.', 'ekiline-block-collection') }]
  ];

  const blockProps = useBlockProps({
    className: 'child-item-accordion-body accordion-body'
  });

  setAttributes({ showDefault: context['ekiline-accordion-item/showDefault'] });
  setAttributes({ keepOpen: context['ekiline-accordion-item/keepOpen'] });

  if (!attributes.itemParent) {
    setAttributes({ itemParent: context['ekiline-accordion/anchor'] });
  }

  if (!attributes.itemTarget) {
    setAttributes({ itemTarget: context['ekiline-accordion-item/itemTarget'] });
  }

  // Reemplazar ID con Item target.
  if (attributes.itemTarget) {
    blockProps.id = attributes.itemTarget;
  }

  return (
    <div {...blockProps}>
      <InnerBlocks template={CHILD_TEMPLATE} />
    </div>
  );
}
