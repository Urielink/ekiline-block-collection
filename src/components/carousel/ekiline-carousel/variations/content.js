// src/components/ekiline-carousel/variations/content.js

import { useBlockProps } from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data'
import { __ } from '@wordpress/i18n'

export function ContentEdit({ attributes }) {
  const {
    contentPostType = 'post',
    contentCategory = '',
    contentPostsPerPage = 6,
    contentOrder = 'desc',
    contentOrderBy = 'date',
    AddControls = true,
    AddIndicators = true,
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

  return (
    <div {...blockProps}>
      {hasPosts && AddIndicators && (
        <div className="carousel-indicators">
          {posts.map((_, i) => (
            <button
              key={`indicator-${i}`}
              type="button"
              className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined}
              aria-label={`Slide ${i + 1}`}
              disabled
            />
          ))}
        </div>
      )}

      <div className="carousel-inner">
        {hasPosts &&
          posts.map((post, index) => {
            const featuredMedia =
              post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null

            return (
              <div
                key={post.id}
                className={`carousel-item${index === 0 ? ' active' : ''}`}
              >
                {featuredMedia && (
                  <img
                    src={featuredMedia}
                    alt={post.title.rendered}
                    className="d-block w-100"
                  />
                )}
                <div className="carousel-caption">
                  <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    {__('Read more', 'ekiline-block-collection')}
                  </a>
                </div>
              </div>
            )
          })}
      </div>

      {hasPosts && AddControls && (
        <>
          <button className="carousel-control-prev" type="button" disabled>
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">{__('Previous', 'ekiline-block-collection')}</span>
          </button>
          <button className="carousel-control-next" type="button" disabled>
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">{__('Next', 'ekiline-block-collection')}</span>
          </button>
        </>
      )}

      {!posts && <p>{__('Loading posts...', 'ekiline-block-collection')}</p>}
      {posts && posts.length === 0 && <p>{__('No posts found.', 'ekiline-block-collection')}</p>}
    </div>
  )
}

export function ContentSave() {
  // El render se considera "visual", sin guardar datos fijos.
  return null
}