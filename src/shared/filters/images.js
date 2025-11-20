import { __ } from '@wordpress/i18n'
import { ToggleControl, TextControl, SelectControl, PanelBody } from '@wordpress/components'
import { addFilter } from '@wordpress/hooks'
import { Fragment, cloneElement } from '@wordpress/element'
import { InspectorControls } from '@wordpress/block-editor'
import { createHigherOrderComponent } from '@wordpress/compose'

const bsImgAllowedBlocks = ['core/image']

function addAttributesBsImageLink (settings) {
  if (bsImgAllowedBlocks.includes(settings.name)) {
    settings.attributes = Object.assign(settings.attributes, {
      anchorBsComponent: { type: 'string', default: '' },
      selectBsComponent: { type: 'string', default: '' },
      dismissBsComponent: { type: 'boolean', default: true }
    })
  }
  return settings
}

const withAdvancedControlsBsImageLink = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const { attributes, setAttributes } = props
    const { dismissBsComponent } = attributes

    if (bsImgAllowedBlocks.includes(props.name)) {
      return (
        <Fragment>
          <BlockEdit {...props} />
          {props.attributes.href && (
            <InspectorControls>
              <PanelBody title={__('Link to Ekiline Block', 'ekiline-block-collection')} initialOpen>
                <TextControl
                  label={__('Anchor block name', 'ekiline-block-collection')}
                  value={props.attributes.anchorBsComponent}
                  onChange={newData => props.setAttributes({ anchorBsComponent: newData })}
                />
                <SelectControl
                  label={__('Choose block', 'ekiline-block-collection')}
                  value={attributes.selectBsComponent}
                  options={[
                    { label: __('None', 'ekiline-block-collection'), value: '' },
                    { label: __('Collapse', 'ekiline-block-collection'), value: 'collapse' },
                    { label: __('Modal', 'ekiline-block-collection'), value: 'modal' },
                    { label: __('Offcanvas', 'ekiline-block-collection'), value: 'offcanvas' }
                  ]}
                  onChange={(selectBsComponent) => setAttributes({ selectBsComponent })}
                />
                <ToggleControl
                  label={__('Is close button?', 'ekiline-block-collection')}
                  checked={!dismissBsComponent}
                  onChange={() => setAttributes({ dismissBsComponent: !dismissBsComponent })}
                  help={!dismissBsComponent ? __('Yes.', 'ekiline-block-collection') : __('No.', 'ekiline-block-collection')}
                />
              </PanelBody>
            </InspectorControls>
          )}
        </Fragment>
      )
    }

    return <BlockEdit {...props} />
  }
}, 'withAdvancedControlsBsImageLink')

function applyExtraClassBsImageLink (element, block, attributes) {
  const { dismissBsComponent } = attributes

  if (bsImgAllowedBlocks.includes(block.name)) {
    const anchor = attributes.anchorBsComponent
    const toggle = attributes.selectBsComponent
    const hasHref = attributes.href

    const innerA = element?.props?.children?.props?.children?.[0]

    if (innerA?.type === 'a') {
      if (dismissBsComponent && anchor && toggle && hasHref) {
        return cloneElement(element, {}, cloneElement(innerA, {
          'data-bs-target': anchor,
          'data-bs-toggle': toggle
        }))
      }

      if (!dismissBsComponent && anchor && toggle && hasHref) {
        return cloneElement(element, {}, cloneElement(innerA, {
          'data-bs-dismiss': toggle
        }))
      }
    }
  }

  return element
}

addFilter('blocks.registerBlockType', 'ekilineBsImageLinkData/dataAttribute', addAttributesBsImageLink)
addFilter('editor.BlockEdit', 'ekilineBsImageLinkData/dataInput', withAdvancedControlsBsImageLink)
addFilter('blocks.getSaveElement', 'ekilineBsImageLinkData/dataModified', applyExtraClassBsImageLink)
