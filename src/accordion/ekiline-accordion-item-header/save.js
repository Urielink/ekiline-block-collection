import { useBlockProps, RichText } from '@wordpress/block-editor'
import { hexToRgb } from '../../shared/collection'

export default function save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'accordion-header'
  })

  const buttonClasses = blockProps.className.replace(
    'wp-block-ekiline-block-collection-ekiline-accordion-item-header accordion-header',
    'accordion-button'
  )

  // En caso de color de fondo en boton:
  // obtener backgroundColor de blockProps.style y sobreescribir el valor --bs-accordion-btn-focus-box-shadow.
  if (blockProps.style && blockProps.style.backgroundColor) {
    blockProps.style = {
      ...blockProps.style,
      '--bs-accordion-btn-focus-box-shadow': '0 0 0 0.25rem ' + hexToRgb(blockProps.style.backgroundColor, 0.25)
    }
  }

  return (
    <div {...blockProps}>
      <RichText.Content
        tagName='button'
        className={buttonClasses}
        type='button'
        value={attributes.content}
        data-bs-toggle='collapse'
        data-bs-target={attributes.itemTarget ? '#' + attributes.itemTarget : null}
        style={blockProps.style || null}
      />
    </div>
  )
}
