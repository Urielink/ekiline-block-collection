// src/components/ekiline-carousel/variations/manual.js

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

const ALLOWED_BLOCKS = ['core/image', 'core/heading', 'core/paragraph', 'core/buttons']
const SLIDE_TEMPLATE = [
  ['core/image'],
  ['core/heading', { level: 4, placeholder: 'Slide title' }],
  ['core/paragraph', { placeholder: 'Slide description' }],
  ['core/buttons']
]

export function ManualEdit () {
  const blockProps = useBlockProps({ className: 'carousel-manual' })

  return (
    <div {...blockProps}>
      <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>
        {__('Add one or more slides. Each slide is a block group (image + text + button).', 'ekiline-block-collection')}
      </p>
      <InnerBlocks
        allowedBlocks={['core/group']}
        template={[['core/group', {}, SLIDE_TEMPLATE]]}
        templateLock={false}
      />
    </div>
  )
}

export function ManualSave () {
  const blockProps = useBlockProps.save({ className: 'carousel-manual' })

  return (
    <div {...blockProps}>
      <div className="carousel-inner">
        <InnerBlocks.Content />
      </div>
    </div>
  )
}