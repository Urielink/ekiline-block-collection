import { __ } from '@wordpress/i18n'
import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components'
// manual
import { ManualEdit } from './variations/manual'
// galeria
import { GalleryEdit } from './variations/gallery'
// contenido
import { ContentEdit } from './variations/content'
import { useSelect } from '@wordpress/data'
// dinamico
// Removed DynamicEdit import as per instructions

export default function Edit ({ attributes, setAttributes }) {
  const { ChooseType } = attributes

  const renderVariation = () => {
    switch (ChooseType) {
      case 'manual':
        return <ManualEdit attributes={attributes} setAttributes={setAttributes} />
      case 'gallery':
        return <GalleryEdit attributes={attributes} setAttributes={setAttributes} />
      case 'content':
        return <ContentEdit attributes={attributes} setAttributes={setAttributes} />
      default:
        return <ManualEdit attributes={attributes} setAttributes={setAttributes} />
    }
  }

  return (
    <>
      <InspectorControls>
        {/* Seleccionar tipo de carrusel: */}
        <PanelBody title={__('Carousel Type', 'ekiline-block-collection')} initialOpen={true}>
          <SelectControl
            label={__('Choose the carousel mode', 'ekiline-block-collection')}
            value={ChooseType}
            options={[
              { label: __('Manual (free design)', 'ekiline-block-collection'), value: 'manual' },
              { label: __('Gallery', 'ekiline-block-collection'), value: 'gallery' },
              { label: __('Content', 'ekiline-block-collection'), value: 'content' }
            ]}
            onChange={(newVal) => setAttributes({ ChooseType: newVal })}
          />
        </PanelBody>

        {/* Atributos adicionales para carrusel de contenido */}
        {ChooseType === 'content' && (
          <PanelBody title={__('Content Query Settings', 'ekiline-block-collection')} initialOpen={true}>
            <SelectControl
              label={__('Post type', 'ekiline-block-collection')}
              value={attributes.contentPostType}
              options={[
                { label: 'Post', value: 'post' },
                { label: 'Page', value: 'page' }
                // Puedes agregar más post types si están registrados
              ]}
              onChange={(value) => setAttributes({ contentPostType: value })}
            />

            {attributes.contentPostType === 'post' && (
              <SelectControl
                label={__('Category', 'ekiline-block-collection')}
                value={attributes.contentCategory}
                options={[
                  { label: __('All categories', 'ekiline-block-collection'), value: '' },
                  ...useSelect((select) => {
                    const terms = select('core').getEntityRecords('taxonomy', 'category', { per_page: -1 })
                    return terms
                      ? terms.map((term) => ({ label: term.name, value: term.id }))
                      : []
                  }, [])
                ]}
                onChange={(value) => setAttributes({ contentCategory: value })}
              />
            )}

            <SelectControl
              label={__('Order by', 'ekiline-block-collection')}
              value={attributes.contentOrderBy}
              options={[
                { label: 'Date', value: 'date' },
                { label: 'Title', value: 'title' },
                { label: 'Random', value: 'rand' }
              ]}
              onChange={(value) => setAttributes({ contentOrderBy: value })}
            />

            <SelectControl
              label={__('Order', 'ekiline-block-collection')}
              value={attributes.contentOrder}
              options={[
                { label: 'Descending', value: 'desc' },
                { label: 'Ascending', value: 'asc' }
              ]}
              onChange={(value) => setAttributes({ contentOrder: value })}
            />

            <SelectControl
              label={__('Number of posts', 'ekiline-block-collection')}
              value={attributes.contentPostsPerPage}
              options={[3, 6, 9, 12].map((n) => ({ label: String(n), value: n }))}
              onChange={(value) => setAttributes({ contentPostsPerPage: parseInt(value, 10) })}
            />

            <ToggleControl
              label={__('Use dynamic loading (PHP)', 'ekiline-block-collection')}
              checked={attributes.contentIsDynamic}
              onChange={(value) => setAttributes({ contentIsDynamic: value })}
            />
          </PanelBody>
        )}

      </InspectorControls>
      {renderVariation()}
    </>
  )
}