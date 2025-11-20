import { __ } from '@wordpress/i18n'
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

export default function Edit () {
  const blockProps = useBlockProps({
    className: 'editor-modal-body modal-body'
  })

  const CHILD_TEMPLATE = [['core/paragraph', { content: 'Add modal content blocks' }]]

  return (
    <div {...blockProps}>
      <InnerBlocks template={CHILD_TEMPLATE} />
    </div>
  )
}
