import { __ } from '@wordpress/i18n'
import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, SelectControl, ToggleControl, TextControl, RangeControl, FormTokenField, FontSizePicker } from '@wordpress/components'
// import { useState } from 'react'
import { useState } from '@wordpress/element'

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

  // Funcion para buscar posts y pages y guardar IDs
  const RenderPostsSearch = () => {
    const [searchQuery, setSearchQuery] = useState('')

    // Sugerencias dinámicas según el término de búsqueda
    const suggestions = useSelect((select) => {
      if (!searchQuery) return []
      const args = { search: searchQuery, per_page: 20, status: 'publish', _embed: true }
      const posts = select('core').getEntityRecords('postType', 'post', args) || []
      const pages = select('core').getEntityRecords('postType', 'page', args) || []
      const items = [...posts, ...pages]
      return items.map((item) => {
        const title = item.title?.rendered?.replace(/<[^>]+>/g, '') || __('(no title)', 'ekiline-block-collection')
        return `${title} #${item.id}`
      })
    }, [searchQuery])

    // Resolver títulos para los IDs seleccionados actualmente
    const selectedRecords = useSelect((select) => {
      const ids = attributes.contentSelectedIds || []
      if (!ids.length) return []
      const args = { include: ids, per_page: ids.length, _embed: true }
      const posts = select('core').getEntityRecords('postType', 'post', args) || []
      const pages = select('core').getEntityRecords('postType', 'page', args) || []
      // Mantener el orden según IDs
      const order = new Map(ids.map((id, i) => [id, i]))
      return [...posts, ...pages].sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0))
    }, [attributes.contentSelectedIds])

    const valueTokens = (selectedRecords || []).map((item) => {
      const title = item.title?.rendered?.replace(/<[^>]+>/g, '') || __('(no title)', 'ekiline-block-collection')
      return `${title} #${item.id}`
    })

    return (
      <FormTokenField
        label={__('Search & Pick (posts/pages)', 'ekiline-block-collection')}
        value={valueTokens}
        suggestions={suggestions}
        onInputChange={setSearchQuery}
        onChange={(tokens) => {
          // Extraer IDs desde tokens del tipo "Title #123"
          const ids = Array.from(new Set(
            tokens
              .map((t) => {
                const m = t.match(/#(\d+)$/)
                return m ? parseInt(m[1], 10) : null
              })
              .filter(Boolean)
          ))
          setAttributes({ contentSelectedIds: ids })
        }}
        __experimentalShowHowTo={false}
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
                { label: 'Page', value: 'page' },
                { label: 'Search & Pick', value: 'search' } // nuevo modo manual
                // Puedes agregar más post types si están registrados
              ]}
              onChange={(value) => setAttributes({ contentPostType: value })}
            />

            {attributes.contentPostType === 'post' && (
              <RenderCategorySelector/>
            )}

            {attributes.contentPostType !== 'search' && (
              <>
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
              </>
            )}

            {attributes.contentPostType === 'search' && (
              <RenderPostsSearch/>
            )}

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
