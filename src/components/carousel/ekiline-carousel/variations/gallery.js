// src/components/ekiline-carousel/variations/gallery.js

import { MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor'
import { Button } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { useSelect } from '@wordpress/data'
import { useEffect } from 'react'
import CarouselMarkup from '../utils/CarouselMarkup'

export function GalleryEdit({ attributes, setAttributes }) {
  // Al inicio del componente, todas las variables.
  const {
    GalleryImagesIds = [],
    GalleryImages = []
  } = attributes

  const blockProps = useBlockProps({ className: 'carousel-gallery' })

  // Función para manejar la selección de imágenes.
  const onSelectImages = (images) => {
    const ids = images.map((img) => img.id)
    setAttributes({ GalleryImagesIds: ids })
  }

  // Utilizar useSelect para obtener los datos de las imágenes ricas.
  const richImages = useSelect((select) => {
    const { getMedia } = select('core')
    return GalleryImagesIds.map((id) => {
      const media = getMedia(id)
      if (!media) return null
      return {
        id: media.id,
        title: media.title?.rendered || '',
        excerpt: media.caption?.rendered || '',
        alt: media.alt_text || '',
        caption: media.caption?.rendered || '',
        link: media.link || '',
        featuredImage: media?.source_url || '',
        featuredImageSizes: media?.media_details?.sizes || {}
      }
    }).filter(Boolean)
  }, [GalleryImagesIds])

  // Efecto para actualizar los atributos del bloque si las imágenes ricas cambian.
  useEffect(() => {
    if (richImages.length && JSON.stringify(richImages) !== JSON.stringify(GalleryImages)) {
      setAttributes({ GalleryImages: richImages })
    }
  }, [richImages])

  return (
    <div {...blockProps}>
      {/* Miniaturas encapsuladas */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', paddingLeft: '5px' }}>
        <MediaUploadCheck>
          <MediaUpload
            onSelect={onSelectImages}
            allowedTypes={['image']}
            multiple
            gallery
            value={GalleryImagesIds}
            render={({ open }) => (
              <Button onClick={open} variant="primary">
                {GalleryImagesIds.length > 0
                  ? __('Edit Gallery', 'ekiline-block-collection')
                  : __('Select Images for Gallery', 'ekiline-block-collection')}
              </Button>
            )}
          />
        </MediaUploadCheck>
        <div className="gallery-preview">
          {richImages && richImages.map((img, i) => (
            <img
              key={i}
              src={img.featuredImageSizes.thumbnail?.source_url || img.featuredImage}
              alt={img.alt}
              style={{ maxWidth: '40px', margin: '4px' }}
            />
          ))}
        </div>
      </div>
      {/* previsualizar encapsulado. */}
      <div style={{ position: 'relative' }}>
        {
          richImages && richImages.length > 0
          ? <CarouselMarkup attributes={attributes} posts={richImages} disabledControls={true} />
          : <p>{__('Waiting images…', 'ekiline-block-collection')}</p>
        }
      </div>
    </div>
  )
}

export function GallerySave({ attributes }) {

  // Al inicio del componente, todas las variables.
  const carColumns = attributes.SetColumns > 1 ? ` carousel-multiple x${attributes.SetColumns}` : ''
  const carAnimation = attributes.SetAnimation ? ` carousel-${attributes.SetAnimation}` : ''
  const carAutoplay = attributes.SetAuto ? 'carousel' : undefined
  const carInterval = attributes.SetTime || undefined
  const minHeight = attributes.SetHeight || '480px'

  // Personalizar attributos.
  const blockProps = useBlockProps.save({
    className: 'carousel-gallery carousel' + carColumns + carAnimation,
    'data-bs-ride': carAutoplay,
    'data-bs-interval': carInterval,
    style: { height: minHeight },
  })

  const { GalleryImages } = attributes

  if (!Array.isArray(GalleryImages) || GalleryImages.length === 0) {
    return (
      <div {...blockProps}>
        <p>{__('No images available.', 'ekiline-block-collection')}</p>
      </div>
    )
  }

  return (
    <div {...blockProps}>
      <CarouselMarkup attributes={attributes} posts={GalleryImages} />
    </div>
  )
}