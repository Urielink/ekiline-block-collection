/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * Bloques permitidos.
 */
const ALLOWED_BLOCKS = [ 'core/cover', 'core/group' ];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes, context } = props;

    const blockProps = useBlockProps({
      className: 'carousel-slide preview-carousel-item'
    })

	// Add style to block
	setAttributes({ parentSetHeight: context['ekiline-carousel/SetHeight'] });
	blockProps.style = { height: attributes.parentSetHeight };

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ [
					[
						'core/cover',
						{
							"dimRatio":30,
							"overlayColor":"black",
							"isUserOverlayColor":true,
							"isDark":false,
							"style":{
								"elements":{
									"link":{
										"color":{
											"text":"var:preset|color|black"
										}
									}
								}
							},
							"textColor":"black"
						},
						[
							[ 'core/image' ],
							[ 'core/heading', { placeholder: __('Slide title', 'ekiline-block-collection') } ],
							[ 'core/paragraph', { placeholder: __('Slide description', 'ekiline-block-collection') } ],
							[ 'core/buttons', {},
								[
									[ 'core/button', { placeholder: __('Slide Button', 'ekiline-block-collection') } ]
								]
							]
						]
					]
				] }
				templateLock={ false }
			/>
		</div>
	);
}
