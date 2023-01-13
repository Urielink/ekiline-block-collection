/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
 import { __ } from '@wordpress/i18n';

 /**
  * React hook that is used to mark the block wrapper element.
  * It provides all the necessary props like the class name.
  *
  * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
  */
 import{useBlockProps,InspectorControls,MediaUpload,MediaUploadCheck,} from '@wordpress/block-editor';
 import{ToggleControl,PanelBody,SelectControl,Button,TextControl,RangeControl,} from '@wordpress/components';
 import ServerSideRender from '@wordpress/server-side-render';
 
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
 import { withSelect } from '@wordpress/data';
 
//  const setClassName = () => {
// 	 var rand = Math.floor( Math.random() * 100 ) + 1,
// 		 name = 'ekiline-box-' + rand + '-wrapper';
// 	 return name;
//  }
 
 /**
  * The edit function describes the structure of your block in the context of the
  * editor. This represents what the editor will render when the block is used.
  *
  * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
  *
  * @return {WPElement} Element to render.
  */
 export default function Edit(props) {
 
	 const { attributes, setAttributes, blockProps = useBlockProps() } = props;
	//  const boxClass = setClassName();
 
	 // Componente dinamico: categoriasss.
	 const MyCategoryList = ( { categories } ) => {
		 if ( categories ){
			 return (
				 <SelectControl
					 multiple
					 label={ __( 'Choose category', 'ekiline-collection' ) }
					 value={ attributes.SetIds }
					 options={ categories.map( ( category ) => (
						 { label: category.name, value: category.id }
					 ) ) }
					 onChange={ ( newval ) =>
						 setAttributes( { SetIds: newval } )
					 }
					 style={ { height: 'auto' } }
				 />
			 )
		 } else {
			 return (
				 <></>
			 )
		 }
	 }
 
	 const MyCategorySelect = withSelect( ( select ) => ( {
		 categories: select( 'core' ).getEntityRecords( 'taxonomy', 'category', { per_page: -1 } ),
	 } ) )( MyCategoryList );
 
	 return (
		 <div {...blockProps}>
			<InspectorControls>
				<PanelBody title={ __( 'Carousel content', 'ekiline-collection' ) } initialOpen={ true }>

					<SelectControl
						label={ __( 'Content type', 'ekiline-collection' ) }
						value={ attributes.ChooseType }
						options={ [
							{ label: __( 'Posts', 'ekiline-collection' ), value: 'posts' },
							{ label: __( 'Images / Video', 'ekiline-collection' ), value: 'images' },
						] }
						onChange={ ( ChooseType ) =>
							setAttributes( { ChooseType } )
						}
					/>

					{ 'posts' === attributes.ChooseType && (
						<MyCategorySelect/>
					)}

					{ 'images' === attributes.ChooseType && (
						<MediaUploadCheck>
							<MediaUpload
								title={ __( 'Carousel Images', 'ekiline-collection' ) }
								onSelect={ ( media ) => {
									const img_ids = [];
									for (
										let i = 0, max = media.length;
										i < max;
										i += 1
									) {
										img_ids.push( media[ i ].id );
									}
									setAttributes( { SetIds: img_ids } );
								} }
								// ref: https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-upload/README.md.
								allowedTypes={ [ 'image', 'video' ] }
								multiple={ true }
								value={ attributes.SetIds }
								render={ ( { open } ) => (
									<Button variant="secondary" onClick={ open }>
										{ __( 'Add images', 'ekiline-collection' ) }
									</Button>
								) }
								gallery={ false }
								addToGallery={ false }
							/>
						</MediaUploadCheck>
					) }

					{ 'posts' === attributes.ChooseType && (
						<TextControl
							label={ __( 'Post amount', 'ekiline-collection' ) }
							type="number"
							value={ attributes.SetAmount }
							onChange={ ( newval ) =>
								setAttributes( {
									SetAmount: parseInt( newval ),
								} )
							}
						/>
					) }

					{ 'posts' === attributes.ChooseType && (
						<SelectControl
							label={ __( 'Sort by', 'ekiline-collection' ) }
							value={ attributes.SetOrderBy }
							options={ [
								{ label: __( 'Date', 'ekiline-collection' ), value: 'date' },
								{ label: __( 'Modified', 'ekiline-collection' ), value: 'modified' },
								{ label: __( 'Title', 'ekiline-collection' ), value: 'title' },
								{ label: __( 'Name', 'ekiline-collection' ), value: 'name' },
								{ label: __( 'Author', 'ekiline-collection' ), value: 'author' },
								{ label: __( 'Random', 'ekiline-collection' ), value: 'rand' },
							] }
							onChange={ ( SetOrderBy ) =>
								setAttributes( { SetOrderBy } )
							}
						/>
					) }

					{ 'posts' === attributes.ChooseType && (
						<SelectControl
							label={ __( 'Find a block in content', 'ekiline-collection' ) }
							value={ attributes.FindBlock }
							options={ [
								{ label: __( 'None', 'ekiline-collection' ), value: 'none' },
								{ label: __( 'Cover', 'ekiline-collection' ), value: 'core/cover' },
								{ label: __( 'Image', 'ekiline-collection' ), value: 'core/image' },
								{ label: __( 'Media and text', 'ekiline-collection' ), value: 'core/media-text' },
								{ label: __( 'Video', 'ekiline-collection' ), value: 'core/video' },
							] }
							onChange={ ( FindBlock ) =>
								setAttributes( { FindBlock } )
							}
						/>
					) }

					{ 'none' !== attributes.FindBlock && (
						<ToggleControl
							label={ __( 'Show post if there is no block', 'ekiline-collection' ) }
							checked={ attributes.AllowMixed }
							onChange={ ( AllowMixed ) =>
								setAttributes( { AllowMixed } )
							}
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Carousel Look', 'ekiline-collection' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Columns', 'ekiline-collection' ) }
						value={ attributes.SetColumns }
						onChange={ ( newval ) =>
							setAttributes( { SetColumns: parseInt( newval ) } )
						}
						min={ 1 }
						max={ 4 }
					/>

					<ToggleControl
						label={ __( 'Show controls', 'ekiline-collection' ) }
						checked={ attributes.AddControls }
						onChange={ ( AddControls ) =>
							setAttributes( { AddControls } )
						}
					/>

					<ToggleControl
						label={ __( 'Show indicators', 'ekiline-collection' ) }
						checked={ attributes.AddIndicators }
						onChange={ ( AddIndicators ) =>
							setAttributes( { AddIndicators } )
						}
					/>

				{/* Opcion de controles */}
				{ attributes.SetColumns === 1
					&& (<ToggleControl
						label={ __( 'Show text indicators', 'ekiline-collection' ) }
						checked={ attributes.AddIndicatorsText }
						onChange={ ( AddIndicatorsText ) =>
							setAttributes( { AddIndicatorsText } )
						}
				/>)}

					<ToggleControl
						label={ __( 'Auto start', 'ekiline-collection' ) }
						checked={ attributes.SetAuto }
						onChange={ ( SetAuto ) => setAttributes( { SetAuto } ) }
					/>

				<ToggleControl
					label={ __( 'Show caption', 'ekiline-collection' ) }
					checked={ attributes.ShowCaption }
					onChange={ ( ShowCaption ) => setAttributes( { ShowCaption } ) }
				/>

				{/* Opcion de enlaces */}
				{ attributes.ShowCaption
					&& ( <ToggleControl
							label={ __( 'Link titles', 'ekiline-collection' ) }
							checked={ attributes.SetLinks }
							onChange={ ( SetLinks ) => setAttributes( { SetLinks } ) }
					/> )}

					<TextControl
						label={ __( 'Transition in milliseconds', 'ekiline-collection' ) }
						type="number"
						value={ attributes.SetTime }
						onChange={ ( newval ) =>
							setAttributes( { SetTime: parseInt( newval ) } )
						}
					/>

					<SelectControl
						label={ __( 'Animation type', 'ekiline-collection' ) }
						value={ attributes.SetAnimation }
						options={ [
							{ label: __( 'Default', 'ekiline-collection' ), value: '' },
							{ label: __( 'Fade', 'ekiline-collection' ), value: 'fade' },
							{ label: __( 'Vertical', 'ekiline-collection' ), value: 'vertical' },
						] }
						onChange={ ( SetAnimation ) =>
							setAttributes( { SetAnimation } )
						}
					/>

					<TextControl
						label={ __( 'Height in pixels, set zero to see full display height.', 'ekiline-collection' ) }
						type="number"
						value={ attributes.SetHeight }
						onChange={ ( newval ) =>
							setAttributes( { SetHeight: parseInt( newval ) } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<ServerSideRender
				block="ekiline-collection/ekiline-carousel"
				attributes={ props.attributes }
			/>
 
		 </div>
	 );
 }
 