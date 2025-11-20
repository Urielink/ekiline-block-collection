// src/components/navbar/navbar-list/menu-helpers.js
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks'

/** Utilidades básicas **/
// Helpers: remove Gutenberg block comments and ensure UL has a class
export const stripWPBlockComments = (html) =>
  html ? html.replace(/<!--\s*\/?wp:[\s\S]*?-->/g, '').trim() : ''

// Helper to normalize class string to array of unique classes
export const classStringToArray = (cls) =>
  !cls ? [] : Array.from(new Set(cls.split(/\s+/).filter(Boolean)))

// ---- List <-> JSON mappers ----
export const htmlToTextAndUrl = (html) => {
  if (!html) return { label: '', url: '' }
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  const a = tmp.querySelector('a')
  return a
    ? { label: a.textContent.trim(), url: a.getAttribute('href') || '' }
    : { label: tmp.textContent.trim(), url: '' }
}

export const extractLinkDetails = (html) => {
  const tmp = document.createElement('div')
  tmp.innerHTML = html || ''
  const a = tmp.querySelector('a')
  if (!a) return { href: '', aClasses: [], aStyle: '', inner: '', rel: '', target: '' }
  const href = a.getAttribute('href') || ''
  const aClasses = classStringToArray(a.getAttribute('class') || '')
  const aStyle = a.getAttribute('style') || ''
  const inner = a.innerHTML || ''
  const rel = a.getAttribute('rel') || ''
  const target = a.getAttribute('target') || ''
  return { href, aClasses, aStyle, inner, rel, target }
}

const presetVarToSlug = (val) =>
  !val || typeof val !== 'string'
    ? ''
    : (val.match(/var:preset\|(?:color|font-size)\|([^|\s]+)/) || [])[1] || ''

// Helper to convert slug to WP preset var for rehydration
export const slugToPresetVar = (slug) => (slug ? `var:preset|color|${slug}` : '')

/** De bloques -> JSON **/
export const parseListItemBlock = (liBlock) => {
  const raw = liBlock?.attributes?.content || ''
  const { label, url } = htmlToTextAndUrl(raw)
  const { href, aClasses, aStyle, inner, rel, target } = extractLinkDetails(raw)
  const type = (url || href) ? 'link' : 'text'

  // Gutenberg 'style' & 'classnames' attribute is an object; keep it to render later
  const liClasses = classStringToArray(liBlock?.attributes?.className || '')
  const liStyleObj = liBlock?.attributes?.style || null

  const textColorSlug = liBlock?.attributes?.textColor || ''
  const fontSizeSlug = liBlock?.attributes?.fontSize || ''
  // Helper to extract preset slug from WP preset CSS var
  const linkColorVar = liStyleObj?.elements?.link?.color?.text || ''
  const linkColorSlug = presetVarToSlug(linkColorVar) || ''

  const subList = (liBlock?.innerBlocks || []).find((b) => b.name === 'core/list')
  const children = subList
    ? (subList.innerBlocks || [])
        .filter((b) => b.name === 'core/list-item')
        .map(parseListItemBlock)
    : []

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
    rel,
    target,
    textColorSlug,
    fontSizeSlug,
    linkColorSlug
  }
  if (children.length) node.children = children
  return node
}

export const listBlockToJson = (listBlock) => {
  if (!listBlock) return []
  return (listBlock.innerBlocks || [])
    .filter((b) => b.name === 'core/list-item')
    .map(parseListItemBlock)
}

/** JSON -> plantilla de InnerBlocks (rehidratación enriquecida) **/
export const jsonToListTemplate = (items = []) => {
  const liToTemplate = (item) => {
    // Build list item block attributes
    const liAttrs = {}
    if (item.liClasses?.length) liAttrs.className = item.liClasses.join(' ')
    if (item.textColorSlug) liAttrs.textColor = item.textColorSlug
    if (item.fontSizeSlug) liAttrs.fontSize = item.fontSizeSlug

    // merge style from saved liStyle (object) with link color preset if present
    const styleObj = item.liStyle ? { ...item.liStyle } : {}
    if (!styleObj.elements) styleObj.elements = {}
    if (!styleObj.elements.link) styleObj.elements.link = {}
    if (!styleObj.elements.link.color) styleObj.elements.link.color = {}
    if (item.linkColorSlug) styleObj.elements.link.color.text = slugToPresetVar(item.linkColorSlug)
    // Only assign if there is something meaningful
    if (JSON.stringify(styleObj) !== JSON.stringify({ elements: { link: { color: {} } } })) {
      liAttrs.style = styleObj
    }

    // Anchor classes/styles
    const anchorClassAttr = item.aClasses?.length ? ` class="${item.aClasses.join(' ')}"` : ''
    const anchorStyleAttr = (item.aStyle && item.aStyle.trim())
      ? ` style="${item.aStyle.replace(/"/g, '&quot;')}"`
      : ''
    const anchorTargetAttr = (item.target && item.target.trim()) ? ` target="${item.target}"` : ''
    const anchorRelAttr = (item.rel && item.rel.trim()) ? ` rel="${item.rel}"` : ''

    // Content: prefer raw/labelHtml to preserve formatting (strong/em/spans)
    let content
    if (item.url) {
      const inner = item.labelHtml?.trim()
        ? item.labelHtml
        : (item.raw?.trim() ? item.raw : (item.label || ''))
      content = `<a href="${item.url}"${anchorClassAttr}${anchorStyleAttr}${anchorTargetAttr}${anchorRelAttr}>${inner}</a>`
    } else {
      content = item.raw?.trim()
        ? item.raw
        : (item.labelHtml?.trim() ? item.labelHtml : (item.label || ''))
    }

    const children = (item.children && item.children.length)
      ? [['core/list', {}, item.children.map(liToTemplate)]]
      : []

    return ['core/list-item', { ...liAttrs, content }, children]
  }

  return [['core/list', {}, items.map(liToTemplate)]]
}

/** Preview (editor) — render recursivo como navbar Bootstrap (clics deshabilitados en el <ul>) **/
export const renderPreviewItems = (items = [], level = 0) => {
  const isRoot = level === 0
  const ulClass = isRoot ? 'navbar-nav' : 'dropdown-menu'
  return (
    <ul
      className={ulClass}
      onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
      onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}
      onKeyDown={(e) => { e.preventDefault(); e.stopPropagation() }}
      role='presentation'
    >
      {items.map((item, idx) => {
        const hasChildren = Array.isArray(item.children) && item.children.length > 0
        const isText = item.type === 'text' && !hasChildren

        const liBase = isRoot
          ? (hasChildren ? 'nav-item dropdown' : (isText ? '' : 'nav-item'))
          : (hasChildren ? 'dropdown-submenu dropend' : '')
        const wpPresetClasses = [
          item.textColorSlug ? `has-${item.textColorSlug}-color has-text-color` : '',
          item.fontSizeSlug ? `has-${item.fontSizeSlug}-font-size` : '',
          item.linkColorSlug ? 'has-link-color' : ''
        ].filter(Boolean).join(' ')
        const liClass = [liBase, (item.liClasses || []).join(' '), wpPresetClasses]
          .filter(Boolean).join(' ').trim()

        const linkBase = isRoot
          ? (hasChildren ? 'nav-link dropdown-toggle' : 'nav-link')
          : (hasChildren ? 'dropdown-item dropdown-toggle' : 'dropdown-item')
        const linkClass = [linkBase, (item.aClasses || []).join(' ')]
          .filter(Boolean).join(' ').trim()

        const liStyle = item.liStyle || undefined
        const aStyleObj = (item.aStyle && item.aStyle.trim())
          ? item.aStyle.split(';').reduce((acc, decl) => {
            const [prop, val] = decl.split(':').map(s => s && s.trim()).filter(Boolean)
            if (prop && val) acc[prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = val
            return acc
          }, {})
          : undefined

        if (isText) {
          return (
            <li className={liClass} style={liStyle} key={idx}>
              <span className={isRoot ? 'nav-link navbar-text' : 'dropdown-item-text'}>
                {item.raw
                  ? <span dangerouslySetInnerHTML={{ __html: item.raw }} />
                  : (item.label || '')}
              </span>
            </li>
          )
        }

        return (
          <li className={liClass} style={liStyle} key={idx}>
            <a
              className={linkClass}
              href={item.url || '#'}
              style={aStyleObj}
              rel={item.rel || undefined}
              target={item.target || undefined}
              {...(hasChildren ? { 'data-bs-toggle': 'dropdown', role: 'button', 'aria-expanded': 'false' } : {})}
            >
              {item.labelHtml
                ? <span dangerouslySetInnerHTML={{ __html: item.labelHtml }} />
                : (item.label || '')}
            </a>
            {hasChildren ? renderPreviewItems(item.children, level + 1) : null}
          </li>
        )
      })}
    </ul>
  )
}

// Re-exported to keep call-sites clean in edit.js
export { createBlocksFromInnerBlocksTemplate }
