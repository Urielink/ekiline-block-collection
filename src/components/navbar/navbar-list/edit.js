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
const ensureUlHasClass = (html, className) => {
  if (!html) return html;
  return html.replace(/<ul([^>]*)>/, (match, attrs) => {
    const classMatch = attrs.match(/class\s*=\s*["']([^"']*)["']/i);
    if (classMatch) {
      const current = classMatch[1].split(/\s+/).filter(Boolean);
      if (!current.includes(className)) current.push(className);
      const newCls = current.join(' ');
      const newAttrs = attrs.replace(/class\s*=\s*["'][^"']*["']/i, `class="${newCls}"`);
      return `<ul${newAttrs}>`;
    }
    return `<ul${attrs} class="${className}">`;
  });
};

// Helper to extract preset slug from WP preset CSS var
const presetVarToSlug = (val) => {
  // e.g. "var:preset|color|vivid-purple" -> "vivid-purple"
  if (!val || typeof val !== 'string') return '';
  const m = val.match(/var:preset\|(?:color|font-size)\|([^|\s]+)/);
  return m ? m[1] : '';
};

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
  const linkColorVar = liStyleObj?.elements?.link?.color?.text || '';
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

// JSON -> InnerBlocks template for re-edition
const jsonToListTemplate = (items = []) => {
  const liToTemplate = (item) => {
    const anchorClassAttr = (item.aClasses && item.aClasses.length) ? ` class="${ item.aClasses.join(' ') }"` : '';
    const content = item.url
      ? `<a href="${ item.url }"${ anchorClassAttr }>${ item.label || '' }</a>`
      : (item.label || '');
    const children = item.children && item.children.length
      ? [[ 'core/list', {}, item.children.map(liToTemplate) ]]
      : [];
    return [ 'core/list-item', { content, className: (item.liClasses && item.liClasses.length) ? item.liClasses.join(' ') : undefined }, children ];
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
      const items = JSON.parse(attributes.menuJson || '[]');
      const template = jsonToListTemplate(items);
      const blocks = createBlocksFromInnerBlocksTemplate( template );
      replaceInnerBlocks( clientId, blocks, false );
    } catch(e) {
      // if JSON invalid, leave template default
    }
  };

  return (
    <div { ...blockProps }>
      {/* Barra superior con acciones de menú */}
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon={ editIcon }
            label={ __('Editar navegación', 'ekiline') }
            onClick={ handleEditMenu }
            disabled={ isEditingMenu }
            showTooltip
          />
          <ToolbarButton
            icon={ check }
            label={ __('Guardar menú', 'ekiline') }
            onClick={ handleSaveMenu }
            disabled={ !isEditingMenu }
            showTooltip
          />
        </ToolbarGroup>
      </BlockControls>

      <InspectorControls>
        <PanelBody title={ __( 'Comportamiento', 'ekiline' ) } initialOpen={ true }>
          <SelectControl
            label="Estilo"
            value={ navStyle }
            options={[
              { label: 'Colapsable', value: 'collapse' },
              { label: 'Offcanvas', value: 'offcanvas' },
            ]}
            onChange={ (v)=> setAttributes({ navStyle: v }) }
          />
          <SelectControl
            label="Breakpoint"
            value={ navShow }
            options={[
              { label: 'Expand LG', value: ' navbar-expand-lg' },
              { label: 'Expand MD', value: ' navbar-expand-md' },
              { label: 'Expand SM', value: ' navbar-expand-sm' },
              { label: 'Siempre colapsado', value: '' },
            ]}
            onChange={ (v)=> setAttributes({ navShow: v }) }
          />
          <SelectControl
            label={__('Align nav items', 'ekiline-block-collection')}
            value={alignItems}
            options={[
              { label: __('Default', 'ekiline-block-collection'), value: '' },
              { label: __('Center', 'ekiline-block-collection'), value: ' justify-content-md-center' }
            ]}
            onChange={(v) => setAttributes({ alignItems: v })}
          />
          <SelectControl
            label="Posición"
            value={ navPosition }
            options={[
              { label: 'Normal', value: '' },
              { label: 'Fija arriba', value: ' fixed-top' },
              { label: 'Fija abajo', value: ' fixed-bottom' },
              { label: 'Sticky top', value: ' sticky-top' },
            ]}
            onChange={ (v)=> setAttributes({ navPosition: v }) }
          />
          <SelectControl
            label="Container"
            value={ container }
            options={[
              { label: 'container-fluid', value: 'container-fluid' },
              { label: 'container', value: 'container' },
              { label: 'sin contenedor', value: '' },
            ]}
            onChange={ (v)=> setAttributes({ container: v }) }
          />
          <TextControl
            label="Texto de marca"
            value={ brandText }
            onChange={ (v)=> setAttributes({ brandText: v }) }
          />
          <TextControl
            label="ID del target (collapse/offcanvas)"
            value={ targetId }
            onChange={ (v)=> setAttributes({ targetId: v }) }
            help="Debe ser único en la página."
          />
        </PanelBody>
        <PanelBody title={ __( 'Estado', 'ekiline' ) } initialOpen={ false }>
          <Notice status="info" isDismissible={ false }>
            { isEditingMenu
              ? 'Modo edición: usa el bloque Lista para armar el menú y presiona “Guardar menú”.'
              : 'Modo preview: así se verá tu navegación. Usa la barra para editar de nuevo.' }
          </Notice>
        </PanelBody>
      </InspectorControls>

      { isEditingMenu ? (
        <>
          <p><strong>1)</strong> Crea/edita tu menú con <em>Lista</em>. Puedes anidar sublistas para dropdowns.</p>
          <hr className="wp-block-separator"/>
          <InnerBlocks
            allowedBlocks={ ALLOWED }
            templateLock={ false }
            template={ LIST_TEMPLATE }
            renderAppender={ InnerBlocks.ButtonBlockAppender }
          />
          <hr className="wp-block-separator"/>
          <Button variant="primary" onClick={ handleSaveMenu }>
            Guardar menú
          </Button>
        </>
      ) : (
        <>
          <p style={{opacity:.7, marginBottom:'8px'}}>
            Vista previa (usa la barra superior para “Editar navegación”).
          </p>
          <div style={{border:'1px dashed #ccc', padding:'8px', borderRadius:'8px', maxHeight: 220, overflow: 'auto' }}>
            <pre style={{whiteSpace:'pre-wrap', margin:0}}>
              { (menuJson && menuJson !== '[]') ? menuJson : '(sin menú)' }
            </pre>
          </div>
          <div style={{ height: 8 }} />
          {/* <Button variant="primary" icon={ editIcon } onClick={ handleEditMenu }>
            { __('Editar menú (convertir JSON → Lista)', 'ekiline') }
          </Button> */}
        </>
      ) }
    </div>
  );
}