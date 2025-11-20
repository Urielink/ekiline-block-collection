import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

export default function save () {
  const blockProps = useBlockProps.save({
    className: 'tabs-container tab-content'
  })

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  )
}
