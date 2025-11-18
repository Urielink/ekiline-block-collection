# ✨ Cómo compilar filtros globales en un plugin de bloques para WordPress

La mayoría de la documentación de WordPress se enfoca en compilar bloques que usan `block.json`. Sin embargo, si deseas usar filtros como `addFilter()` para modificar bloques existentes (por ejemplo, `core/button` o `core/heading`), necesitarás un enfoque diferente.

Este documento resume cómo compilar archivos JavaScript adicionales que **no están ligados a un bloque**, y que usualmente contienen lógica global como filtros.

---

## ✅ Estructura recomendada

```plaintext
src/
├── components/
│   ├── accordion/
│   └── button/
├── filters/
│   └── core-button-mods.js
├── index.js  <-- Archivo de entrada para lógica global
```

---

## 🧠 ¿Qué hace `@wordpress/scripts` por defecto?

Cuando ejecutas:

```bash
npm run build
```

WordPress Scripts (`wp-scripts build`) **solo compila bloques con `block.json`**.  
No compila automáticamente otros archivos como `src/index.js` o filtros independientes.

---

## 🧩 Solución: compilar archivos adicionales

Edita tu `package.json` y modifica el script `"build"` para incluir `src/index.js`:

```json
"scripts": {
  "build": "wp-scripts build ./src/index.js",
  "start": "wp-scripts start ./src/index.js"
}
```

Esto instruye al compilador a crear:

```plaintext
build/index.js
```

---

## 📦 ¿Qué contiene `src/index.js`?

Este archivo puede importar filtros o lógica global:

```js
import './filters/core-button-mods';
```

Tu filtro puede verse así:

```js
import { addFilter } from '@wordpress/hooks';

function extendCoreButton(settings, name) {
  if (name !== 'core/button') return settings;

  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      dataBsToggle: {
        type: 'string',
        default: '',
      },
    },
  };
}

addFilter(
  'blocks.registerBlockType',
  'myplugin/core-button-extend',
  extendCoreButton
);
```

---

## 🔗 Cómo encolarlo desde PHP

En tu plugin, agrega esto para que el script se cargue en el editor:

```php
add_action( 'enqueue_block_editor_assets', function() {
    wp_enqueue_script(
        'myplugin-global-hooks',
        plugins_url( 'build/index.js', __FILE__ ),
        [ 'wp-hooks', 'wp-blocks' ],
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' ),
        true
    );
} );
```

---

## ✅ Resultado

Ahora, cuando cargues el editor de bloques:

- El filtro será ejecutado automáticamente.
- Puedes modificar atributos, estilos o controles de bloques existentes.
- Todo sin registrar un bloque "fantasma".

---

## 📚 Recursos adicionales

- [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)
- [@wordpress/hooks](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/)
- [Gutenberg Examples GitHub](https://github.com/WordPress/gutenberg-examples)

---

**Autor:** Uri Lazcano (Urielink)  
**Notas generadas con ayuda de ChatGPT**