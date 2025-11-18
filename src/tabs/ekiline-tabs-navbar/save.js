import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

export default function save ({ attributes }) {
  const addClassNames = [
    'nav',
    attributes.tabsAlign,
    attributes.tabsStyle,
    !attributes.tabsDesign ? '' : 'flex-column'
  ].filter(Boolean).join(' ')

  const blockProps = useBlockProps.save({
    className: addClassNames
  })

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  )
}
