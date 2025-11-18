import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

export default function Edit (props) {
  const { attributes, setAttributes, context } = props
  const blockProps = useBlockProps({ className: 'editor-offcanvas-header offcanvas-header' })

  if (!attributes.parentId || (attributes.parentId !== context['ekiline-offcanvas/anchor'])) {
    setAttributes({ parentId: context['ekiline-offcanvas/anchor'] })
  }

  const template = [['core/heading', { content: __('Add offcanvas title', 'ekiline-block-collection'), level: 4 }]]

  return (
    <div {...blockProps}>
      <InnerBlocks
        allowedBlocks={['core/heading', 'core/paragraph']}
        template={template}
      />
      <button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close' disabled />
    </div>
  )
}
