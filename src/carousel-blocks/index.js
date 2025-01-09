/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks'
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor'
import { PanelBody, TextControl, RangeControl, ToggleControl, SelectControl } from '@wordpress/components'
import { useSelect } from '@wordpress/data'

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n'

/**
 * Crear un icono.
 * Import the element creator function (React abstraction layer)
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { createElement } from '@wordpress/element'
const customIcon = createElement(
  'svg',
  { width: 20, height: 20 },
  createElement(
    'path',
    {
      d: 'M10.51,15.06c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm1.93,0c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm2.96-6.23v2.34l1.44-1.17-1.44-1.17ZM1,2.8v14.4H19V2.8H1Zm16.92,13.32H2.08V3.88h15.84v12.24Zm-9.34-1.06c.28-.28,.28-.74,0-1.02-.28-.28-.74-.28-1.02,0-.28,.28-.28,.74,0,1.02,.28,.28,.74,.28,1.02,0Zm-3.98-6.23l-1.44,1.17,1.44,1.17v-2.34Z'
    }
  )
)

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';

/**
 * Internal dependencies
 * - Reemplazadas, necesidad de anidar mas bloques.
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 *
 * Bloques necesarios para carousel.
 * .carousel
 * - .carousel-inner
 * - - .carousel-item
 * - .controls
 * - .inidicators
 *
 * Referencias para anidado.
 * @ref https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
 *
 * No mostrar en inspector.
 * @ref https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
 */
registerBlockType('ekiline-collection/ekiline-carousel-blocks', {
  /**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
  apiVersion: 2,

  /**
	 * Parametros de alta.
	 * @see: https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/
	 */
  title: __('Carousel Blocks', 'ekiline-block-collection'),
  icon: customIcon,
  description: __('Customize the carousel slide by slide, with existing blocks, full control.', 'ekiline-block-collection'),
  category: 'media',
  supports: {
    inserter: true,
    anchor: true,
    align: ['wide', 'full'],
    html: false,
    color: {
      background: true
    }
  },

  /**
	 * Argumentos para personalizacion.
	 */
  attributes: {
    align: {
      type: 'string',
      default: ''
    },
    CountChildren: {
      type: 'number',
      default: ''
    },
    // Controles de carrusel.
    SetColumns: {
      type: 'number',
      default: 1
    },
    AddControls: {
      type: 'boolean',
      default: true
    },
    AddIndicators: {
      type: 'boolean',
      default: true
    },
    SetAuto: {
      type: 'boolean',
      default: true
    },
    SetTime: {
      type: 'number',
      default: '5000'
    },
    SetAnimation: {
      type: 'string',
      default: ''
    },
    SetHeight: {
      type: 'number',
      default: '480'
    }
  },

  /**
	 * Se ocupara contexto para pasar valores.
	 * @link https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/
	 */
  providesContext: {
    'ekiline-carousel-blocks/height': 'SetHeight'
  },

  /**
	 * @see ./edit.js
	 */
  // edit: Edit,
  edit: (props) => {
    const { attributes, setAttributes } = props

    const PARENT_ALLOWED_BLOCKS = ['ekiline-collection/ekiline-carousel-blocks-content']
    const CHILD_TEMPLATE = [
      ['ekiline-collection/ekiline-carousel-blocks-content', {
        className: 'carousel-item active'
      }],
      ['ekiline-collection/ekiline-carousel-blocks-content', {
        className: 'carousel-item'
      }]
    ]

    // Personalizar clase.
    const blockProps = useBlockProps({
      className: 'carousel-wrapper'
    })

    // Precargar nombre ID.
    if (!attributes.anchor) {
      function getRandomArbitrary (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      }
      setAttributes({ anchor: 'carouselblocks' + getRandomArbitrary(10, 150) })
    }

    // Obtener el indice de los bloques agregados.
    const { clientId } = props
    const innerBlockCount = useSelect((select) => select('core/block-editor').getBlock(clientId).innerBlocks)
    setAttributes({ CountChildren: innerBlockCount.length })

    return (
      <div {...blockProps}>

        {/* Inspector controles */}
        <InspectorControls>

          {/* Caracteristicas de carrusel, controles. */}
          <PanelBody title={__('Carousel Look', 'ekiline-block-collection')} initialOpen>
            <RangeControl
              label={__('Columns', 'ekiline-block-collection')}
              value={attributes.SetColumns}
              onChange={(newval) =>
							  setAttributes({ SetColumns: parseInt(newval) })}
              min={1}
              max={4}
            />

            <ToggleControl
              label={__('Show controls', 'ekiline-block-collection')}
              checked={attributes.AddControls}
              onChange={(AddControls) =>
							  setAttributes({ AddControls })}
            />

            <ToggleControl
              label={__('Show indicators', 'ekiline-block-collection')}
              checked={attributes.AddIndicators}
              onChange={(AddIndicators) =>
							  setAttributes({ AddIndicators })}
            />

            <ToggleControl
              label={__('Auto start', 'ekiline-block-collection')}
              checked={attributes.SetAuto}
              onChange={(SetAuto) => setAttributes({ SetAuto })}
            />

            <TextControl
              label={__('Transition in milliseconds', 'ekiline-block-collection')}
              type='number'
              value={attributes.SetTime}
              onChange={(newval) =>
							  setAttributes({ SetTime: parseInt(newval) })}
              min={0}
            />

            <SelectControl
              label={__('Animation type', 'ekiline-block-collection')}
              value={attributes.SetAnimation}
              options={[
							  { label: __('Default', 'ekiline-block-collection'), value: '' },
							  { label: __('Fade', 'ekiline-block-collection'), value: 'fade' },
							  { label: __('Vertical', 'ekiline-block-collection'), value: 'vertical' }
              ]}
              onChange={(SetAnimation) =>
							  setAttributes({ SetAnimation })}
            />

            <TextControl
              label={__('Height in pixels.', 'ekiline-block-collection')}
              type='number'
              value={attributes.SetHeight}
              onChange={(newval) =>
							  setAttributes({ SetHeight: parseInt(newval) })}
              min={0}
              help={(attributes.SetHeight === 0) ? __('Zero sets carousel at full display height.', 'ekiline-block-collection') : ''}
            />
          </PanelBody>
          {/* fin controles  */}

        </InspectorControls>

        <InnerBlocks
          allowedBlocks={PARENT_ALLOWED_BLOCKS}
          template={CHILD_TEMPLATE}
        />
        {/* {console.log(attributes.CountChildren)} */}
      </div>
    )
  },

  /**
	 * @see ./save.js
	 */
  // save,
  save: ({ attributes }) => {
    // Al inicio del componente, todas las variables.
    const carId = `#${attributes.anchor}`
    const carCol = (attributes.SetColumns > 1) ? ' carousel-multiple x' + attributes.SetColumns : ''
    const carAni = (attributes.SetAnimation) ? ' carousel-' + attributes.SetAnimation : ''
    const carStr = (attributes.SetAuto) ? 'carousel' : null
    // Reglas CSS inline.
    const min_height = { height: (attributes.SetHeight !== 0) ? attributes.SetHeight + 'px' : '100vh' }

    // personalizar attributos.
    const blockProps = useBlockProps.save({
      className: 'carousel-wrapper carousel slide' + carCol + carAni,
      'data-bs-ride': carStr,
      'data-bs-Interval': attributes.SetTime,
      style: min_height
    })

    return (
      <div {...blockProps}>
        {/* Indicadores. */}
        {attributes.AddIndicators &&
				  attributes.CountChildren && (
  <div className='carousel-indicators'>
    {Array.from({ length: attributes.CountChildren }).map((_, i) => (
      <button
        key={i}
        type='button'
        data-bs-target={carId}
        data-bs-slide-to={i}
        className={i === 0 ? 'active' : null}
        aria-current={i === 0 ? 'true' : null}
        aria-label={`Slide ${i + 1}`}
      />
    ))}
  </div>
        )}

        {/* Contenido */}
        <div className='carousel-inner'>
          <InnerBlocks.Content />
        </div>

        {attributes.AddControls && (
          <div>
            <button class='carousel-control-prev' type='button' data-bs-target={carId} data-bs-slide='prev'>
              <span class='carousel-control-prev-icon' aria-hidden='true' />
              <span class='visually-hidden'>Previous</span>
            </button>
            <button class='carousel-control-next' type='button' data-bs-target={carId} data-bs-slide='next'>
              <span class='carousel-control-next-icon' aria-hidden='true' />
              <span class='visually-hidden'>Next</span>
            </button>
          </div>
        )}

      </div>
    )
  }
})

/**
 * - - carousel-blocks-content
 */

registerBlockType('ekiline-collection/ekiline-carousel-blocks-content', {
  title: __('Carousel Content', 'ekiline-block-collection'),
  parent: ['ekiline-collection/ekiline-carousel-blocks'],
  icon: 'feedback',
  description: __('Inner carousel content.', 'ekiline-block-collection'),
  category: 'design',
  // Se ocupa contexto para pasar valores desde el padre, en este caso el ID.
  usesContext: ['ekiline-carousel-blocks/height'],
  supports: {
    anchor: true,
    html: false,
    reusable: false,
    color: {
      background: true
    }
  },
  attributes: {
    parentHeight: {
      type: 'number',
      default: '480'
    }
  },
  edit: (props) => {
    const { attributes, setAttributes } = props

    // Cargar un preset.
    const CHILD_TEMPLATE = [
      ['core/paragraph', { content: __('Add your blocks', 'ekiline-block-collection') }]
    ]

    // Precargar altura Padre en objetos internos.
    if (!attributes.parentHeight || (attributes.parentHeight !== props.context['ekiline-carousel-blocks/height'])) {
      setAttributes({
        parentHeight: props.context['ekiline-carousel-blocks/height']
      })
    }

    // personalizar atributos.
    const blockProps = useBlockProps({
      className: 'carousel-content'
    })

    return (
      <div {...blockProps}>
        <InnerBlocks
          template={CHILD_TEMPLATE}
        />
      </div>
    )
  },

  save: ({ attributes }) => {
    // Reglas CSS inline.
    const min_height = { height: (attributes.parentHeight !== 0) ? attributes.parentHeight + 'px' : '100vh' }

    // Clases y atributos auxiliares, incluir save.
    const blockProps = useBlockProps.save({
      className: 'carousel-content carousel-item',
      style: min_height
    })

    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    )
  }

})
