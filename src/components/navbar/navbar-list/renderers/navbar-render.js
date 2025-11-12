// renderers/navbar-render.js
import { RawHTML } from '@wordpress/element';
import { renderMenuItemsPreview, renderMenuItemsSave } from './list-render';
import { shouldAddBgTertiary } from '../utils/class-utils';
import { brandImgAlt } from '../brand-helpers';

const ContainerWrapper = ({ className, children }) =>
  className ? <div className={ className }>{ children }</div> : <>{ children }</>;

/**
 * Render completo del <nav> (brand, toggler, container, menu)
 * mode: 'preview' | 'save'
 * ui: { preventClicks?: boolean, forceShowCollapse?: boolean }
 * brandSources: { siteTitle?: string } opcional (solo para alt fallback)
 */
export const renderNavbar = ({
  attributes,
  blockProps,
  mode = 'save',
  ui = {},
  brandSources = {}
}) => {
  const {
    menuHtml, menuJson,
    navStyle, navShow, navPosition, alignItems,
    container, brandText, targetId
  } = attributes;

  const addBgTertiary = shouldAddBgTertiary(blockProps);
  const mergedClassName = [
    blockProps?.className,
    'navbar',
    navPosition || '',
    navShow || '',
    (mode === 'save' ? (alignItems || '') : ''), // alignItems va en wrapper del menú; en preview se añade show abajo
    addBgTertiary ? 'bg-body-tertiary' : '',
  ].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  const mergedStyle = blockProps?.style || undefined;

  const wrapperCls     = container || '';
  const baseMenuCls    = navStyle === 'offcanvas' ? 'offcanvas offcanvas-end' : 'collapse navbar-collapse';
  const menuWrapperCls = baseMenuCls
    + ( (mode === 'preview' || ui.forceShowCollapse) && navStyle !== 'offcanvas' ? ' show' : '' )
    + (alignItems || '');

  // Brand section
  const showBrand = (attributes.brandMode !== 'none') && ( (attributes.brandMode === 'logo') || brandText );
  const siteTitle = brandSources?.siteTitle || '';

  const renderBrand = () => {
    if (!showBrand) return null;
    return (
      <div className="navbar-brand">
        { (attributes.brandMode === 'logo' || attributes.brandMode === 'both') && (
          attributes.brandLogoUrl
            ? (() => {
                const img = (
                  <img
                    src={ attributes.brandLogoUrl }
                    width={ attributes.brandLogoWidth || undefined }
                    height={ attributes.brandLogoHeight || undefined }
                    alt={ brandImgAlt(attributes, siteTitle) }
                    className="d-inline-block align-text-top"
                    style={ mode === 'preview' ? { verticalAlign:'middle', marginRight: brandText ? 8 : 0 } : undefined }
                  />
                );
                if (attributes.brandLogoLinkHome && attributes.brandHomeUrl) {
                  return (
                    <a
                      href={ attributes.brandHomeUrl }
                      onClick={ ui.preventClicks ? (e)=>e.preventDefault() : undefined }
                    >
                      { img }
                    </a>
                  );
                }
                return img;
              })()
            : <span
                className="site-logo-placeholder"
                aria-hidden="true"
                style={ mode === 'preview' ? {display:'inline-block', width: 28, height: 28, borderRadius: '50%', background: '#ccc', verticalAlign:'middle', marginRight: brandText ? 8 : 0} : undefined }
              />
        ) }
        { (attributes.brandMode === 'text' || attributes.brandMode === 'both') && brandText ? <span>{ brandText }</span> : null }
        { attributes.showTagline && attributes.taglineText ? <span className="navbar-text ms-2">{ attributes.taglineText }</span> : null }
      </div>
    );
  };

  // Menu content
  const renderMenu = () => {
    if (menuJson && menuJson !== '[]') {
      const items = JSON.parse(menuJson);
      return mode === 'preview'
        ? renderMenuItemsPreview(items)
        : renderMenuItemsSave(items);
    }
    // fallback HTML limpio si existe
    if (menuHtml) {
      return <RawHTML>{ menuHtml }</RawHTML>;
    }
    return <ul className="navbar-nav"></ul>;
  };

  // Target id
  const safeTargetId = targetId || 'ek-nav';

  return (
    <nav { ...blockProps } className={ mergedClassName } style={ mergedStyle }>
      <ContainerWrapper className={ wrapperCls }>
        { renderBrand() }

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded="false"
          data-bs-toggle={ navStyle === 'offcanvas' ? 'offcanvas' : 'collapse' }
          data-bs-target={ `#${ safeTargetId }` }
          aria-controls={ safeTargetId }
          onClick={ ui.preventClicks ? (e)=>e.preventDefault() : undefined }
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id={ safeTargetId } className={ menuWrapperCls }>
          { renderMenu() }
        </div>
      </ContainerWrapper>
    </nav>
  );
};
