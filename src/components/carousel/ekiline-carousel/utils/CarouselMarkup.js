import { __ } from '@wordpress/i18n'
import ResponsiveImage from './ResponsiveImage'

export default function CarouselMarkup({ attributes = {}, posts = [], disabledControls = false }) {
  const {
    AddControls = true,
    AddIndicators = true,
    anchor = '',
    SetHeight = '540px',
    contentLinkSlide = false
  } = attributes;

  if (!Array.isArray(posts) || posts.length === 0) return null;

  // Bloquear el enlace cuando los controles están deshabilitados.
  const linkAttributes = disabledControls
    ? {
        rel: 'noopener noreferrer',
        style: { pointerEvents: 'none' },
        tabIndex: -1,
        'aria-disabled': true,
        onClick: (e) => e.preventDefault(),
      }
    : {};

  // Utilidad: limpiar HTML a texto simple
  const toPlainText = (html) => {
    if (!html) return ''
    const text = String(html).replace(/<[^>]*>/g, ' ')
    return text.replace(/\s+/g, ' ').trim() + '...'
  }

  // --- Helpers estilo plantilla (tipo PHP) ---
  const hasImage = (p) => !!p?.featuredImageSizes;
  const hasLink  = (p) => !!p?.link;
  const wrapWholeSlide = (p) => hasLink(p) && (contentLinkSlide || !hasImage(p));

  const ImageEl = (p) => hasImage(p) && (
    <ResponsiveImage
      image={{ source_url: p.featuredImage, media_details: { sizes: p.featuredImageSizes } }}
      alt={p.title}
      className="d-block w-100"
    />
  );

  /**
   * CaptionEl - Renderiza el caption de cada slide del carrusel.
   * 
   * @param {Object} p - Objeto del post/imagen enriquecida.
   * @returns {JSX.Element} Contenido de título, excerpt y enlace "Read more".
   * 
   * Notas:
   * - Usa dangerouslySetInnerHTML para respetar el HTML en el título.
   * - Limpia el excerpt para mostrar solo texto plano.
   * - Si todo el slide es enlace (wrapWholeSlide), el "Read more" se muestra como <span>
   *   para evitar anchors anidados.
   * - Si no, se muestra como <a> tradicional.
   */
  const CaptionEl = (p) => (
    <div className="carousel-caption">
      <h3 dangerouslySetInnerHTML={{ __html: p.title }} />
      <p>
        {/* Texto plano del excerpt */}
        {toPlainText(p.excerpt)}{' '}
        {/* Enlace "Read more" condicionado para evitar enlaces anidados */}
        {wrapWholeSlide(p)
          ? (
            // Evitar anchors anidados cuando todo el slide es enlace
            <span className="read-more as-link" aria-hidden={disabledControls ? 'true' : undefined}>
              {__('Read more', 'ekiline-block-collection')}
            </span>
          ) : (
            hasLink(p) && (
              <a href={p.link} {...linkAttributes}>
                {__('Read more', 'ekiline-block-collection')}
              </a>
            )
          )}
      </p>
    </div>
  );


  return (
    <>
      {AddIndicators && (
        <div className="carousel-indicators">
          {posts.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target={`#${anchor}`}
              data-bs-slide-to={i}
              className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined}
              aria-label={`Slide ${i + 1}`}
              disabled={disabledControls}
            />
          ))}
        </div>
      )}

      <div className="carousel-inner" style={{ height: SetHeight }}>
        {posts.map((post, index) => (
          <div
            key={post.id || index}
            className={`carousel-item${index === 0 ? ' active' : ''}`}
            style={{ height: SetHeight }}
          >

            {wrapWholeSlide(post) ? (
              <a href={post.link} {...linkAttributes}>
                {ImageEl(post)}
                {CaptionEl(post)}
              </a>
            ) : (
              <>
                {ImageEl(post)}
                {CaptionEl(post)}
              </>
            )}

          </div>
        ))}
      </div>

      {AddControls && (
        <>
          <button className="carousel-control-prev" type="button" data-bs-target={`#${anchor}`} data-bs-slide="prev" disabled={disabledControls}>
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">{__('Previous', 'ekiline-block-collection')}</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={`#${anchor}`} data-bs-slide="next" disabled={disabledControls}>
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">{__('Next', 'ekiline-block-collection')}</span>
          </button>
        </>
      )}

    </>
  )
}