import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

const ALLOWED_BLOCKS = ['core/image', 'core/paragraph', 'core/heading']
const TEMPLATE = [['core/image'], ['core/paragraph']]

export function ManualEdit () {
  const blockProps = useBlockProps({
    className: 'carousel-manual'
  })

  return (
    <div {...blockProps}>
      <InnerBlocks
        allowedBlocks={ALLOWED_BLOCKS}
        template={TEMPLATE}
      />
    </div>
  )
}

export function ManualSave () {
  const blockProps = useBlockProps.save({
    className: 'carousel-manual'
  })

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  )
}
