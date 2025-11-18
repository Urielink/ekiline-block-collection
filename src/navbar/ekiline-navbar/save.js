import { useBlockProps } from '@wordpress/block-editor'
import { renderNavbar } from './renderers/navbar-render'

export default function save ({ attributes }) {
  const blockProps = useBlockProps.save()

  // Asignar nuevas variables de colores, color de texto y brand.
  const textColorNav = attributes.textColor
    ? `var(--wp--preset--color--${attributes.textColor})`
    : attributes.style?.color?.text

  if (textColorNav) {
    blockProps.style = {
      ...(blockProps.style || {}),
      '--bs-navbar-color': textColorNav,
      '--bs-nav-link-color': textColorNav,
      '--bs-navbar-brand-color': textColorNav
    }
  }

  return renderNavbar({
    attributes,
    blockProps,
    mode: 'save'
  })
}
