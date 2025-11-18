// ResponsiveImage.js
export default function ResponsiveImage ({ image = {}, alt = '', className = '' }) {
  if (!image || !image.source_url) return null

  const sizes = image.media_details?.sizes || {}

  const src = sizes.full?.source_url || image.source_url
  const srcSet = [
    sizes.thumbnail ? `${sizes.thumbnail.source_url} 150w` : '',
    sizes.medium ? `${sizes.medium.source_url} 300w` : '',
    sizes.large ? `${sizes.large.source_url} 1024w` : '',
    sizes.full ? `${sizes.full.source_url} 1920w` : ''
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes='(max-width: 1708px) 100vw, 1708px'
      alt={alt}
      className={className}
      loading='lazy'
    />
  )
}
