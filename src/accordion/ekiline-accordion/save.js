import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

export default function save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: (!attributes.useBorder ? 'accordion accordion-flush' : 'accordion')
  })

  // obtener valores de borde.
  if (attributes.useBorder) {
    // retrieve border and border radius values
    const border = attributes.border
    const borderRadius = attributes.borderRadius
    // En caso de color de texto en header.
    if (border || borderRadius) {
      blockProps.style = {
        ...blockProps.style,
        '--bs-accordion-border-color': border.color,
        '--bs-accordion-border-width': border.width,
        '--ek-accordion-border-style': border.style,
        '--bs-accordion-border-radius': borderRadius,
        '--bs-accordion-inner-border-radius': `calc(var(${borderRadius}) - (var(${border?.width})))`,
        border: 'none !important'
      }
    }
  }
  // disable border and border radius values from blockProps
  delete blockProps?.style?.border
  delete blockProps?.style?.borderRadius

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  )
}
