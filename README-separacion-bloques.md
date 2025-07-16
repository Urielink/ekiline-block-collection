# 🧩 Prompt de Separación de Bloques para WordPress

Este flujo de trabajo permite separar bloques registrados en un solo archivo JavaScript en archivos modulares compatibles con los estándares modernos de desarrollo de bloques para el editor de WordPress (Gutenberg).

---

## ✅ Sintaxis de Comando Simplificada

Puedes utilizar la siguiente estructura para ejecutar el proceso de separación:

```
prompt: prompt-separacion-bloques.md
recurso: index.js
elemento: ekiline-block-collection/ekiline-tab-link
```

---

## 📁 Archivos Generados

Cada bloque será separado en una carpeta cuyo nombre corresponde al identificador del bloque después de la diagonal:

```
ekiline-block-collection/ekiline-tab-link → carpeta: tab-link/
```

Dentro de esa carpeta se generarán los siguientes archivos:

- `index.js` → Punto de entrada para el bloque
- `edit.js` → Lógica del editor (EditorView)
- `save.js` → Lógica de guardado (FrontendView)
- `block.json` → Metadata del bloque con `"apiVersion": 3`

---

## ⚙️ Instrucciones Especiales

- Si el bloque depende de `registerFormatType(...)`, esa función será separada automáticamente en un archivo adicional como `find-anchor-format.js`.
- Las funciones auxiliares comunes pueden extraerse más adelante en una carpeta `/utils` y reutilizarse en varios bloques.
- La estructura final sigue las recomendaciones de WordPress:
  https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/

---

## 💡 Recomendaciones

- Utiliza un nombre consistente para prompts y recursos (`prompt-*.md`, `index.js`).
- Mantén este README actualizado si agregas nuevas convenciones.
- Puedes integrar este flujo con herramientas como `npm`, `WP-CLI`, o incluso automatizarlo con GPT + scripts locales.

---

## ✨ Ejemplo completo

```
prompt: prompt-separacion-bloques.md
recurso: src/tabs/index.js
elemento: ekiline-block-collection/ekiline-tab-link
```

Este comando genera la carpeta `tab-link/` con todos los archivos listos para compilar o distribuir.

---

© Ekiline Block Collection — Modular Gutenberg Development.
