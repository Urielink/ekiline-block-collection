import { RawHTML } from '@wordpress/element';

const styleStringToObject = (str) => {
  if (!str) return undefined;
  return str.split(';').reduce((acc, decl) => {
    const [prop, val] = decl.split(':').map(s => s && s.trim()).filter(Boolean);
    if (!prop || !val) return acc;
    const jsProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    acc[jsProp] = val;
    return acc;
  }, {});
};

const liStyleFromGutenberg = (styleObj) => {
  if (!styleObj) return undefined;
  const out = {};
  // Typography
  if (styleObj.typography) {
    if (styleObj.typography.fontSize) out.fontSize = styleObj.typography.fontSize;
    if (styleObj.typography.fontStyle) out.fontStyle = styleObj.typography.fontStyle;
    if (styleObj.typography.fontWeight) out.fontWeight = styleObj.typography.fontWeight;
    if (styleObj.typography.textDecoration) out.textDecoration = styleObj.typography.textDecoration;
    if (styleObj.typography.letterSpacing) out.letterSpacing = styleObj.typography.letterSpacing;
    if (styleObj.typography.lineHeight) out.lineHeight = styleObj.typography.lineHeight;
  }
  // Color (rare on LI, but keep)
  if (styleObj.color) {
    if (styleObj.color.text) out.color = styleObj.color.text;
    if (styleObj.color.background) out.backgroundColor = styleObj.color.background;
  }
  return Object.keys(out).length ? out : undefined;
};

const mergeClasses = (...lists) => {
  const set = new Set();
  lists.filter(Boolean).join(' ').split(/\s+/).forEach(c => c && set.add(c));
  return Array.from(set).join(' ');
};

const renderItems = (items = [], level = 0) => {
  const isRoot = level === 0;
  const ulClass = isRoot ? 'navbar-nav' : 'dropdown-menu';
  // (kept same value; mergeClasses kept for future if needed)
  return (
    <ul className={ ulClass }>
      { items.map((item, idx) => {
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const isText = item.type === 'text' && !hasChildren;

        // li classes
        const liBase = isRoot
          ? (hasChildren ? 'nav-item dropdown' : (isText ? '' : 'nav-item'))
          : (hasChildren ? 'dropdown-submenu dropend' : '');
        const wpPresetClasses = mergeClasses(
          item.textColorSlug ? `has-${item.textColorSlug}-color has-text-color` : '',
          item.fontSizeSlug ? `has-${item.fontSizeSlug}-font-size` : '',
          item.linkColorSlug ? 'has-link-color' : ''
        );
        const liClass = mergeClasses(liBase, item.liClass, wpPresetClasses);

        // link / text classes
        const linkBase = isRoot
          ? (hasChildren ? 'nav-link dropdown-toggle' : 'nav-link')
          : (hasChildren ? 'dropdown-item dropdown-toggle' : 'dropdown-item');
        const linkClass = mergeClasses(linkBase, item.aClass);

        const liStyle = liStyleFromGutenberg(item.liStyle);
        const aStyle = styleStringToObject(item.aStyle);

        // When it's a pure text item (no url, no children) use navbar-text / dropdown-item-text
        if (isText) {
          if (isRoot) {
            return (
              <li className={ liClass } style={ liStyle } key={ idx }>
                <span className="navbar-text">{ item.raw ? <RawHTML>{ item.raw }</RawHTML> : (item.label || '') }</span>
              </li>
            );
          }
          // in submenus
          return (
            <li className={ liClass } style={ liStyle } key={ idx }>
              <span className="dropdown-item-text">{ item.raw ? <RawHTML>{ item.raw }</RawHTML> : (item.label || '') }</span>
            </li>
          );
        }

        const linkProps = {
          className: linkClass,
          href: item.url || '#',
        };
        if (hasChildren) {
          linkProps['data-bs-toggle'] = 'dropdown';
          linkProps['role'] = 'button';
          linkProps['aria-expanded'] = 'false';
        }

        return (
          <li className={ liClass } style={ liStyle } key={ idx }>
            <a { ...linkProps } style={ aStyle }>
              { item.labelHtml ? <RawHTML>{ item.labelHtml }</RawHTML> : (item.label || '') }
            </a>
            { hasChildren ? renderItems(item.children, level + 1) : null }
          </li>
        );
      }) }
    </ul>
  );
};

export default function save( { attributes } ) {
  const {
    menuHtml, menuJson, navStyle, navShow, navPosition, alignItems, container, brandText, targetId
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
          { (menuJson && menuJson !== '[]')
            ? renderItems(JSON.parse(menuJson), 0)
            : (menuHtml ? <RawHTML>{ menuHtml }</RawHTML> : <ul className="navbar-nav"></ul>) }
        </div>
      </div>
    </nav>
  );
}