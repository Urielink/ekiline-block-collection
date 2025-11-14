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

  // Asignar nuevas variables de colores, color de texto para caption y selectores.
  const captionColor = attributes.textColor
    ? `var(--wp--preset--color--${attributes.textColor})`
    : attributes.style?.color?.text

  if (captionColor) {
    blockProps.style = {
      ...blockProps.style,
      '--bs-carousel-caption-color': captionColor,
      '--bs-carousel-indicator-active-bg': captionColor
    }
  }

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
    if (!richImages.length && GalleryImages.length) {
      // limpiar atributo si ya no hay imágenes
      setAttributes({ GalleryImages: [] })
      return
    }

    if (richImages.length && JSON.stringify(richImages) !== JSON.stringify(GalleryImages)) {
      setAttributes({ GalleryImages: richImages })
    }
  }, [richImages, GalleryImages])

  return (
    <div {...blockProps}>
      {/* Miniaturas encapsuladas */}
      <div className='setup-gallery'>
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
        {richImages.length > 0 ? (
            <div className="gallery-preview">
              { richImages.map((img, i) => (
                <img
                  key={i}
                  src={img.featuredImageSizes.thumbnail?.source_url || img.featuredImage}
                  alt={img.alt}
                  style={{ maxWidth: '40px', margin: '4px' }}
                />
              ))}
            </div>
          ) : (
            <div className="components-placeholder__instructions">
            {__('Waiting images…', 'ekiline-block-collection')}
            </div> 
        )}
      </div>
      {/* previsualizar encapsulado. */}
      <div style={{ position: 'relative' }}>
        {
          richImages && richImages.length > 0
          ? <CarouselMarkup attributes={attributes} posts={richImages} disabledControls={true} />
          : <></>
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

  // Asignar nuevas variables de colores, color de texto para caption y selectores.
  const captionColor = attributes.textColor
    ? `var(--wp--preset--color--${attributes.textColor})`
    : attributes.style?.color?.text

  if (captionColor) {
    blockProps.style = {
      ...blockProps.style,
      '--bs-carousel-caption-color': captionColor,
      '--bs-carousel-indicator-active-bg': captionColor
    }
  }

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