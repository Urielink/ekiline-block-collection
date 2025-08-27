// src/components/ekiline-carousel/variations/manual.js

import { __ } from '@wordpress/i18n'
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { useEffect } from '@wordpress/element'
import { useSelect } from '@wordpress/data'

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
 * @param {object} props
 * @param {number} props.slidesCount - number of slides
 * @param {number} props.activeIndex - index of active slide
 * @param {string} props.anchor - id
 * @param {boolean} props.isEditor - disable link.
 */
function Indicators({ slidesCount, activeIndex = 0, anchorId = '', isEditor = false }) {
  if (slidesCount <= 1) return null
  return (
    <div className="carousel-indicators">
      {Array.from({ length: slidesCount }).map((_, i) => (
        <button
          key={i}
          type="button"
          data-bs-target={anchorId ? `#${anchorId}` : undefined}
          data-bs-slide={!isEditor ? i : undefined}
          className={i === activeIndex ? 'active' : ''}
          aria-current={i === activeIndex ? 'true' : undefined}
          aria-label={__('Slide', 'ekiline-block-collection') + ' ' + (i + 1)}
          disabled={isEditor}
        />
      ))}
    </div>
  )
}

/**
 * Carousel control button reusable component
 * @param {string} direction prev or next
 * @param {anchorId} carousel id
 * @param {boolean} isEditor disable link
 * @returns {JSX.Element} 
 */
function ControlButton({ direction = 'prev', anchorId = '', isEditor = false }) {
  return (
    <button
      className={`carousel-control-${direction}`}
      type="button"
      data-bs-target={anchorId ? `#${anchorId}` : undefined}
      data-bs-slide={!isEditor ? direction : undefined}
      disabled={isEditor}
    >
      <span className={`carousel-control-${direction}-icon`} aria-hidden="true" />
      <span className="visually-hidden">{__( direction === 'prev' ? 'Previous' : 'Next' , 'ekiline-block-collection')}</span>
    </button>
  )
}

export function ManualEdit ({ clientId, attributes, setAttributes }) {
  const { AddIndicators = true, AddControls = true, anchor = '' } = attributes || {}
  const blockProps = useBlockProps({ className: 'carousel-manual' })
  const slidesCount = useSelect(
    (select) => {
      const { getBlockOrder } = select('core/block-editor')
      const order = getBlockOrder(clientId) || []
      return order.length
    },
    [clientId]
  )

  useEffect(() => {
    if (attributes?.slidesCount !== slidesCount) {
      setAttributes?.({ slidesCount })
    }
  }, [slidesCount])


  return (
    <div {...blockProps}>
      <mark style={{ fontStyle: 'italic', marginBottom: '1rem', display: 'block' }}>
        {__('Add one or more slides. Each slide is a block group (image + text + button).', 'ekiline-block-collection')}
      </mark>
      {AddIndicators && <Indicators slidesCount={slidesCount} isEditor={true} anchorId={anchor} />}

      <InnerBlocks 
        orientation="horizontal"
        allowedBlocks={PARENT_ALLOWED_BLOCKS} 
        template={CHILD_TEMPLATE} 
        templateLock={false}
      />

      {AddControls && slidesCount > 1 && (
        <>
          <ControlButton direction="prev" isEditor={true} anchorId={anchor} />
          <ControlButton direction="next" isEditor={true} anchorId={anchor} />
        </>
      )}
    </div>
  )
}

export function ManualSave ({ attributes }) {
  const { slidesCount = 0, AddIndicators = true, AddControls = true, anchor = '', SetHeight = '540px' } = attributes || {}
  const blockProps = useBlockProps.save({ className: 'carousel-manual carousel' })

  return (
    <div {...blockProps}>
      {AddIndicators && <Indicators slidesCount={slidesCount} anchorId={anchor} />}

      <div className="carousel-inner" style={{ height: SetHeight }}>
        <InnerBlocks.Content />
      </div>

      {AddControls && slidesCount > 1 && (
        <>
          <ControlButton direction="prev" anchorId={anchor} />
          <ControlButton direction="next" anchorId={anchor} />
        </>
      )}
    </div>
  )
}
