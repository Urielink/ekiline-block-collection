// src/components/ekiline-carousel/variations/content.js

import { useBlockProps } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'
import { __ } from '@wordpress/i18n'
import { useEffect } from '@wordpress/element'
import CarouselMarkup from '../utils/CarouselMarkup'

// Utility function to simplify posts array
function getSimplifiedPosts(posts) {
  if (!Array.isArray(posts)) return []
  return posts.map((post) => ({
    id: post.id,
    title: post.title?.rendered || '',
    excerpt: post.excerpt?.rendered || '',
    link: post.link || '',
    featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    featuredImageSizes: post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes || {}
  }))
}

export function ContentEdit({ attributes, setAttributes }) {
  const {
    contentPostType = 'post',
    contentCategory = '',
    contentPostsPerPage = 6,
    contentOrder = 'desc',
    contentOrderBy = 'date',
    contentSelectedIds = []
  } = attributes

  const blockProps = useBlockProps({ className: 'carousel-content' })

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

  const posts = useSelect(
    (select) => {
      const core = select('core')

      // Modo búsqueda manual: usar IDs seleccionados (post y page)
      if (contentPostType === 'search') {
        const ids = Array.isArray(contentSelectedIds) ? contentSelectedIds : []
        if (!ids.length) return []

        const args = { include: ids, per_page: ids.length, _embed: true, status: 'publish' }
        const postsArr = core.getEntityRecords('postType', 'post', args) || []
        const pagesArr = core.getEntityRecords('postType', 'page', args) || []

        // Ordenar según el orden de IDs
        const order = new Map(ids.map((id, i) => [id, i]))
        return [...postsArr, ...pagesArr].sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0))
      }

      // Modo consulta (query) tradicional
      return core.getEntityRecords('postType', contentPostType, {
        per_page: contentPostsPerPage,
        order: contentOrder,
        orderby: contentOrderBy,
        categories: contentCategory && contentCategory.length ? contentCategory : undefined,
        _embed: true,
      })
    },
    [contentPostType, contentCategory, contentPostsPerPage, contentOrder, contentOrderBy, contentSelectedIds]
  )

  const hasPosts = Array.isArray(posts) && posts.length > 0

  useEffect(() => {
    if (!hasPosts) return

    const simplifiedPosts = getSimplifiedPosts(posts)
    const hasChanged = JSON.stringify(simplifiedPosts) !== JSON.stringify(attributes.contentPosts)

    if (hasChanged) {
      setAttributes({ contentPosts: simplifiedPosts })
    }
  }, [posts, attributes.contentIsDynamic, attributes.contentPosts, contentPostType, contentSelectedIds])

  return (
    <div {...blockProps}>
      {
        posts && posts.length > 0 && attributes.contentPosts
        ? <CarouselMarkup attributes={attributes} posts={attributes.contentPosts} disabledControls={true} />
        : <p>{__('Loading preview…', 'ekiline-block-collection')}</p>
      }
    </div>
  )
}

export function ContentSave({ attributes }) {

  // Al inicio del componente, todas las variables.
  const carColumns = attributes.SetColumns > 1 ? ` carousel-multiple x${attributes.SetColumns}` : ''
  const carAnimation = attributes.SetAnimation ? ` carousel-${attributes.SetAnimation}` : ''
  const carAutoplay = attributes.SetAuto ? 'carousel' : undefined
  const carInterval = attributes.SetTime || undefined
  const minHeight = attributes.SetHeight || '540px'

  // Personalizar attributos.
  const blockProps = useBlockProps.save({
    className: 'carousel-content carousel' + carColumns + carAnimation,
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

  const posts = attributes.contentPosts || []

  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div {...blockProps}>
        <p>{__('No posts available.', 'ekiline-block-collection')}</p>
      </div>
    )
  }

  return (
    <div {...blockProps}>
      <CarouselMarkup attributes={attributes} posts={posts} />
    </div>
  )
}
