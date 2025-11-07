import { RawHTML } from '@wordpress/element';

export default function save( { attributes } ) {
  const {
    menuHtml, navStyle, navShow, navPosition, alignItems, container, brandText, targetId
  } = attributes;

  const navClasses = `navbar${navPosition || ''}${navShow || ''}${alignItems || ''} bg-body-tertiary`.trim();
  const wrapperCls = container || 'container-fluid';
  const menuWrapperCls = navStyle === 'offcanvas'
    ? 'offcanvas offcanvas-end'
    : 'collapse navbar-collapse';

  return (
    <nav className={ navClasses }>
      <div className={ wrapperCls }>
        <div className="navbar-brand">{ brandText || 'Navbar' }</div>

        <button className="navbar-toggler"
          type="button"
          data-bs-toggle={ navStyle === 'offcanvas' ? 'offcanvas' : 'collapse' }
          data-bs-target={ `#${ targetId }` }
          aria-controls={ targetId }
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id={ targetId } className={ menuWrapperCls }>
          {/* Inyectamos el UL que el usuario compuso con core/list */}
          { menuHtml
            ? <RawHTML>{ menuHtml }</RawHTML>
            : <ul className="navbar-nav"></ul> }
        </div>
      </div>
    </nav>
  );
}