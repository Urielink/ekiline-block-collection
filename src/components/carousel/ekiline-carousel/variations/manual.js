// src/components/ekiline-carousel/variations/manual.js
/**
 * useBlockEditContext para explorar bloque actual.
 * @link ref https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockeditcontext
 */

import { __ } from '@wordpress/i18n'
import { InnerBlocks, useBlockProps, useBlockEditContext } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'
import { useEffect } from 'react'

  const PARENT_ALLOWED_BLOCKS = [
    'ekiline-block-collection/ekiline-carousel-slide'
  ];

  // first element appends active classname.
  const CHILD_TEMPLATE = [
    ['ekiline-block-collection/ekiline-carousel-slide', {
        className: 'active'
    }],
    ['ekiline-block-collection/ekiline-carousel-slide']
  ];

  /**
   * BsBtnDirection
   * @param {string} direction - 'prev' o 'next'
   * @returns {JSX.Element} Botón de control del carrusel
   */
  const BsBtnDirection = ({ direction, anchorId }) => (
    <button
      className={`carousel-control-${direction}`}
      type="button"
      data-bs-target={`#${anchorId}`}
      data-bs-slide={direction}
    >
      <span className={`carousel-control-${direction}-icon`} aria-hidden="true" />
      <span className="visually-hidden">{__( direction === 'prev' ? 'Previous' : 'Next' , 'ekiline-block-collection')}</span>
    </button>
  );

  /**
   * BsIndicatorsLoop 
   * @returns component loop indicators
   */
  const BsIndicatorsLoop = ({ slidesCount, anchorId }) => {
    if (slidesCount <= 1) return null
    return (
      <div className="carousel-indicators">
        {Array.from({ length: slidesCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target={`#${anchorId}`}
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : undefined}
              aria-label={`Slide ${index + 1}`}
            />
        ))}
      </div>
    )
  }

// Visulizacion en editor (preview).
export function ManualEdit ({ attributes, setAttributes }) {
  const blockProps = useBlockProps({ className: 'carousel-manual' })
  const { clientId } = useBlockEditContext(); // obtener id de bloque asignado por editor.

  // Contar slides (innerBlocks) dinámicamente en el editor
  const thisBlock = useSelect(
    (select) => select('core/block-editor').getBlock(clientId),
    [clientId]
  )
  const innerBlocks = thisBlock?.innerBlocks || []

  // Sincronizar el atributo slidesCount con la cantidad real
  useEffect(() => {
    const count = innerBlocks.length
    if (attributes.slidesCount !== count) {
      setAttributes({ slidesCount: count })
    }
  }, [innerBlocks.length, attributes.slidesCount])

  return (
    <div {...blockProps}>
      <mark style={{ fontStyle: 'italic', marginBottom: '1rem', display: 'block' }}>
        {__('Slides:', 'ekiline-block-collection')} {innerBlocks.length}
      </mark>
      <InnerBlocks 
        orientation="horizontal"
        allowedBlocks={PARENT_ALLOWED_BLOCKS} 
        template={CHILD_TEMPLATE} 
        templateLock={false}
      />
    </div>
  )
}

// Visulizacion en frontend.
export function ManualSave ({ attributes }) {

  // Al inicio del componente, todas las variables.
  const {
    AddControls = true,
    AddIndicators = true,
    anchor = '',
    SetHeight = '540px',
    slidesCount = 0,
    SetColumns = 1,
    SetAnimation = '',
    SetAuto = false,
    SetTime = undefined,
  } = attributes;

  const carColumns = SetColumns > 1 ? ` carousel-multiple x${SetColumns}` : ''
  const carAnimation = SetAnimation ? ` carousel-${SetAnimation}` : ''
  const carAutoplay = SetAuto ? 'carousel' : undefined
  const carInterval = SetTime || undefined

  // Personalizar attributos.
  const blockProps = useBlockProps.save({
    className: 'carousel-manual carousel' + carColumns + carAnimation,
    'data-bs-ride': carAutoplay,
    'data-bs-interval': carInterval,
    style: { height: SetHeight },
  })

  return (
    <div {...blockProps}>
      {/* indicadores */}
      {AddIndicators && slidesCount > 1 && (
        <>
          <BsIndicatorsLoop slidesCount={slidesCount} anchorId={anchor} />
        </>
      )}
      {/* contenido */}
      <div className="carousel-inner" style={{ height: SetHeight }}>
        <InnerBlocks.Content />
      </div>
      {/* controles */}
      {AddControls && (
        <>
          <BsBtnDirection direction="prev" anchorId={anchor} />
          <BsBtnDirection direction="next" anchorId={anchor} />
        </>
      )}

    </div>
  )
}
