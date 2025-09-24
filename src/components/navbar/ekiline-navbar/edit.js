import { __ } from '@wordpress/i18n'
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor'
import { PanelBody, SelectControl } from '@wordpress/components'
import { getRandomArbitrary } from '../../../shared/collection';

export default function Edit ({ attributes, setAttributes }) {
  const blockProps = useBlockProps({
    className: 'editor-navbar'
  })

  if (!attributes.anchor) {
    setAttributes({ anchor: 'customNav' + getRandomArbitrary(10, 150) })
  }

  const PARENT_ALLOWED_BLOCKS = [
    'core/site-logo',
    'core/site-title',
    'core/paragraph',
    'core/buttons',
    'ekiline-block-collection/ekiline-navbar-menu-wrapper',
    'ekiline-block-collection/ekiline-navbar-toggler'
  ]

  const CHILD_TEMPLATE = [
    ['core/site-logo', { width: 60, className: 'navbar-brand mb-0' }],
    ['core/site-title', { className: 'navbar-brand mb-0', style: { typography: { fontSize: '16px' } } }],
    ['ekiline-block-collection/ekiline-navbar-toggler'],
    ['ekiline-block-collection/ekiline-navbar-menu-wrapper']
  ]

  function getHelpText (data) {
    switch (data) {
      case '':
        return __('Hide navigation', 'ekiline-block-collection')
      case ' navbar-expand':
        return __('Show navigation', 'ekiline-block-collection')
      case ' navbar-expand-sm':
        return __('Expand on tablets and computers', 'ekiline-block-collection')
      default:
        return __('Expand on computers', 'ekiline-block-collection')
    }
  }

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Nav Params', 'ekiline-block-collection')} initialOpen>
          <SelectControl
            label={__('Nav position', 'ekiline-block-collection')}
            value={attributes.navPosition}
            options={[
              { label: __('Default', 'ekiline-block-collection'), value: '' },
              { label: __('Fixed top', 'ekiline-block-collection'), value: ' fixed-top' },
              { label: __('Fixed bottom', 'ekiline-block-collection'), value: ' fixed-bottom' },
              { label: __('Sticky top', 'ekiline-block-collection'), value: ' sticky-top' },
              { label: __('Sticky bottom', 'ekiline-block-collection'), value: ' sticky-bottom' }
            ]}
            onChange={(navPosition) => setAttributes({ navPosition })}
          />
          <SelectControl
            label={__('Nav style', 'ekiline-block-collection')}
            value={attributes.navStyle}
            options={[
              { label: __('Default', 'ekiline-block-collection'), value: 'collapse' },
              { label: __('Offcanvas', 'ekiline-block-collection'), value: 'offcanvas' },
              { label: __('Scroller', 'ekiline-block-collection'), value: 'nav-scroller' }
            ]}
            onChange={(navStyle) => setAttributes({ navStyle })}
          />
          <SelectControl
            label={__('Collapse navigation', 'ekiline-block-collection')}
            value={attributes.navShow}
            options={[
              { label: __('Medium screens (default)', 'ekiline-block-collection'), value: ' navbar-expand-lg' },
              { label: __('Small screens', 'ekiline-block-collection'), value: ' navbar-expand-sm' },
              { label: __('Always expanded', 'ekiline-block-collection'), value: ' navbar-expand' },
              { label: __('Always collapsed', 'ekiline-block-collection'), value: '' }
            ]}
            onChange={(navShow) => setAttributes({ navShow })}
            help={getHelpText(attributes.navShow)}
          />
          <SelectControl
            label={__('Align nav items', 'ekiline-block-collection')}
            value={attributes.alignItems}
            options={[
              { label: __('Default', 'ekiline-block-collection'), value: '' },
              { label: __('Center', 'ekiline-block-collection'), value: ' justify-content-md-center' }
            ]}
            onChange={(alignItems) => setAttributes({ alignItems })}
          />
        </PanelBody>
      </InspectorControls>
      <InnerBlocks
        allowedBlocks={PARENT_ALLOWED_BLOCKS}
        template={CHILD_TEMPLATE}
        orientation='horizontal'
      />
    </div>
  )
}
