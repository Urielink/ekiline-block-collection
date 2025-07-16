import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

const CHILD_TEMPLATE = [
  ['core/navigation', {
    className: 'navbar-nav',
    overlayMenu: 'never',
    style: {
      typography: { fontSize: '16px' }
    }
  }]
]

export default function Edit(props) {
  const { attributes, setAttributes, context } = props

  const blockProps = useBlockProps({
    className: 'editor-collapse editor-navbar-collapse'
  })

  if (!attributes.parentAnchor) {
    setAttributes({ parentAnchor: context['ekiline-navbar/anchor'] })
  }

  if (!attributes.anchor) {
    setAttributes({ anchor: context['ekiline-navbar/anchor'] + 'Child' })
  }

  setAttributes({ parentNavStyle: context['ekiline-navbar/navStyle'] })
  setAttributes({ parentAlignItems: context['ekiline-navbar/alignItems'] })
  setAttributes({ parentNavShow: context['ekiline-navbar/navShow'] })
  setAttributes({ parentNavPosition: context['ekiline-navbar/navPosition'] })

  return (
    <div {...blockProps}>
      <InnerBlocks
        orientation='horizontal'
        template={CHILD_TEMPLATE}
      />
    </div>
  )
}