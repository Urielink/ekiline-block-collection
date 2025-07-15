import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes, context }) {
  const CHILD_TEMPLATE = [
    ['core/paragraph', { content: __('Item content.', 'ekiline-block-collection') }]
  ];

  const blockProps = useBlockProps({
    className: 'child-item-accordion-body'
  });

  if (!attributes.itemParent) {
    setAttributes({ itemParent: context['ekiline-accordion/anchor'] });
  }

  setAttributes({ showDefault: context['ekiline-accordion-item/showDefault'] });
  setAttributes({ keepOpen: context['ekiline-accordion-item/keepOpen'] });

  if (!attributes.anchor) {
    setAttributes({ anchor: context['ekiline-accordion-item/itemTarget'] });
  }

  return (
    <div {...blockProps}>
      <InnerBlocks template={CHILD_TEMPLATE} />
    </div>
  );
}
