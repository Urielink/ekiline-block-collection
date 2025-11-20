=== Ekiline Block Collection ===
Contributors:      urielink
Requires at least: 5.8
Tags:              block, collection, bootstrap
Tested up to:      6.9
Requires PHP:      7.0
Stable tag:        3.0.1
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/license-list.html#GPLv2
Donate link:       https://www.paypal.com/paypalme/urielink

Bootstrap components reimagined as WordPress blocks.


== Description ==

= Build faster. Prototype better. Design with freedom. =

Ekiline Block Collection transforms classic Bootstrap components into native WordPress editor blocks, giving you the flexibility of the block editor with the power of Bootstrap—all without writing a single line of code.

Perfect for developers, designers, UX professionals, and anyone who loves working with Bootstrap inside WordPress.

= 📦 Included Components =

* Accordion
* Collapse
* Modal
* Tabs
* Progress Bar
* Popover
* Tooltip
* Toast
* Offcanvas
* Navigation (new!)
* Static Carousel
* Dynamic Carousel


= 🧩 Compatibility =

Ekiline Block Collection works seamlessly with modern WordPress block-based themes like:

* Twenty Twenty-One (hybrid)
* Twenty Twenty-Two
* Twenty Twenty-Three
* Twenty Twenty-Four
* Twenty Twenty-Five

= 🎁 Ekiline Theme =
For even more customization options, download the Ekiline Theme, a hybrid WordPress theme built to complement this plugin.


== Installation ==

1. Upload the plugin files to the /wp-content/plugins/ekiline-block-collection directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the ‘Plugins’ screen in WordPress


== Frequently Asked Questions ==

= ✨ Features =

Bootstrap components rebuilt as real WordPress blocks.
Insert, customize, and preview everything in real time (WYSIWYG).

= Full design freedom =
Customize background color, text color, borders, shadows, spacing, and more using the native design tools of the WordPress editor.

= Clean, reliable architecture =
HTML markup, classes, and attributes strictly follow Bootstrap 5.3.x methodology.
The plugin only loads the CSS/JS needed—avoiding conflicts and keeping performance high.

= Admin control panel included =
Enable or disable Bootstrap assets depending on your theme.
Ideal for hybrid themes or block themes where Bootstrap might already be included.

= Great for rapid prototyping & UX workflows =
Build functional interfaces, dashboards, app layouts, and interactive sections in minutes.


== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png` (or jpg, jpeg, gif).


== Changelog ==

= 3.0.1 =
* Update Bootstrap css and js version.

= 3.0.0 =
* Major changes, new approach to using bootstrap.
* Block view optimization in the editor and frontend.

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

= ⚠️ Important Upgrade Notice — Breaking Changes =

This new version of Ekiline Block Collection is a major rewrite.
Previous versions used a different block structure and markup that is no longer compatible with the new architecture.

Because of this:
* Blocks created with older versions may stop working after updating.
* Your existing layouts may not render correctly, and some components may disappear or reset.
* You may need to rebuild your content using the new block versions.
* We strongly recommend creating a full backup (database + files) before updating.

This update brings a cleaner, more powerful, and more future-proof block system, but it is not backward-compatible with older instances of the plugin.

If you rely heavily on the old block version, consider testing the update in a staging environment first.


== About author ==

“I created this plugin to offer a reliable and modern way to use Bootstrap inside WordPress, helping my clients—and the community—build better interfaces with less effort.”
— Uri Lazcano

I am committed to keeping this project updated, faithful to Bootstrap, and improved with each release.
