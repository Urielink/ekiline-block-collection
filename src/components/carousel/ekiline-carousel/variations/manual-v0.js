// src/components/ekiline-carousel/variations/manual.js

import { __ } from '@wordpress/i18n'
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

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

export function ManualEdit () {
  const blockProps = useBlockProps({ className: 'carousel-manual' })
  return (
    <div {...blockProps}>
      <mark style={{ fontStyle: 'italic', marginBottom: '1rem', display: 'block' }}>
        {__('Add one or more slides. Each slide is a block group (image + text + button).', 'ekiline-block-collection')}
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

export function ManualSave () {
  const blockProps = useBlockProps.save({ className: 'carousel-manual carousel' })

  return (
    <div {...blockProps}>
        <InnerBlocks.Content />
    </div>
  )
}
