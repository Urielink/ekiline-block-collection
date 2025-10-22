=== Ekiline Block Collection ===
Contributors:      urielink
Requires at least: 5.8
Tags:              block, collection, bootstrap
Tested up to:      6.9
Requires PHP:      7.0
Stable tag:        2.1.1
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/license-list.html#GPLv2
Donate link:       https://www.paypal.com/paypalme/urielink

Bootstrap components turned into WordPress editor blocks. Add new functionality to your project. Install and use directly in the editor.

== Description ==

== Made for those of us who love working with Bootstrap ==

- **Accordion**.
- **Collapse**.
- **Modal**.
- **Tabs**.
- **Progress bar**.
- **Pop over**.
- **Tooltip**.
- **Toast**.
- **Static carousel**.
- **Dynamic carousel**.
- **Offcanvas**.
- **Navigation (new!)**.


HTML markup as well as classes and attributes have been respected to work with Bootstrap in its most recent version (5.2.X).
CSS styles and JS scripts are included, maintaining the layout and behaviors.

= Compatibility =
Great response on new block-based themes like twenty-twenty two and the twenty-twenty one hybrid themes.
Do you want more? Download the Ekiline theme to have more options in customizing your site.

== Installation ==

This section describes how to install the plugin and get it working.

e.g.

1. Upload the plugin files to the `/wp-content/plugins/ekiline-collection` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress


== Frequently Asked Questions ==

= A question that someone might have =

An answer to that question.

= What about foo bar? =

Answer to foo bar dilemma.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from
the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png`
(or jpg, jpeg, gif).
2. This is the second screen shot

== Changelog ==

= 3.0.0 =
* Cambios mayores, nuevo planteamiento de uso de bootstrap.
* Optimización de vista de bloques en el editor y frontend.

## 📦 Compilación de filtros JavaScript (`addFilter`) con @wordpress/scripts
Este plugin utiliza el sistema de hooks de WordPress (`@wordpress/hooks`) para extender bloques existentes como `core/button`, sin necesidad de registrar nuevos bloques personalizados.

### 📌 Contexto
Cuando usas funciones como `addFilter()` para modificar bloques existentes (por ejemplo, para agregar atributos o cambiar su comportamiento), estos scripts no se asocian directamente a un `block.json`. Por tanto, **no se compilan automáticamente** mediante `wp-scripts build` como lo hacen los bloques tradicionales.

### ✅ Solución
Para compilar estos scripts personalizados, se debe crear un archivo de entrada (por ejemplo, `src/index.js`) que importe los filtros deseados:

```js
// src/index.js
import './filters/core-button-mods.js';


= 2.1.1 =
* Check new wordpress version (6.8).
* Bootstrap update (v5.3.5)


= 2.1.0 =
* New Navbar Block
* Merges the wordpress navigator block into the bootstrap navbar.
* Adds and removes css classes on the frontend with javascript.
* Adds and removes css classes on the frontend with javascript.
* In the next version, code refactoring and block updates to use API v3 are planned.

= 2.0.1 =
* Quick fix: properly initialize loading of plugin styles and scripts

= 2.0.0 =
* Major update:
* Refactoring of dynamic carousel due to XSS vulnerability.
* Text and language adjustment.
* New information pages added.
* New options to disable styles and scripts.

= 1.0.7 =
* Security Fix: XSS vulnerability in dynamic carousel.

= 1.0.6 =
* Improve: Video behavior, pause when video was in modal or offcanvas container.
* Fix: Dynamic Carousel, clean shortcodes from content.

= 1.0.5 =
* Improve: add individual posts in basic carousel.

= 1.0.4 =
* Fix classname in dynamic carosuel.
* Improve: Avoid lazy load in dynamic carosuel first image.
* Fix compatibility carousel shortcode method.

= 1.0.3 =
* Fix language descriptions.

= 1.0.2 =
* Allow shortcodes in modal block.
* Update language files.

= 1.0.1 =
* Fix modal script.

= 1.0.0 =
* Refactoring of css styles and js scripts to improve compatibility with themes.
* New options for the dynamic carousel, choose what to show: images, posts or videos.
* In addition you will be able to link each image with the use of the media description field.

= 0.1.7 =
* Improve: Extend link control (images). Add options to trigger collapsing, modal or offcanvas.
* Enahnce: Extend link control (buttons). Add options to trigger collapsing, modal or offcanvas.
* Update: Language files.

= 0.1.6 =
* WP 6.1 Compatibility Check, works fine with new theme: Twenty Twenty-Three.
* Fix: Toast: title displayed HTML tags.
* Improve: New Offcanvas Block.
* Update: Language files.

= 0.1.5 =
* Fix: Carousel title.

= 0.1.4 =
* This version is being tested in different online projects, it has not shown difficulties in its operation. It allows adding improvements and new features to the development team.
* Improve: Extend carousel module, added new visual controls.

= 0.1.3 =
* Improve: Added information page, admin/themes/About EBC.
* Fix: Carousel static and Carousel dynamic height styles.
* Fix: Compatibility problem, editor gets stuck when select an image/media block.
* Fix: Carousel static, correction when set, add or delete images.
* Improve: Carousel static added show hide caption.

= 0.1.2 =
* Improve: Ajust css rules and js for all blocks.
* Improve: Init for bootstrap items.
* Update: Readme information.

= 0.1.1 =
* Update banner and icon images

= 0.1.0 =
* Release

== Upgrade Notice ==

New carousel design options!
Link images and activate modal, offcanvas and more!

== About author ==

The author of this plugin will be careful to keep the code as faithful to Bootstrap.
As well as to maintain this development and incorporate new features in each new update.

“I have created this plugin to provide a better web development service to my clients, from a trusted source such as WordPress.”
Uri Lazcano.

DevIm: [node v19.1.0, npm 8.19.3, nvm 0.39.3]




### prueba de crear bloques independientes

referencias:
- https://wordpress.stackexchange.com/questions/407748/how-to-register-two-blocks-in-the-same-plugin
- https://developer.wordpress.org/news/2024/09/how-to-build-a-multi-block-plugin/
* https://developer.wordpress.org/news/2024/05/setting-up-a-multi-block-using-inner-blocks-and-post-meta/
* https://github.com/WordPress/gutenberg/blob/trunk/packages/blocks/README.md

# Actulizar node

Error: Wanted node version >=20.10.0 (>=20.10.0)
Error: Wanted npm version >=10.2.3 (>=10.2.3)

# Registrar bloques.

1. Organizar carpeta contendora para esta coleccion
 - layout
 - components

2. generar cada nuevo bloque.

npx @wordpress/create-block@latest accordion --no-plugin
  npx @wordpress/create-block@latest accordion-item --no-plugin

npx @wordpress/create-block@latest collapse --no-plugin
npx @wordpress/create-block@latest progress --no-plugin
npx @wordpress/create-block@latest toast --no-plugin
npx @wordpress/create-block@latest tabs --no-plugin
npx @wordpress/create-block@latest modal --no-plugin
npx @wordpress/create-block@latest carousel --no-plugin
npx @wordpress/create-block@latest carousel-extra --no-plugin
npx @wordpress/create-block@latest carousel-blocks --no-plugin
  npx @wordpress/create-block@latest ekiline-carousel-slide --no-plugin


npx @wordpress/create-block@latest offcanvas --no-plugin
npx @wordpress/create-block@latest hooks --no-plugin
npx @wordpress/create-block@latest popovers --no-plugin
npx @wordpress/create-block@latest navigation --no-plugin


3. registrar cada bloque en index.php

`register_block_type(__DIR__ . '/build/components/accordion')`


#### pendientes:
Los scripts funcionan en el editor sin problema.
Averiguar la separación de tareas.


### prompt para separar plugin.

🧩 Tengo un plugin de bloques para WordPress. Cada bloque está registrado en un solo archivo grande, pero quiero separar cada uno en su carpeta con archivos index.js, edit.js, save.js y block.json.

Aquí está el nombre del bloque (como está registrado):
	•	'ekiline-block-collection/ekiline-accordion-item-header'

Su código fuente actual está en formato completo con registerBlockType(...).

Quiero que:
	1.	Separes ese bloque en su propia carpeta llamada accordion-item-header/.
	2.	Generes los 4 archivos (index.js, edit.js, save.js, block.json) con el contenido correspondiente.
	3.	Empaquetes todos los archivos generados en un .zip descargable.


### Prompt v2

Tengo un plugin de bloques para WordPress. Cada bloque está registrado en un solo archivo grande, pero quiero separar cada uno en su carpeta con archivos index.js, edit.js, save.js y block.json.

Aquí está el nombre del bloque (como está registrado):
ekiline-block-collection/ekiline-NOMBRE_DEL_BLOQUE

Quiero que:
	1.	Crees una carpeta con el nombre que aparece después de la diagonal, por ejemplo ekiline-accordion-item → carpeta accordion-item.
	2.	Genere dentro de esa carpeta los archivos: index.js, edit.js, save.js y block.json.
	3.	En el archivo block.json, usa "apiVersion": 3 en lugar del 2.
	4.	Empaqueta los archivos en un .zip descargable.
