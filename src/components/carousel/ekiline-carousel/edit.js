import { __ } from '@wordpress/i18n'
import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, SelectControl, ToggleControl, TextControl, RangeControl, FormTokenField, FontSizePicker } from '@wordpress/components'

// manual
import { ManualEdit } from './variations/manual'
// galeria
import { GalleryEdit } from './variations/gallery'
// contenido
import { ContentEdit } from './variations/content'
import { useSelect } from '@wordpress/data'

// Random function for IDs.
import { getRandomArbitrary } from '../../../shared/collection'

export default function Edit ({ attributes, setAttributes }) {
  const { ChooseType } = attributes

  // Precargar nombre ID.
  if (!attributes.anchor) {
    setAttributes({ anchor: 'carousel' + getRandomArbitrary(10, 150) })
  }

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

  // Render function for category selector
  const RenderCategorySelector = () => {

    // Get allCategories using useSelect hook.
      const allCategories = useSelect(
        (select) => {
          if (ChooseType === 'content' && attributes.contentPostType === 'post') {
            return select('core').getEntityRecords('taxonomy', 'category', { per_page: -1 }) || []
          }
          return []
        },
        [ChooseType, attributes.contentPostType, attributes.contentCategory] // ⬅ Aquí se incluye
      )

    return (
      <FormTokenField
        label={__('Categories', 'ekiline-block-collection')}
        value={
          attributes.contentCategory?.map((id) => {
            const term = allCategories.find((term) => term.id === id)
            return term?.name
          }).filter(Boolean) || []
        }
        suggestions={allCategories.map((term) => term.name)}
        onChange={(selectedNames) => {
          const selectedIDs = allCategories
            .filter((term) => selectedNames.includes(term.name))
            .map((term) => term.id)
          setAttributes({ contentCategory: selectedIDs })
        }}
      />
    )
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
              <RenderCategorySelector/>
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

        {/* Atributos de look */}
        <PanelBody title={__('Carousel Look', 'ekiline-block-collection')} initialOpen={true}>

          <ToggleControl
            label={__('Show controls', 'ekiline-block-collection')}
            checked={attributes.AddControls}
            onChange={(AddControls) =>
              setAttributes({ AddControls })}
          />

          <ToggleControl
            label={__('Show indicators', 'ekiline-block-collection')}
            checked={attributes.AddIndicators}
            onChange={(AddIndicators) =>
              setAttributes({ AddIndicators })}
          />

          <ToggleControl
            label={__('Auto Play', 'ekiline-block-collection')}
            checked={attributes.SetAuto}
            onChange={(SetAuto) => setAttributes({ SetAuto })}
          />

          <FontSizePicker
            label={__('Carrusel: Altura', 'ekiline-block-collection')}
            fontSizes={[
              { name: 'Default', slug: 'default', size: '540px' },
              { name: 'Medio', slug: 'medium', size: '720px' },
              { name: 'Full', slug: 'full', size: '100vh' }
            ]}
            fallbackFontSize={ parseInt(attributes.SetHeight) || 540 }
            units={[ 'px', 'vh', '%' ]}
            value={ attributes.SetHeight }
            onChange={( newSize ) => {
              setAttributes({ SetHeight: newSize || '540px' })
            }}
            withSlider
          />

          <TextControl
            label={__('Transition in milliseconds', 'ekiline-block-collection')}
            type='number'
            value={attributes.SetTime}
            onChange={(newval) =>
              setAttributes({ SetTime: parseInt(newval) })}
          />

          <SelectControl
            label={__('Animation type', 'ekiline-block-collection')}
            value={attributes.SetAnimation}
            options={[
              { label: __('Default', 'ekiline-block-collection'), value: '' },
              { label: __('Fade', 'ekiline-block-collection'), value: 'fade' },
              { label: __('Vertical', 'ekiline-block-collection'), value: 'vertical' }
            ]}
            onChange={(SetAnimation) =>
              setAttributes({ SetAnimation })}
          />

          {/* Opcion de columnas y una varible de diseño, esto ocurrirá con js en el front. */}
          <RangeControl
            label={__('Columns', 'ekiline-block-collection')}
            value={attributes.SetColumns}
            onChange={(newval) =>
              setAttributes({ SetColumns: parseInt(newval) })}
            min={1}
            max={4}
          />

        </PanelBody>

      </InspectorControls>
      {renderVariation()}
    </>
  )
}
