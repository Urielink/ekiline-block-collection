/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n'

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
  useBlockProps,
  InspectorControls,
  BlockControls,
  MediaUpload,
  MediaUploadCheck
} from '@wordpress/block-editor'

import {
  ToggleControl,
  PanelBody,
  SelectControl,
  ToolbarGroup,
  ToolbarItem,
  Button,
  TextControl,
  RangeControl
} from '@wordpress/components'

import ServerSideRender from '@wordpress/server-side-render'

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './editor.scss';

/**
 * Funciones personalizadas.
 * withSelect se ocupara para obtener datos del core.
 * Classname dinamica para el envoltorio del carrusel.
 */
import { withSelect } from '@wordpress/data'

const setClassName = () => {
  const rand = Math.floor(Math.random() * 100) + 1
  const name = 'ekiline-box-' + rand + '-wrapper'
  return name
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit (props) {
  const { attributes, setAttributes, blockProps = useBlockProps() } = props
  const boxClass = setClassName()

  // Componente dinamico: categoriasss.
  const MyCategoryList = ({ categories }) => {
    if (categories) {
      return (
        <SelectControl
          multiple
          label={__('Choose category', 'ekiline-carousel')}
          value={attributes.SetIds}
          options={categories.map((category) => (
					  { label: category.name, value: category.id }
          ))}
          onChange={(newval) =>
					  setAttributes({ SetIds: newval })}
          style={{ height: 'auto' }}
        />
      )
    } else {
      return (
        <></>
      )
    }
  }

  const MyCategorySelect = withSelect((select) => ({
    categories: select('core').getEntityRecords('taxonomy', 'category', { per_page: -1 })
  }))(MyCategoryList)

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Carousel content', 'ekiline-carousel')} initialOpen>

          <SelectControl
            label={__('Content type', 'ekiline-carousel')}
            value={attributes.ChooseType}
            options={[
						  { label: __('Posts', 'ekiline-carousel'), value: 'posts' },
						  { label: __('Images / Video', 'ekiline-carousel'), value: 'images' }
            ]}
            onChange={(ChooseType) =>
						  setAttributes({ ChooseType })}
          />

          {attributes.ChooseType === 'posts' && (
            <MyCategorySelect />
          )}

          {attributes.ChooseType === 'images' && (
            <MediaUploadCheck>
              <MediaUpload
                title={__('Carousel Images', 'ekiline-carousel')}
                onSelect={(media) => {
								  const img_ids = []
                  for (
								    let i = 0, max = media.length;
								    i < max;
								    i += 1
								  ) {
								    img_ids.push(media[i].id)
								  }
								  setAttributes({ SetIds: img_ids })
                }}
								// ref: https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-upload/README.md.
                allowedTypes={['image', 'video']}
                multiple
                value={attributes.SetIds}
                render={({ open }) => (
                  <Button isSecondary onClick={open}>
                    {__('Add images', 'ekiline-carousel')}
                  </Button>
                )}
                gallery={false}
                addToGallery={false}
              />
            </MediaUploadCheck>
          )}

          {attributes.ChooseType === 'posts' && (
            <TextControl
              label={__('Post amount', 'ekiline-carousel')}
              type='number'
              value={attributes.SetAmount}
              onChange={(newval) =>
							  setAttributes({
							    SetAmount: parseInt(newval)
							  })}
            />
          )}

          {attributes.ChooseType === 'posts' && (
            <SelectControl
              label={__('Sort by', 'ekiline-carousel')}
              value={attributes.SetOrderBy}
              options={[
							  { label: __('Date', 'ekiline-carousel'), value: 'date' },
							  { label: __('Modified', 'ekiline-carousel'), value: 'modified' },
							  { label: __('Title', 'ekiline-carousel'), value: 'title' },
							  { label: __('Name', 'ekiline-carousel'), value: 'name' },
							  { label: __('Author', 'ekiline-carousel'), value: 'author' },
							  { label: __('Random', 'ekiline-carousel'), value: 'rand' }
              ]}
              onChange={(SetOrderBy) =>
							  setAttributes({ SetOrderBy })}
            />
          )}

          {attributes.ChooseType === 'posts' && (
            <SelectControl
              label={__('Find a block in content', 'ekiline-carousel')}
              value={attributes.FindBlock}
              options={[
							  { label: __('None', 'ekiline-carousel'), value: 'none' },
							  { label: __('Cover', 'ekiline-carousel'), value: 'core/cover' },
							  { label: __('Image', 'ekiline-carousel'), value: 'core/image' },
							  { label: __('Media and text', 'ekiline-carousel'), value: 'core/media-text' },
							  { label: __('Video', 'ekiline-carousel'), value: 'core/video' }
              ]}
              onChange={(FindBlock) =>
							  setAttributes({ FindBlock })}
            />
          )}

          {attributes.FindBlock !== 'none' && (
            <ToggleControl
              label={__('Show post if there is no block', 'ekiline-carousel')}
              checked={attributes.AllowMixed}
              onChange={(AllowMixed) =>
							  setAttributes({ AllowMixed })}
            />
          )}
        </PanelBody>

        <PanelBody title={__('Carousel Look', 'ekiline-carousel')} initialOpen={false}>
          <RangeControl
            label={__('Columns', 'ekiline-carousel')}
            value={attributes.SetColumns}
            onChange={(newval) =>
						  setAttributes({ SetColumns: parseInt(newval) })}
            min={1}
            max={4}
          />

          <ToggleControl
            label={__('Show controls', 'ekiline-carousel')}
            checked={attributes.AddControls}
            onChange={(AddControls) =>
						  setAttributes({ AddControls })}
          />

          <ToggleControl
            label={__('Show indicators', 'ekiline-carousel')}
            checked={attributes.AddIndicators}
            onChange={(AddIndicators) =>
						  setAttributes({ AddIndicators })}
          />

          <ToggleControl
            label={__('Auto start', 'ekiline-carousel')}
            checked={attributes.SetAuto}
            onChange={(SetAuto) => setAttributes({ SetAuto })}
          />

          <TextControl
            label={__('Transition in milliseconds', 'ekiline-carousel')}
            type='number'
            value={attributes.SetTime}
            onChange={(newval) =>
						  setAttributes({ SetTime: parseInt(newval) })}
          />

          <SelectControl
            label={__('Animation type', 'ekiline-carousel')}
            value={attributes.SetAnimation}
            options={[
						  { label: __('Default', 'ekiline-carousel'), value: '' },
						  { label: __('Fade', 'ekiline-carousel'), value: 'fade' },
						  { label: __('Vertical', 'ekiline-carousel'), value: 'vertical' }
            ]}
            onChange={(SetAnimation) =>
						  setAttributes({ SetAnimation })}
          />

          <TextControl
            label={__('Height in pixels, set zero to see full display height.', 'ekiline-carousel')}
            type='number'
            value={attributes.SetHeight}
            onChange={(newval) =>
						  setAttributes({ SetHeight: parseInt(newval) })}
          />
        </PanelBody>
      </InspectorControls>

      <BlockControls>
        <ToolbarGroup>
          <ToolbarItem
            as={Button}
            icon='dashicons dashicons-visibility'
            title={__('Preview', 'ekiline-carousel')}
            onClick={() => {
						  ekiline_transformarCarrusel(
						    '.' + boxClass + ' .carousel-multiple'
						  )
            }}
          />
        </ToolbarGroup>
      </BlockControls>

      <div className={boxClass}>
        <div>
          <ServerSideRender
            block='ekiline-blocks/ekiline-carousel'
            attributes={props.attributes}
          />
        </div>
      </div>

    </div>
  )
}
