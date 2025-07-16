import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

export default function save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'navbar' +
      (attributes.navPosition || '') +
      (attributes.navShow || '') +
      (attributes.alignItems || '')
  })

  return (
    <div {...blockProps}>
      <div className='container-fluid'>
        <InnerBlocks.Content />
      </div>
    </div>
  )
}