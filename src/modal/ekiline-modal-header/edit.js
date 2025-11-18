import { __ } from '@wordpress/i18n'
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

export default function Edit () {
  const blockProps = useBlockProps({
    className: 'editor-modal-header modal-header justify-content-between'
  })

  const CHILD_TEMPLATE = [['core/heading', { content: 'Add modal title', level: 4 }]]

  return (
    <div {...blockProps}>
      <InnerBlocks orientation='horizontal' template={CHILD_TEMPLATE} />
      <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' disabled />
    </div>
  )
}
