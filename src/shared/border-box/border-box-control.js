import { BorderBoxControl } from '@wordpress/components'
import { useSelect } from '@wordpress/data'

import { sanitizeBorderValue } from './utils'

/**
 * Wrapper around Gutenberg's BorderBoxControl that guarantees sanitised values.
 */
const BorderBoxField = ({
  value,
  onChange,
  defaultBorder,
  withThemeColors = true,
  colors: colorsProp,
  disableCustomColors: disableCustomColorsProp,
  enableAlpha: enableAlphaProp,
  ...props
}) => {
  const { themeColors, themeDisableCustomColors } = useSelect(
    (select) => {
      if (!withThemeColors) {
        return {
          themeColors: undefined,
          themeDisableCustomColors: undefined
        }
      }

      const settings = select('core/block-editor').getSettings?.() || {}

      return {
        themeColors: settings.colors || [],
        themeDisableCustomColors: settings.disableCustomColors
      }
    },
    [withThemeColors]
  )

  const resolvedColors = colorsProp ?? themeColors
  const resolvedDisableCustomColors =
    typeof disableCustomColorsProp !== 'undefined'
      ? disableCustomColorsProp
      : themeDisableCustomColors
  const resolvedEnableAlpha =
    typeof enableAlphaProp !== 'undefined'
      ? enableAlphaProp
      : !resolvedDisableCustomColors

  const normalizedValue = sanitizeBorderValue(value, defaultBorder)

  const handleChange = (nextValue) => {
    if (typeof onChange !== 'function') {
      return
    }

    const sanitized = sanitizeBorderValue(nextValue, defaultBorder)
    onChange(sanitized)
  }

  return (
    <BorderBoxControl
      value={normalizedValue}
      onChange={handleChange}
      colors={resolvedColors}
      disableCustomColors={resolvedDisableCustomColors}
      enableAlpha={resolvedEnableAlpha}
      {...props}
    />
  )
}

export default BorderBoxField
