🧩 Prompt Mejorado para Separar Bloques de WordPress

Tengo un plugin de bloques para WordPress. Cada bloque está registrado en un solo archivo grande, pero quiero separar cada uno en su propia carpeta con archivos individuales para facilitar el mantenimiento y la escalabilidad.

Nombre del bloque (como está registrado):  
ekiline-block-collection/NOMBRE_DEL_BLOQUE

Quiero que:
1. Crees una carpeta con el nombre que aparece después de la diagonal.  
   Ejemplo: ekiline-block-collection/ekiline-tab-link → carpeta: ekiline-tab-link/

2. Dentro de esa carpeta, genera estos archivos:
   - index.js
   - edit.js
   - save.js
   - block.json (con "apiVersion": 3)

3. Si el bloque registra formatos de texto personalizados mediante registerFormatType(...), crea un archivo separado (ej. find-anchor-format.js) e impórtalo desde index.js.

4. Si el bloque usa funciones auxiliares o hooks personalizados (como replaceSpecialChars, compose, withSelect, etc.):
   - Extrae esas funciones a un archivo llamado utils.js o similar.
   - Si se detectan funciones generales reutilizables, sugiere una carpeta shared/ para usarlas entre bloques.
   - Asegúrate de importar estas funciones correctamente desde los archivos que las necesiten (edit.js, save.js, etc.).

5. Empaqueta todos los archivos generados en un archivo .zip descargable, nombrado según la carpeta del bloque.

Ejemplo de carpeta resultante:

ekiline-tab-link/
├── block.json
├── index.js
├── edit.js
├── save.js
├── find-anchor-format.js
├── utils.js
