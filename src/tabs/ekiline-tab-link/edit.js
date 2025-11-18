import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor'
import { PanelBody, TextControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { replaceSpecialChars } from '../../shared/collection'
import { useEffect } from '@wordpress/element'

export default function Edit (props) {
  const { attributes, setAttributes, isSelected, clientId } = props
  const blockProps = useBlockProps({
    className: 'tab-link nav-link'
    // 'data-bs-target': (attributes.dataBsTarget) ? '#' + attributes.dataBsTarget : null,
    // 'data-bs-toggle': 'tabs'
  })

  // mostrar interaccion en link con base en bootstrap isSelected.
  if (isSelected) {
    blockProps.className += ' active'
  }

  // Sincronizar el dataBsTarget cuando el contenido cambie.
  useEffect(() => {
    const newTarget = replaceSpecialChars(attributes.content) || `tab-${clientId.substring(0, 8)}`
    if (attributes.dataBsTarget !== newTarget) {
      setAttributes({ dataBsTarget: newTarget })
    }
  }, [attributes.content, clientId, setAttributes])

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Tab Link Params', 'ekiline-block-collection')} initialOpen>
          <TextControl
            label={__('Copy this value in a Content Tab HTML anchor field.', 'ekiline-block-collection')}
            type='string'
            value={attributes.dataBsTarget}
            readOnly
          />
        </PanelBody>
      </InspectorControls>
      <RichText
        withoutInteractiveFormatting
        allowedFormats={['core/bold', 'core/italic', 'core/image', 'core/align', 'ekiline-format/find-anchor']}
        tagName='p'
        className='m-0'
        value={attributes.content}
        onChange={(content) => setAttributes({ content })}
      />
    </div>
  )
}
