// Canonical order of sides used by BorderBoxControl when unlinked.
const BORDER_SIDES = ['top', 'right', 'bottom', 'left'];

const hasDefinedValue = (value) =>
  value !== undefined && value !== null && value !== '';

const capitalizeSide = (side) => side.charAt(0).toUpperCase() + side.slice(1);

// Reference defaults applied when the inspector resets the border.
export const DEFAULT_BORDER = {
  color: '#f9f9f9',
  style: 'solid',
  width: '1px',
};

export const DEFAULT_BORDER_RADIUS = '.375rem';

// Ensures a flat border object always contains the three CSS parts.
const ensureSimpleBorder = (borderValue = {}) => ({
  color: hasDefinedValue(borderValue.color)
    ? borderValue.color
    : DEFAULT_BORDER.color,
  style: hasDefinedValue(borderValue.style)
    ? borderValue.style
    : DEFAULT_BORDER.style,
  width: hasDefinedValue(borderValue.width)
    ? borderValue.width
    : DEFAULT_BORDER.width,
});

const isSplitBorderValue = (borderValue) =>
  !!borderValue &&
  typeof borderValue === 'object' &&
  BORDER_SIDES.some((side) => borderValue?.[side]);

// Harmonises the value emitted by BorderBoxControl so it never stores holes.
export const sanitizeBorderValue = (borderValue) => {
  if (!borderValue || typeof borderValue !== 'object') {
    return { ...DEFAULT_BORDER };
  }

  if (isSplitBorderValue(borderValue)) {
    const sanitizedSides = BORDER_SIDES.reduce((accumulator, side) => {
      const sideValue = borderValue[side];

      if (!sideValue) {
        return accumulator;
      }

      return {
        ...accumulator,
        [side]: ensureSimpleBorder(sideValue),
      };
    }, {});

    return Object.keys(sanitizedSides).length
      ? sanitizedSides
      : { ...DEFAULT_BORDER };
  }

  return ensureSimpleBorder(borderValue);
};

// Turns a normalised border value into the usual shorthand declaration.
const formatBorderString = (borderValue) => {
  const simpleBorder = ensureSimpleBorder(borderValue);

  return `${simpleBorder.width} ${simpleBorder.style} ${simpleBorder.color}`;
};

// Generates the inline style object expected by the block wrapper.
export const getBorderStyles = (borderValue) => {
  if (isSplitBorderValue(borderValue)) {
    const styles = BORDER_SIDES.reduce((accumulator, side) => {
      const sideValue = borderValue[side];

      if (!sideValue) {
        return accumulator;
      }

      return {
        ...accumulator,
        [`border${capitalizeSide(side)}`]: formatBorderString(sideValue),
      };
    }, {});

    return Object.keys(styles).length
      ? styles
      : { border: formatBorderString(DEFAULT_BORDER) };
  }

  if (!borderValue) {
    return { border: formatBorderString(DEFAULT_BORDER) };
  }

  return { border: formatBorderString(borderValue) };
};

// Gives preference to a specific bottom border, falling back to the all-round one.
export const getHeaderBorderBottom = (styles = {}) =>
  styles.borderBottom ?? styles.border ?? undefined;
