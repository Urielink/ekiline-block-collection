// src/components/ekiline-carousel/variations/content.js

import { useBlockProps } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'
import { __ } from '@wordpress/i18n'
import { useEffect } from '@wordpress/element'
import CarouselMarkup from '../utils/CarouselMarkup'

export function ContentEdit({ attributes, setAttributes }) {
  const {
    contentPostType = 'post',
    contentCategory = '',
    contentPostsPerPage = 6,
    contentOrder = 'desc',
    contentOrderBy = 'date',
    AddControls = true,
    AddIndicators = true
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

    const simplifiedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title?.rendered || '',
      excerpt: post.excerpt?.rendered || '',
      link: post.link || '',
      featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
    }));

    setAttributes && setAttributes({ posts: simplifiedPosts });
  }, [posts, attributes.contentIsDynamic]);

  return (
    <div {...blockProps}>
      <CarouselMarkup
        posts={hasPosts ? posts.map((post) => ({
          id: post.id,
          title: post.title?.rendered || '',
          excerpt: post.excerpt?.rendered || '',
          link: post.link || '',
          featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
        })) : []}
        controls={AddControls}
        indicators={AddIndicators}
      />
    </div>
  )
}

export function ContentSave({ attributes }) {
  const blockProps = useBlockProps.save({ className: 'carousel-content' })
  const posts = attributes.posts || []

  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div {...blockProps}>
        <p>{__('No posts available.', 'ekiline-block-collection')}</p>
      </div>
    )
  }

  return (
    <div {...blockProps}>
      <CarouselMarkup
        posts={posts}
        controls={attributes.AddControls}
        indicators={attributes.AddIndicators}
      />
    </div>
  )
}
