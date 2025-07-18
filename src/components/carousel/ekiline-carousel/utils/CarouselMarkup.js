import { __ } from '@wordpress/i18n'

export default function CarouselMarkup({ posts = [], controls = true, indicators = true }) {
  if (!Array.isArray(posts) || posts.length === 0) return null

  return (
    <>
      {indicators && (
        <div className="carousel-indicators">
          {posts.map((_, i) => (
            <button
              key={i}
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
        {posts.map((post, index) => (
          <div
            key={post.id || index}
            className={`carousel-item${index === 0 ? ' active' : ''}`}
          >
            {post.featuredImage && (
              <img
                src={post.featuredImage}
                alt={post.title}
                className="d-block w-100"
              />
            )}
            <div className="carousel-caption">
              <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
              <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                {__('Read more', 'ekiline-block-collection')}
              </a>
            </div>
          </div>
        ))}
      </div>

      {controls && (
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
    </>
  )
}