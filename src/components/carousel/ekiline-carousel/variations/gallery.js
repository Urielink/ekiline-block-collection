// src/components/ekiline-carousel/variations/gallery.js

import { MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor'
import { Button } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export function GalleryEdit({ attributes, setAttributes }) {
  const { GalleryImages } = attributes
  const blockProps = useBlockProps({ className: 'carousel-gallery' })

  const onSelectImages = (images) => {
    const formatted = images.map((img) => ({
      id: img.id,
      url: img.url || img.source_url,
      alt: img.alt || ''
    }))
    setAttributes({ GalleryImages: formatted })
  }

  return (
    <div {...blockProps}>
      <MediaUploadCheck>
        <MediaUpload
          onSelect={onSelectImages}
          allowedTypes={['image']}
          multiple
          gallery
          value={GalleryImages.map((img) => img.id)}
          render={({ open }) => (
            <Button onClick={open} variant="secondary" isSecondary>
              {GalleryImages.length > 0
                ? __('Edit Gallery', 'ekiline-block-collection')
                : __('Select Images for Gallery', 'ekiline-block-collection')}
            </Button>
          )}
        />
      </MediaUploadCheck>
      <div className="gallery-preview">
        {GalleryImages && GalleryImages.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={img.alt}
            style={{ maxWidth: '100px', margin: '5px' }}
          />
        ))}
      </div>
    </div>
  )
}

export function GallerySave({ attributes }) {
  const { GalleryImages } = attributes
  const blockProps = useBlockProps.save({ className: 'carousel-gallery' })

  return (
    <div {...blockProps}>
      <div className="carousel-inner">
        {GalleryImages && GalleryImages.map((img, i) => (
          <div
            key={i}
            className={`carousel-item${i === 0 ? ' active' : ''}`}
          >
            <img src={img.url} alt={img.alt} className="d-block w-100" />
          </div>
        ))}
      </div>
    </div>
  )
}