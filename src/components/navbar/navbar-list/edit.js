import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls, InnerBlocks, useBlockProps, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, Notice, Button, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useSelect, useDispatch, select as dataSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { serialize } from '@wordpress/blocks';
import { check, edit as editIcon, code as codeIcon } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element';
import { stripWPBlockComments, listBlockToJson, jsonToListTemplate, renderPreviewItems, createBlocksFromInnerBlocksTemplate } from './menu-helpers';
import { useSiteBrandSources, useSyncBrandFromSite, brandImgAlt } from './brand-helpers';

const LIST_TEMPLATE = [
  [ 'core/list', {}, [
    [ 'core/list-item', { content: 'Home' } ],
    [ 'core/list-item', { content: 'Features' } ],
    [ 'core/list-item', { content: 'Pricing' } ],
    [ 'core/list-item', { content: 'Dropdown link' }, [
      [ 'core/list', {}, [
        [ 'core/list-item', { content: 'Action' } ],
        [ 'core/list-item', { content: 'Another action' } ],
        [ 'core/list-item', { content: 'Something else here' } ],
      ] ]
    ] ],
  ] ]
];

const ALLOWED = [ 'core/list' ];

export default function Edit( { attributes, setAttributes, clientId } ) {
  const {
    menuHtml, menuJson, isEditingMenu,
    navStyle, navShow, navPosition, alignItems,
    container, brandText, targetId
  } = attributes;

  const blockProps = useBlockProps();

  // Helper to generate a unique, user-friendly target ID
  const genTargetId = () => `ek-nav-${ clientId.slice(0,8) }-${ Math.random().toString(36).slice(2,6) }`;

  // Brand helpers: site meta/logo, sync, and alt
  const brandSources = useSiteBrandSources();
  useSyncBrandFromSite(attributes, setAttributes, brandSources);
  const { siteTitle } = brandSources;

  // Ensure a default, unique targetId (supports multiple navbars on same page)
  useEffect(() => {
    if ( !attributes.targetId || attributes.targetId.trim() === '' ) {
      setAttributes({ targetId: genTargetId() });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showJsonPreview, setShowJsonPreview] = useState(false);

  // Obtener los innerBlocks para poder serializar la lista cuando el usuario da "Guardar menú".
  const { getBlocks } = useSelect( ( select ) => {
    const editor = select( blockEditorStore );
    return {
      getBlocks: () => editor.getBlocks( clientId ),
    };
  }, [ clientId ] );

  const { replaceInnerBlocks } = useDispatch( blockEditorStore );

  const handleSaveMenu = () => {
    const children = getBlocks();
    const listBlock = children.find( ( b ) => b.name === 'core/list' );

    let itemsJson = [];
    if ( listBlock ) {
      itemsJson = listBlockToJson( listBlock );
    } else {
      // fallback: serialize HTML and parse first <ul> to plain list-items (best-effort)
      const htmlAll = serialize( children );
      const ulMatch = htmlAll.match( /<ul[\s\S]*<\/ul>/ );
      const ul = ulMatch ? stripWPBlockComments(ulMatch[0]) : '';
      // very simple fallback: each <li> becomes {label,text}
      if (ul) {
        const tmp = document.createElement('div');
        tmp.innerHTML = ul;
        const lis = Array.from(tmp.querySelectorAll(':scope > ul > li'));
        itemsJson = lis.map(li => {
          const a = li.querySelector('a');
          const label = a ? a.textContent.trim() : li.textContent.trim();
          const url = a ? (a.getAttribute('href') || '') : '';
          const rel = a ? (a.getAttribute('rel') || '') : '';
          const target = a ? (a.getAttribute('target') || '') : '';
          const subLis = Array.from(li.querySelectorAll(':scope > ul > li'));
          const children = subLis.map(sub => {
            const a2 = sub.querySelector('a');
            return {
              label: a2 ? a2.textContent.trim() : sub.textContent.trim(),
              url: a2 ? (a2.getAttribute('href') || '') : '',
            };
          });
          const node = { label, url, rel, target };
          if (children.length) node.children = children;
          return node;
        });
      }
    }

    // derive clean UL HTML (fallback) and store JSON
    const toHtml = (nodes = [], level = 0) => {
      const ulClass = level === 0 ? 'navbar-nav' : '';
      const liHtml = nodes.map((n) => {
        const text = n.label || '';
        const link = n.url ? `<a href="${n.url}">${text}</a>` : text;
        const children = n.children && n.children.length ? toHtml(n.children, level + 1) : '';
        return `<li>${link}${children}</li>`;
      }).join('');
      return `<ul${ulClass ? ` class="${ulClass}"` : ''}>${liHtml}</ul>`;
    };
    const htmlClean = toHtml(itemsJson);

    setAttributes({
      menuJson: JSON.stringify(itemsJson),
      menuHtml: htmlClean,
      isEditingMenu: false,
    });

    // Clear inner blocks to avoid confusion in preview mode.
    replaceInnerBlocks( clientId, [], false );
  };

  const handleEditMenu = () => {
    setAttributes( { isEditingMenu: true } );
    try {
      const items = JSON.parse(menuJson || '[]');
      const template = jsonToListTemplate(items);
      const blocks = createBlocksFromInnerBlocksTemplate( template );
      replaceInnerBlocks( clientId, blocks, false );
    } catch(e) {
      // eslint-disable-next-line no-console
      console.error('Error parsing menuJson:', e);
      // Si el JSON es inválido, notifica al usuario y carga la plantilla por defecto.
      const defaultBlocks = createBlocksFromInnerBlocksTemplate( LIST_TEMPLATE );
      replaceInnerBlocks( clientId, defaultBlocks, false );
      // Opcional: notificar al usuario en la UI.
      // wp.data.dispatch('core/notices').createNotice('error', __('El JSON del menú es inválido y no se pudo cargar.', 'ekiline-block-collection'), {
      //   isDismissible: true,
      // });
    }
  };

  return (
    <div { ...blockProps }>
      {/* Barra superior con acciones de menú */}
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon={ editIcon }
            label={ __('Edit navigation', 'ekiline-block-collection') }
            onClick={ handleEditMenu }
            disabled={ isEditingMenu }
            showTooltip
          />
          <ToolbarButton
            icon={ check }
            label={ __('Save menu', 'ekiline-block-collection') }
            onClick={ handleSaveMenu }
            disabled={ !isEditingMenu }
            showTooltip
          />
          <ToolbarButton
            icon={ codeIcon }
            label={ __('Toggle JSON preview', 'ekiline-block-collection') }
            onClick={ () => setShowJsonPreview( (v) => !v ) }
            isPressed={ showJsonPreview }
            showTooltip
          />
        </ToolbarGroup>
      </BlockControls>

      <InspectorControls>
        <PanelBody title={ __( 'Behavior', 'ekiline-block-collection' ) } initialOpen={ true }>
          <SelectControl
            label={__('Style', 'ekiline-block-collection')}
            value={ navStyle }
            options={[
              { label: __('Collapsible', 'ekiline-block-collection'), value: 'collapse' },
              { label: __('Offcanvas', 'ekiline-block-collection'), value: 'offcanvas' },
            ]}
            onChange={ (v)=> setAttributes({ navStyle: v }) }
          />
          <SelectControl
            label={__('Breakpoint', 'ekiline-block-collection')}
            value={ navShow }
            options={[
              { label: __('Expand on large screens (lg)', 'ekiline-block-collection'), value: ' navbar-expand-lg' },
              { label: __('Expand on medium screens (md)', 'ekiline-block-collection'), value: ' navbar-expand-md' },
              { label: __('Expand on small screens (sm)', 'ekiline-block-collection'), value: ' navbar-expand-sm' },
              { label: __('Always collapsed', 'ekiline-block-collection'), value: '' },
            ]}
            onChange={ (v)=> setAttributes({ navShow: v }) }
          />
          <SelectControl
            label={__('Align nav items', 'ekiline-block-collection')}
            value={alignItems}
            options={[
              { label: __('Start (default)', 'ekiline-block-collection'), value: '' },
              { label: __('Center', 'ekiline-block-collection'), value: ' justify-content-center' },
              { label: __('End', 'ekiline-block-collection'), value: ' justify-content-end' }
            ]}
            onChange={(v) => setAttributes({ alignItems: v })}
          />
          <SelectControl
            label={__('Position', 'ekiline-block-collection')}
            value={ navPosition }
            options={[
              { label: __('Default', 'ekiline-block-collection'), value: '' },
              { label: __('Fixed top', 'ekiline-block-collection'), value: ' fixed-top' },
              { label: __('Fixed bottom', 'ekiline-block-collection'), value: ' fixed-bottom' },
              { label: __('Sticky top', 'ekiline-block-collection'), value: ' sticky-top' },
            ]}
            onChange={ (v)=> setAttributes({ navPosition: v }) }
          />
          <SelectControl
            label={__('Container', 'ekiline-block-collection')}
            value={ container }
            options={[
              { label: __('Fluid (full-width)', 'ekiline-block-collection'), value: 'container-fluid' },
              { label: __('Fixed-width', 'ekiline-block-collection'), value: 'container' },
              { label: __('No container', 'ekiline-block-collection'), value: '' },
            ]}
            onChange={ (v)=> setAttributes({ container: v }) }
          />
          <TextControl
            label={__('Brand text', 'ekiline-block-collection')}
            value={ brandText }
            onChange={ (v)=> setAttributes({ brandText: v }) }
          />
          <SelectControl
            label={__('Brand mode', 'ekiline-block-collection')}
            value={ attributes.brandMode || 'text' }
            options={[
              { label: __('Hidden', 'ekiline-block-collection'), value: 'none' },
              { label: __('Text only', 'ekiline-block-collection'), value: 'text' },
              { label: __('Logo only', 'ekiline-block-collection'), value: 'logo' },
              { label: __('Logo + Text', 'ekiline-block-collection'), value: 'both' },
            ]}
            onChange={ (v)=> setAttributes({ brandMode: v }) }
            help={ __('Logo uses site logo (requires theme support). Text uses the Brand text field.', 'ekiline-block-collection') }
          />
          { (attributes.brandMode === 'logo' || attributes.brandMode === 'both') && (
            <>
                  <SelectControl
                    label={ __('Logo source', 'ekiline-block-collection') }
                    value={ attributes.brandLogoMode || 'auto' }
                    options={[
                      { label: __('Auto (site logo)', 'ekiline-block-collection'), value: 'auto' },
                      { label: __('Custom (media library)', 'ekiline-block-collection'), value: 'custom' },
                    ]}
                    onChange={ (v) => {
                      setAttributes({ brandLogoMode: v });
                    } }
                  />
              { (attributes.brandLogoMode === 'custom') && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <MediaUpload
                    onSelect={ (media) => {
                      const url = media?.sizes?.medium?.url || media?.sizes?.full?.url || media?.url || '';
                      const w = media?.sizes?.medium?.width || media?.media_details?.width || 0;
                      const h = media?.sizes?.medium?.height || media?.media_details?.height || 0;
                      setAttributes({
                        brandLogoId: media?.id || 0,
                        brandLogoUrl: url,
                        brandLogoWidth: w,
                        brandLogoHeight: h,
                        brandLogoAlt: media?.alt || media?.title || ''
                      });
                    } }
                    allowedTypes={ ['image'] }
                    value={ attributes.brandLogoId || 0 }
                    render={ ({ open }) => (
                      <Button variant="secondary" onClick={ open }>
                        { attributes.brandLogoUrl ? __('Replace image', 'ekiline-block-collection') : __('Select image', 'ekiline-block-collection') }
                      </Button>
                    ) }
                  />
                  { attributes.brandLogoUrl && (
                    <span style={{ fontSize: 12, opacity: .7, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180 }}>
                      { attributes.brandLogoUrl }
                    </span>
                  ) }
                </div>
              ) }
              <div style={{ display: 'flex', gap: 8 }}>
                <TextControl
                  label={ __('Logo width (px)', 'ekiline-block-collection') }
                  type="number"
                  min={ 0 }
                  value={ attributes.brandLogoWidth === 0 ? '' : attributes.brandLogoWidth }
                  onChange={ (v)=> {
                    if (v === '' || v === null || typeof v === 'undefined') {
                      setAttributes({ brandLogoWidth: 0 }); // 0 => omit width attr (natural proportions)
                    } else {
                      const n = parseInt(v, 10);
                      setAttributes({ brandLogoWidth: isNaN(n) ? 0 : Math.max(0, n) });
                    }
                  } }
                  placeholder={ __('auto', 'ekiline-block-collection') }
                />
                <TextControl
                  label={ __('Logo height (px)', 'ekiline-block-collection') }
                  type="number"
                  min={ 0 }
                  value={ attributes.brandLogoHeight === 0 ? '' : attributes.brandLogoHeight }
                  onChange={ (v)=> {
                    if (v === '' || v === null || typeof v === 'undefined') {
                      setAttributes({ brandLogoHeight: 0 }); // 0 => omit height attr (natural proportions)
                    } else {
                      const n = parseInt(v, 10);
                      setAttributes({ brandLogoHeight: isNaN(n) ? 0 : Math.max(0, n) });
                    }
                  } }
                  placeholder={ __('auto', 'ekiline-block-collection') }
                />
              </div>
              <TextControl
                label={ __('Logo alt text', 'ekiline-block-collection') }
                value={ attributes.brandLogoAlt || '' }
                onChange={ (v)=> setAttributes({ brandLogoAlt: v }) }
                help={ __('Used for accessibility. If empty, site title will be used.', 'ekiline-block-collection') }
              />
              <SelectControl
                label={ __('Link logo to Home', 'ekiline-block-collection') }
                value={ attributes.brandLogoLinkHome ? 'yes' : 'no' }
                options={[
                  { label: __('Yes', 'ekiline-block-collection'), value: 'yes' },
                  { label: __('No', 'ekiline-block-collection'), value: 'no' },
                ]}
                onChange={ (v)=> setAttributes({ brandLogoLinkHome: v === 'yes' }) }
              />
            </>
          ) }
          <SelectControl
            label={__('Tagline', 'ekiline-block-collection')}
            value={ attributes.showTagline ? 'show' : 'hide' }
            options={[
              { label: __('Hide', 'ekiline-block-collection'), value: 'hide' },
              { label: __('Show (site tagline)', 'ekiline-block-collection'), value: 'show' },
            ]}
            onChange={ (v)=> {
              const show = v === 'show';
              setAttributes({ showTagline: show });
              // If turning on and we don't have a cached tagline, fetch it once.
              if ( show && !attributes.taglineText ) {
                const site = dataSelect('core').getEntityRecord('root','site');
                const tagline = site?.description || '';
                if (tagline) setAttributes({ taglineText: tagline });
              }
            } }
            help={ __('Shows the WordPress site tagline next to the brand.', 'ekiline-block-collection') }
          />
          { attributes.showTagline && (
            <>
              <TextControl
                label={ __('Custom tagline (override)', 'ekiline-block-collection') }
                value={ attributes.taglineText || '' }
                onChange={ (v) => setAttributes({ taglineText: (v || '').toString() }) }
                help={ __('This only affects this navbar block. It does not change the site tagline.', 'ekiline-block-collection') }
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <Button
                  variant="secondary"
                  onClick={ () => {
                    const site = dataSelect('core').getEntityRecord('root','site');
                    const tagline = site?.description || '';
                    setAttributes({ taglineText: tagline });
                  } }
                >
                  { __('Reset to site tagline', 'ekiline-block-collection') }
                </Button>
              </div>
            </>
          ) }
          <TextControl
            label={__('Target ID (for collapse/offcanvas)', 'ekiline-block-collection')}
            value={ targetId }
            onChange={ (v)=> {
              const raw = (v ?? '').toString();
              const trimmed = raw.trim();
              if (!trimmed) {
                // If user clears the field, immediately regenerate a fresh unique id
                setAttributes({ targetId: genTargetId() });
                return;
              }
              // Sanitize: allow letters, numbers, underscore and hyphen only
              const sanitized = trimmed.replace(/[^A-Za-z0-9_-]/g, '');
              setAttributes({ targetId: sanitized });
            } }
            help={__('Must be unique. Leave empty to auto-generate.', 'ekiline-block-collection')}
          />
        </PanelBody>
        <PanelBody title={ __( 'Status', 'ekiline-block-collection' ) } initialOpen={ false }>
          <Notice status="info" isDismissible={ false }>
            { isEditingMenu
              ? __('Editing mode: Use the List block to build your menu, then click "Save menu".', 'ekiline-block-collection')
              : __('Preview mode: This is how your navigation will look. Use the toolbar to edit again.', 'ekiline-block-collection')
            }
          </Notice>
        </PanelBody>
      </InspectorControls>

      { isEditingMenu ? (
        <>
          <p><strong>1)</strong> Crea/edita tu menú con <em>Lista</em>. Puedes anidar sublistas para dropdowns.</p>
          <p><strong>2)</strong> Para aplicar estilos (color, tamaño de fuente, etc.), selecciónalos en cada elemento de la lista desde los controles de bloque de la derecha.</p>
          <hr className="wp-block-separator"/>
          <InnerBlocks
            allowedBlocks={ ALLOWED }
            templateLock={ false }
            template={ LIST_TEMPLATE }
          />
          <hr className="wp-block-separator"/>
          <Button variant="primary" onClick={ handleSaveMenu }>
            {__('Save menu', 'ekiline-block-collection')}
          </Button>
        </>
      ) : (
        <>
          <div className="ekiline-navbar-preview-wrapper">
            <div style={{ fontSize: 12, opacity: .65, marginTop: 6 }}>
              {__('(Preview disabled: Clicks are blocked. Use the toolbar icon to edit the navigation.)', 'ekiline-block-collection')}
            </div>
            <nav className={`navbar${navPosition || ''}${navShow || ''} bg-body-tertiary`} style={{ opacity: 0.95 }}>
              <div className={ container || 'container-fluid' }>
                { ( (attributes.brandMode !== 'none') && ( (attributes.brandMode === 'logo') || brandText ) ) && (
                  <div className="navbar-brand">
                    {/* Logo rendering */}
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
                                style={{ verticalAlign:'middle', marginRight: brandText ? 8 : 0 }}
                              />
                            );
                            return attributes.brandLogoLinkHome && (attributes.brandHomeUrl)
                              ? <a href={ attributes.brandHomeUrl } onClick={(e)=>e.preventDefault()}>{ img }</a>
                              : img;
                          })()
                        : <span className="site-logo-placeholder" style={{display:'inline-block', width: 28, height: 28, borderRadius: '50%', background: '#ccc', verticalAlign:'middle', marginRight: brandText ? 8 : 0}} aria-hidden="true"></span>
                    ) }
                    { (attributes.brandMode === 'text' || attributes.brandMode === 'both') && brandText ? <span>{ brandText }</span> : null }
                    { attributes.showTagline && attributes.taglineText ? <span className="navbar-text ms-2">{ attributes.taglineText }</span> : null }
                  </div>
                ) }
                <button className="navbar-toggler" type="button" aria-label="Toggle navigation" aria-expanded="false">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className={ navStyle === 'offcanvas' ? 'offcanvas offcanvas-end show' : 'collapse navbar-collapse show' }>
                  { (menuJson && menuJson !== '[]')
                    ? renderPreviewItems(JSON.parse(menuJson), 0)
                    : <ul className="navbar-nav"></ul> }
                </div>
              </div>
            </nav>
          </div>
          { showJsonPreview && (
            <>
              <p style={{opacity:.7, marginBottom:'8px'}}>
                {__('Showing saved menu data.', 'ekiline-block-collection')}
              </p>
              <div style={{border:'1px dashed #ccc', padding:'8px', borderRadius:'8px', maxHeight: 220, overflow: 'auto' }}>
                <pre style={{whiteSpace:'pre-wrap', margin:0}}>
                  { (menuJson && menuJson !== '[]') ? menuJson : `(${__('No menu saved yet', 'ekiline-block-collection')})` }
                </pre>
              </div>
            </>
          ) }
        </>
      ) }
    </div>
  );
}