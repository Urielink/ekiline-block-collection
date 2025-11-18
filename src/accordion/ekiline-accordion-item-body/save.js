import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

export default function save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: (!attributes.showDefault ? 'accordion-collapse collapse' : 'accordion-collapse collapse show'),
    'data-bs-parent': (attributes.keepOpen && attributes.itemParent) ? '#' + attributes.itemParent : null,
    id: attributes.itemTarget ? attributes.itemTarget : null
  })

  return (
    <div {...blockProps}>
      <div className='accordion-body'>
        <InnerBlocks.Content />
      </div>
    </div>
  )
}
