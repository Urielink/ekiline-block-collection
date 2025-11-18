import { __ } from '@wordpress/i18n';
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';

import {
  DEFAULT_BORDER_RADIUS,
  getRadiusWithDefaults,
  sanitizeBorderRadiusValue,
} from './utils';

export const BORDER_RADIUS_UNITS = [
  { value: 'px', label: 'px', default: 6 },
  { value: 'em', label: 'em' },
  { value: 'rem', label: 'rem' },
  { value: '%', label: '%' },
];

/**
 * Centralises the UnitControl used for border radius, ensuring sanitised values.
 */
const BorderRadiusField = ({
  value,
  onChange,
  label = __('Border radius', 'ekiline-block-collection'),
  units = BORDER_RADIUS_UNITS,
  allowEmpty = true,
  defaultRadius = DEFAULT_BORDER_RADIUS,
  ...props
}) => {
  const normalizedRadius = getRadiusWithDefaults(value, defaultRadius);

  const handleChange = (nextValue) => {
    if (typeof onChange !== 'function') {
      return;
    }

    const sanitized = sanitizeBorderRadiusValue(
      nextValue,
      allowEmpty,
      defaultRadius
    );

    onChange(sanitized);
  };

  const controlProps = {
    label,
    value: normalizedRadius,
    onChange: handleChange,
    units,
    ...props,
  };

  if (typeof controlProps.isResetValueOnUnitChange === 'undefined') {
    controlProps.isResetValueOnUnitChange = false;
  }

  return <UnitControl {...controlProps} />;
};

export default BorderRadiusField;
