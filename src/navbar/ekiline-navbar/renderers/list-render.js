// renderers/list-render.js
import { RawHTML } from '@wordpress/element';
import { mergeClasses, styleStringToObject, liStyleFromGutenberg } from '../utils/class-utils';

/**
 * Render compartido del UL/LI para Bootstrap.
 * mode: 'preview' (clics deshabilitados) | 'save' (markup final)
 */
export const renderMenuItems = (items = [], level = 0, mode = 'save') => {
  const isRoot = level === 0;
  const ulClass = isRoot ? 'navbar-nav' : 'dropdown-menu';

  const ulProps = (mode === 'preview')
    ? {
        onClick: (e) => { e.preventDefault(); e.stopPropagation(); },
        onMouseDown: (e) => { e.preventDefault(); e.stopPropagation(); },
        onKeyDown: (e) => { e.preventDefault(); e.stopPropagation(); },
        role: 'presentation'
      }
    : {};

  return (
    <ul className={ ulClass } { ...ulProps }>
      { items.map((item, idx) => {
        // Back-compat: normaliza strings -> arrays
        if (!Array.isArray(item.liClasses) && item.liClass) {
          item.liClasses = item.liClass.split(/\s+/).filter(Boolean);
        }
        if (!Array.isArray(item.aClasses) && item.aClass) {
          item.aClasses = item.aClass.split(/\s+/).filter(Boolean);
        }

        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const isText = item.type === 'text' && !hasChildren;

        // LI classes
        const liBase = isRoot
          ? (hasChildren ? 'nav-item dropdown' : (isText ? '' : 'nav-item'))
          : (hasChildren ? 'dropdown-submenu dropend' : '');

        const wpPresetClasses = mergeClasses(
          item.textColorSlug ? `has-${item.textColorSlug}-color has-text-color` : '',
          item.fontSizeSlug  ? `has-${item.fontSizeSlug}-font-size` : '',
          item.linkColorSlug ? 'has-link-color' : ''
        );

        const liClass = mergeClasses(liBase, item.liClasses, wpPresetClasses);

        // A/link classes
        const linkBase = isRoot
          ? (hasChildren ? 'nav-link dropdown-toggle' : 'nav-link')
          : (hasChildren ? 'dropdown-item dropdown-toggle' : 'dropdown-item');
        const linkClass = mergeClasses(linkBase, item.aClasses);

        const liStyle = liStyleFromGutenberg(item.liStyle);
        const aStyle  = styleStringToObject(item.aStyle);

        // Texto puro (sin url y sin hijos)
        if (isText) {
          if (isRoot) {
            return (
              <li className={ liClass } style={ liStyle } key={ idx }>
                <span className="nav-link navbar-text">
                  { item.raw ? <RawHTML>{ item.raw }</RawHTML> : (item.label || '') }
                </span>
              </li>
            );
          }
          return (
            <li className={ liClass } style={ liStyle } key={ idx }>
              <span className="dropdown-item-text">
                { item.raw ? <RawHTML>{ item.raw }</RawHTML> : (item.label || '') }
              </span>
            </li>
          );
        }

        // Link
        const linkProps = {
          className: linkClass,
          href: item.url || '#',
          rel: item.rel || undefined,
          target: item.target || undefined,
          style: aStyle
        };
        if (hasChildren) {
          linkProps['data-bs-toggle'] = 'dropdown';
          linkProps['role'] = 'button';
          linkProps['aria-expanded'] = 'false';
        }

        // Prepare inner HTML for anchor (avoid RawHTML wrapper)
        const innerHtml = (item.labelHtml && item.labelHtml.trim())
          ? item.labelHtml
          : (item.raw && item.raw.trim() ? item.raw : '');

        return (
          <li className={ liClass } style={ liStyle } key={ idx }>
            { innerHtml
              ? <a { ...linkProps } dangerouslySetInnerHTML={{ __html: innerHtml }} />
              : <a { ...linkProps }>{ item.label || '' }</a>
            }
            { hasChildren ? renderMenuItems(item.children, level + 1, mode) : null }
          </li>
        );
      }) }
    </ul>
  );
};

// Atajos convenientes
export const renderMenuItemsPreview = (items) => renderMenuItems(items, 0, 'preview');
export const renderMenuItemsSave    = (items) => renderMenuItems(items, 0, 'save');