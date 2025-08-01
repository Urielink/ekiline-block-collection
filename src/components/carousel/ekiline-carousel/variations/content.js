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
    featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
  }))
}

export function ContentEdit({ attributes, setAttributes }) {
  const {
    contentPostType = 'post',
    contentCategory = '',
    contentPostsPerPage = 6,
    contentOrder = 'desc',
    contentOrderBy = 'date'
  } = attributes

  const blockProps = useBlockProps({ className: 'carousel-content' })

  const posts = useSelect(
    (select) => {
      return select('core').getEntityRecords('postType', contentPostType, {
        per_page: contentPostsPerPage,
        order: contentOrder,
        orderby: contentOrderBy,
        categories: contentCategory ? [contentCategory] : undefined,
        _embed: true,
      })
    },
    [contentPostType, contentCategory, contentPostsPerPage, contentOrder, contentOrderBy]
  )

  const hasPosts = Array.isArray(posts) && posts.length > 0

  useEffect(() => {
    if (!hasPosts || attributes.contentIsDynamic) return;

    const simplifiedPosts = getSimplifiedPosts(posts);

    // Comparar con los posts actuales en atributos
    const hasChanged = JSON.stringify(simplifiedPosts) !== JSON.stringify(attributes.contentPosts);

    if (hasChanged) {
      setAttributes({ contentPosts: simplifiedPosts });
    }
  }, [posts, attributes.contentIsDynamic]);

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
  // pendiente mejorar la altura de carrusel.
  const minHeight = attributes.SetHeight ? `${attributes.SetHeight}px` : '100vh'

  // Personalizar attributos.
  const blockProps = useBlockProps.save({
    className: 'carousel-content carousel' + carColumns + carAnimation,
    'data-bs-ride': carAutoplay,
    'data-bs-interval': carInterval,
    style: { height: minHeight },
  })

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
