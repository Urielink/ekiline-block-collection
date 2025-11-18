// class-utils.js
export const mergeClasses = (...inputs) => {
  const set = new Set();
  inputs.forEach(input => {
    if (!input) return;
    if (Array.isArray(input)) {
      input.forEach(c => c && set.add(c));
    } else if (typeof input === 'string') {
      input.split(/\s+/).forEach(c => c && set.add(c));
    }
  });
  return Array.from(set).join(' ');
};

export const hasPresetClass = (cls) => /\bhas-[\w-]+/.test(cls || '');
export const hasInlineColor = (style) =>
  !!(style && (style.color || style.backgroundColor));

export const shouldAddBgTertiary = (blockProps) => {
  const preset = hasPresetClass(blockProps?.className);
  const inline = hasInlineColor(blockProps?.style);
  return !(preset || inline);
};

export const styleStringToObject = (str) => {
  if (!str) return undefined;
  return str.split(';').reduce((acc, decl) => {
    const [prop, val] = decl.split(':').map(s => s && s.trim()).filter(Boolean);
    if (!prop || !val) return acc;
    const jsProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    acc[jsProp] = val;
    return acc;
  }, {});
};

export const liStyleFromGutenberg = (styleObj) => {
  if (!styleObj) return undefined;
  const out = {};
  if (styleObj.typography) {
    const t = styleObj.typography;
    if (t.fontSize) out.fontSize = t.fontSize;
    if (t.fontStyle) out.fontStyle = t.fontStyle;
    if (t.fontWeight) out.fontWeight = t.fontWeight;
    if (t.textDecoration) out.textDecoration = t.textDecoration;
    if (t.letterSpacing) out.letterSpacing = t.letterSpacing;
    if (t.lineHeight) out.lineHeight = t.lineHeight;
  }
  if (styleObj.color) {
    if (styleObj.color.text) out.color = styleObj.color.text;
    if (styleObj.color.background) out.backgroundColor = styleObj.color.background;
  }
  return Object.keys(out).length ? out : undefined;
};