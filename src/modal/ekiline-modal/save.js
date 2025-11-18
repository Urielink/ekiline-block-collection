import { __ } from '@wordpress/i18n'
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'
import {
  DEFAULT_BORDER_RADIUS,
  sanitizeBorderValue,
  getBorderStyles,
  getRadiusWithDefaults
} from '../../shared/border-box'

export default function save ({ attributes }) {
  const { border, borderRadius } = attributes
  // Clases auxiliares para desplegado en temas twenty: alignfull mx-0.
  const blockProps = useBlockProps.save({
    className: 'alignfull mx-0 group-modal modal fade' + (attributes.modalShow !== 'default' ? attributes.modalShow : ''),
    'data-bs-backdrop': attributes.modalBackdrop,
    'data-bs-keyboard': attributes.modalKeyboard,
    'data-ek-time': attributes.modalTime || null
  })

  const dialogClass = 'modal-dialog' +
    (attributes.modalAlign ? ' modal-dialog-centered' : '') +
    (attributes.modalSize !== 'default' ? attributes.modalSize : '')

  // Sustraer y aplicar atributos de borde para el modal content.
  const normalizedBorder = sanitizeBorderValue(border)
  const borderStyles = getBorderStyles(normalizedBorder)
  const appliedBorderRadius = getRadiusWithDefaults(
    borderRadius,
    DEFAULT_BORDER_RADIUS
  )

  const modalContentStyles = {
    ...(blockProps.style || {}),
    ...borderStyles,
    borderRadius: appliedBorderRadius
  }

  // Trasladar solo clases estructurales al wrapper y mover todas las de color al modal-content.
  const allClasses = (blockProps.className || '').split(' ').filter(Boolean)

  // Detectar TODAS las clases relacionadas a color generadas por supports.color
  const colorClasses = allClasses.filter((cls) =>
    cls === 'has-text-color' ||
    cls === 'has-background' ||
    /^has-.+-color$/.test(cls) ||
    /^has-.+-background-color$/.test(cls) ||
    /^is-style-color-.+/.test(cls)
  )

  // Mantener únicamente clases no relacionadas con color en blockProps.
  const nonColorClasses = allClasses.filter((cls) => !colorClasses.includes(cls))
  blockProps.className = nonColorClasses.join(' ')

  // Construir props de modal-content
  const modalContentClassName = ['modal-content', ...colorClasses]
    .filter(Boolean)
    .join(' ')

  const modalContentProps = {
    className: modalContentClassName,
    style: modalContentStyles
  }

  // No mostrar estilos (incluyendo el borde) en el wrapper del modal,
  // solo en el .modal-content.
  delete blockProps.style

  return (
    <div {...blockProps} tabIndex='-1' role='dialog' aria-labelledby={blockProps.id + 'Label'} aria-hidden='true'>
      <div className={dialogClass}>
        <div {...modalContentProps}>
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  )
}
