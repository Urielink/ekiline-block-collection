## Border box helpers

Para reutilizar `BorderBoxField` y `BorderRadiusField` en un bloque nuevo, toma en cuenta lo siguiente.

### 1. Atributos en `block.json`

```json
"attributes": {
  "border": {
    "type": "object",
    "default": {
      "color": "#f9f9f9",
      "style": "solid",
      "width": "1px"
    }
  },
  "borderRadius": {
    "type": "string",
    "default": ".375rem"
  }
}
```

Opcionalmente expón el soporte nativo de Gutenberg para bordes:

```json
"supports": {
  "border": {
    "color": true,
    "radius": true,
    "style": true,
    "width": true
  }
}
```

### 2. Constantes y utilidades compartidas

Importa desde `src/shared/border-box`:

```js
import {
  BorderBoxField,
  BorderRadiusField,
  DEFAULT_BORDER_RADIUS,
  getBorderStyles,
  getHeaderBorderBottom,
  getRadiusWithDefaults,
  sanitizeBorderValue,
  sanitizeBorderRadiusValue,
} from '../../shared/border-box';
```

### 3. Uso en `edit.js`

```js
const normalizedBorder = sanitizeBorderValue(attributes.border);
const borderStyles = getBorderStyles(normalizedBorder);
const appliedBorderRadius = getRadiusWithDefaults(
  attributes.borderRadius,
  DEFAULT_BORDER_RADIUS
);

const onChangeBorder = (newBorder) =>
  setAttributes({ border: sanitizeBorderValue(newBorder) });

const onChangeBorderRadius = (newRadius) =>
  setAttributes({
    borderRadius: sanitizeBorderRadiusValue(newRadius, true, DEFAULT_BORDER_RADIUS),
  });

<BorderBoxField
  label={__('Border', 'text-domain')}
  value={normalizedBorder}
  onChange={onChangeBorder}
/>

<BorderRadiusField
  value={attributes.borderRadius}
  onChange={onChangeBorderRadius}
/>
```

### 4. Uso en `save.js`

Aplica la misma sanitización antes de renderizar:

```js
const normalizedBorder = sanitizeBorderValue(attributes.border);
const borderStyles = getBorderStyles(normalizedBorder);
const appliedBorderRadius = getRadiusWithDefaults(
  attributes.borderRadius,
  DEFAULT_BORDER_RADIUS
);

const blockProps = useBlockProps.save({
  style: {
    ...borderStyles,
    borderRadius: appliedBorderRadius,
  },
});
```

Con esto se garantiza que el bloque respeta la paleta del tema y mantiene valores consistentes entre editor y front-end.
