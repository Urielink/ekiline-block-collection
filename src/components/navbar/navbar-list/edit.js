import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, Notice, Button, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { serialize, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { check, edit as editIcon } from '@wordpress/icons';

// Helpers: remove Gutenberg block comments and ensure UL has a class
const stripWPBlockComments = (html) => html
  ? html.replace(/<!--\s*\/?wp:[\s\S]*?-->/g, '').trim()
  : '';

// Helper to normalize class string to array of unique classes
const classStringToArray = (cls) => {
  if (!cls) return [];
  return Array.from(new Set(cls.split(/\s+/).filter(Boolean)));
};

// ---- List <-> JSON mappers ----
const htmlToTextAndUrl = (html) => {
  if (!html) return { label: '', url: '' };
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const a = tmp.querySelector('a');
  if (a) {
    return { label: a.textContent.trim(), url: a.getAttribute('href') || '' };
  }
  return { label: tmp.textContent.trim(), url: '' };
};

const extractLinkDetails = (html) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html || '';
  const a = tmp.querySelector('a');
  if (!a) return { href: '', aClasses: [], aStyle: '', inner: '' };
  const href = a.getAttribute('href') || '';
  const aClass = a.getAttribute('class') || '';
  const aClasses = classStringToArray(aClass);
  const aStyle = a.getAttribute('style') || '';
  const inner = a.innerHTML || '';
  return { href, aClasses, aStyle, inner };
};

const parseListItemBlock = (liBlock) => {
  const raw = liBlock?.attributes?.content || '';
  const { label, url } = htmlToTextAndUrl(raw);
  const { href, aClasses, aStyle, inner } = extractLinkDetails(raw);
  const type = (url || href) ? 'link' : 'text';
  const liClass = liBlock?.attributes?.className || '';
  const liClasses = classStringToArray(liClass);
  // Gutenberg 'style' attribute is an object; keep it to render later
  const liStyleObj = liBlock?.attributes?.style || null;
  const subList = (liBlock?.innerBlocks || []).find((b) => b.name === 'core/list');
  const children = subList ? (subList.innerBlocks || []).filter(b => b.name === 'core/list-item').map(parseListItemBlock) : [];

  const textColorSlug = liBlock?.attributes?.textColor || '';
  const fontSizeSlug = liBlock?.attributes?.fontSize || '';
  // Helper to extract preset slug from WP preset CSS var
  const linkColorVar = liStyleObj?.elements?.link?.color?.text || '';
  const presetVarToSlug = (val) => {
    if (!val || typeof val !== 'string') return '';
    return (val.match(/var:preset\|(?:color|font-size)\|([^|\s]+)/) || [])[1] || '';
  };
  const linkColorSlug = presetVarToSlug(linkColorVar) || '';

  const node = {
    type,
    label,
    url: url || href || '',
    raw,
    liClasses,
    liStyle: liStyleObj, // stored as object; we will translate in save()
    aClasses,
    aStyle,
    labelHtml: inner, // link inner HTML (e.g., <strong>…</strong>)
    textColorSlug,
    fontSizeSlug,
    linkColorSlug,
  };
  if (children.length) node.children = children;
  return node;
};

const listBlockToJson = (listBlock) => {
  if (!listBlock) return [];
  return (listBlock.innerBlocks || [])
    .filter((b) => b.name === 'core/list-item')
    .map(parseListItemBlock);
};

// Helper to convert slug to WP preset var for rehydration
const slugToPresetVar = (slug) => slug ? `var:preset|color|${slug}` : '';

// JSON -> InnerBlocks template for re-edition (restores styles/classes)
const jsonToListTemplate = (items = []) => {
  const liToTemplate = (item) => {
    // Build list item block attributes
    const liAttrs = {};
    // classes (from array)
    if (item.liClasses && item.liClasses.length) {
      liAttrs.className = item.liClasses.join(' ');
    }
    // restore WP preset attributes
    if (item.textColorSlug) {
      liAttrs.textColor = item.textColorSlug;
    }
    if (item.fontSizeSlug) {
      liAttrs.fontSize = item.fontSizeSlug;
    }
    // merge style from saved liStyle (object) with link color preset if present
    const styleObj = item.liStyle ? { ...item.liStyle } : {};
    if (!styleObj.elements) styleObj.elements = {};
    if (!styleObj.elements.link) styleObj.elements.link = {};
    if (!styleObj.elements.link.color) styleObj.elements.link.color = {};
    if (item.linkColorSlug) {
      styleObj.elements.link.color.text = slugToPresetVar(item.linkColorSlug);
    }
    // Only assign if there is something meaningful
    if (JSON.stringify(styleObj) !== JSON.stringify({ elements: { link: { color: {} } } })) {
      liAttrs.style = styleObj;
    }

    // Anchor classes/styles
    const anchorClassAttr = (item.aClasses && item.aClasses.length)
      ? ` class="${ item.aClasses.join(' ') }"`
      : '';
    const anchorStyleAttr = (item.aStyle && item.aStyle.trim())
      ? ` style="${ item.aStyle.replace(/"/g, '&quot;') }"`
      : '';

    // Content: prefer raw/labelHtml to preserve formatting (strong/em/spans)
    let content;
    if (item.url) {
      const inner = (item.labelHtml && item.labelHtml.trim())
        ? item.labelHtml
        : (item.raw && item.raw.trim())
          ? item.raw
          : (item.label || '');
      content = `<a href="${ item.url }"${ anchorClassAttr }${ anchorStyleAttr }>${ inner }</a>`;
    } else {
      // text item without URL
      if (item.raw && item.raw.trim()) {
        content = item.raw;
      } else if (item.labelHtml && item.labelHtml.trim()) {
        content = item.labelHtml;
      } else {
        content = (item.label || '');
      }
    }

    const children = (item.children && item.children.length)
      ? [[ 'core/list', {}, item.children.map(liToTemplate) ]]
      : [];

    return [ 'core/list-item', { ...liAttrs, content }, children ];
  };

  return [ [ 'core/list', {}, items.map(liToTemplate) ] ];
};

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
          const subLis = Array.from(li.querySelectorAll(':scope > ul > li'));
          const children = subLis.map(sub => {
            const a2 = sub.querySelector('a');
            return {
              label: a2 ? a2.textContent.trim() : sub.textContent.trim(),
              url: a2 ? (a2.getAttribute('href') || '') : '',
            };
          });
          const node = { label, url };
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
          <TextControl
            label={__('Target ID (for collapse/offcanvas)', 'ekiline-block-collection')}
            value={ targetId }
            onChange={ (v)=> setAttributes({ targetId: v }) }
            help={__('Must be a unique ID on the page.', 'ekiline-block-collection')}
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
          <p style={{opacity:.7, marginBottom:'8px'}}>
            {__('Preview of the saved menu data. Use the toolbar icon to edit the navigation.', 'ekiline-block-collection')}
          </p>
          <div style={{border:'1px dashed #ccc', padding:'8px', borderRadius:'8px', maxHeight: 220, overflow: 'auto' }}>
            <pre style={{whiteSpace:'pre-wrap', margin:0}}>
              { (menuJson && menuJson !== '[]') ? menuJson : `(${__('No menu saved yet', 'ekiline-block-collection')})` }
            </pre>
          </div>
        </>
      ) }
    </div>
  );
}