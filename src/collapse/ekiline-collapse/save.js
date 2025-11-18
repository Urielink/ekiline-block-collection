import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

export default function save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'collapse' + (attributes.horizontal ? ' collapse-horizontal' : ''),
    style: {
      minHeight: attributes.horizontal ? '120px' : null
    },
    contentStyle: {
      minWidth: attributes.horizontal ? '300px' : null
    }
  })

  function CollapseWrapper () {
    if (attributes.horizontal) {
      return (
        <div style={blockProps.contentStyle}>
          <InnerBlocks.Content />
        </div>
      )
    }
    return <InnerBlocks.Content />
  }

  return (
    <div {...blockProps}>
      <CollapseWrapper />
    </div>
  )
}
