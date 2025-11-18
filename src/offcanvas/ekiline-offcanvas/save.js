import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

export default function save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className:
      'group-offcanvas' +
      attributes.ocDisplay +
      attributes.ocPosition +
      attributes.ocWidth +
      attributes.ocHeight,
    'data-bs-backdrop': attributes.ocBackdrop,
    'data-bs-scroll': attributes.ocScroll
  })

  return (
    <div
      {...blockProps}
      tabindex='-1'
      role='dialog'
      aria-hidden='true'
    >
      <InnerBlocks.Content />
    </div>
  )
}
