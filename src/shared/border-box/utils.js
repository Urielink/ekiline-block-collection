// Canonical order of sides used by BorderBoxControl when unlinked.
const BORDER_SIDES = ['top', 'right', 'bottom', 'left']

const hasDefinedValue = (value) =>
  value !== undefined && value !== null && value !== ''

const capitalizeSide = (side) => side.charAt(0).toUpperCase() + side.slice(1)

// Reference defaults applied when the inspector resets the border.
export const DEFAULT_BORDER = {
  color: '#f9f9f9',
  style: 'solid',
  width: '1px'
}

export const DEFAULT_BORDER_RADIUS = '.375rem'

// Ensures a flat border object always contains the three CSS parts.
const ensureSimpleBorder = (borderValue = {}, fallback = DEFAULT_BORDER) => ({
  color: hasDefinedValue(borderValue.color)
    ? borderValue.color
    : fallback.color,
  style: hasDefinedValue(borderValue.style)
    ? borderValue.style
    : fallback.style,
  width: hasDefinedValue(borderValue.width)
    ? borderValue.width
    : fallback.width
})

const isSplitBorderValue = (borderValue) =>
  !!borderValue &&
  typeof borderValue === 'object' &&
  BORDER_SIDES.some((side) => borderValue?.[side])

// Harmonises the value emitted by BorderBoxControl so it never stores holes.
export const sanitizeBorderValue = (
  borderValue,
  fallback = DEFAULT_BORDER
) => {
  if (!borderValue || typeof borderValue !== 'object') {
    return { ...fallback }
  }

  if (isSplitBorderValue(borderValue)) {
    const sanitizedSides = BORDER_SIDES.reduce((accumulator, side) => {
      const sideValue = borderValue[side]

      if (!sideValue) {
        return accumulator
      }

      return {
        ...accumulator,
        [side]: ensureSimpleBorder(sideValue, fallback)
      }
    }, {})

    return Object.keys(sanitizedSides).length
      ? sanitizedSides
      : { ...fallback }
  }

  return ensureSimpleBorder(borderValue, fallback)
}

// Turns a normalised border value into the usual shorthand declaration.
const formatBorderString = (borderValue, fallback = DEFAULT_BORDER) => {
  const simpleBorder = ensureSimpleBorder(borderValue, fallback)

  return `${simpleBorder.width} ${simpleBorder.style} ${simpleBorder.color}`
}

// Generates the inline style object expected by the block wrapper.
export const getBorderStyles = (borderValue, fallback = DEFAULT_BORDER) => {
  if (isSplitBorderValue(borderValue)) {
    const styles = BORDER_SIDES.reduce((accumulator, side) => {
      const sideValue = borderValue[side]

      if (!sideValue) {
        return accumulator
      }

      return {
        ...accumulator,
        [`border${capitalizeSide(side)}`]: formatBorderString(
          sideValue,
          fallback
        )
      }
    }, {})

    return Object.keys(styles).length
      ? styles
      : { border: formatBorderString(fallback, fallback) }
  }

  if (!borderValue) {
    return { border: formatBorderString(fallback, fallback) }
  }

  return { border: formatBorderString(borderValue, fallback) }
}

// Gives preference to a specific bottom border, falling back to the all-round one.
export const getHeaderBorderBottom = (styles = {}) =>
  styles.borderBottom ?? styles.border ?? undefined

export const sanitizeBorderRadiusValue = (
  radiusValue,
  allowEmpty = true,
  fallback = DEFAULT_BORDER_RADIUS
) => {
  if (!hasDefinedValue(radiusValue)) {
    return allowEmpty ? undefined : fallback
  }

  return radiusValue
}

export const getRadiusWithDefaults = (
  radiusValue,
  fallback = DEFAULT_BORDER_RADIUS
) => sanitizeBorderRadiusValue(radiusValue, false, fallback)
