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
import{useBlockProps,InspectorControls,MediaUpload,MediaUploadCheck} from '@wordpress/block-editor';
import{ToggleControl,PanelBody,SelectControl,Button,TextControl,RangeControl} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Funciones personalizadas.
 * Selector de categorias con busqueda.
 */
import { FormTokenField } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './editor.scss';

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

	/**
	 * Selector de categorias, maneja la informacion que se guarda en el bloque.
	 * @param {*} attributes Accede a los registros en el bloque.
	 * @param {*} setAttributes Actualiza los registros en el bloque.
	 * @returns Custom component: FormTokenField.
	 */
	const TokenCategoriesSelect = ()=>{
		// Array de categorias existentes.
		const categories = useSelect(
			select =>
				select( 'core' ).getEntityRecords( 'taxonomy', 'category', { per_page: -1 } ),
			[]
		);
		// Actualizacion de categorias seleccionadas.
		const [ selectedCategories, setSelectedCategories ] = useState( [] );
		// Componente, necesita de cambiarNombrePorIds.
		return(
			<FormTokenField
				label={ __( 'Find and select categories:', 'ekiline-block-collection' ) }
				value={
					(!attributes.SetCatSlug) ? selectedCategories : attributes.SetCatSlug
				}
				// Mostrar sugerencias por nombre de url. (id, name, slug).
				suggestions={
					categories?.map( ( el ) => el.slug )
				}
				// Varias operaciones: mostrar categorias seleccionadas, actualizar/guardar datos.
				onChange={ ( tokens ) => {
					setSelectedCategories( tokens );
					setAttributes( {
						SetCatSlug:tokens,
						// SetCatIds: (cambiarNombrePorIds(tokens,categories,'id')),
						SetIds: (cambiarNombrePorIds(tokens,categories,'id')),
					} );
				} }
			/>
		);
	};

	/**
	 * Callback para los medios.
	 * @ref https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-upload/README.md.
	 * @param {*} media arreglo de imagenes.
	 */
	const onSelectMedia = ( media ) => {
		const theImagesArray = media?.map( media => media.id )
		setAttributes( { SetIds: theImagesArray } )
	};

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={ __( 'Carousel content', 'ekiline-block-collection' ) } initialOpen={ true }>

					<SelectControl
						label={ __( 'Content type', 'ekiline-block-collection' ) }
						value={ attributes.ChooseType }
						options={ [
							{ label: __( 'Posts', 'ekiline-block-collection' ), value: 'posts' },
							{ label: __( 'Images', 'ekiline-block-collection' ), value: 'images' },
							{ label: __( 'Video + Images', 'ekiline-block-collection' ), value: 'videos' },
						] }
						onChange={ ( ChooseType ) =>
							{ setAttributes( { ChooseType, SetIds: [] } ) }
						}
					/>

					{ 'posts' === attributes.ChooseType && (
						<TokenCategoriesSelect/>
					)}

					{ 'posts' !== attributes.ChooseType && (
						<MediaUploadCheck>
							<MediaUpload
								title={ ( 'images' === attributes.ChooseType ) ? __( 'Carousel Images', 'ekiline-block-collection' ) : __( 'Carousel Video and Images', 'ekiline-block-collection' ) }
								onSelect={ ( media ) => onSelectMedia( media ) }
								allowedTypes={ ( 'images' === attributes.ChooseType ) ? [ 'image' ] : [ 'image', 'video' ] }
								multiple={ true }
								value={ attributes.SetIds }
								render={ ( { open } ) => (
									<Button variant="secondary" onClick={ open }>
										{ attributes.SetIds.length
											? __( 'Manage media', 'ekiline-block-collection' )
											: __( 'Add media', 'ekiline-block-collection' ) }
									</Button>
								) }
								gallery={ ( 'images' === attributes.ChooseType ) ? true : false }
								addToGallery={ ( 'images' === attributes.ChooseType ) ? true : false }
							/>
						</MediaUploadCheck>
					) }

					{ 'posts' === attributes.ChooseType && (
						<TextControl
							label={ __( 'Post amount', 'ekiline-block-collection' ) }
							type="number"
							value={ attributes.SetAmount }
							onChange={ ( newval ) =>
								setAttributes( {
									SetAmount: parseInt( newval ),
								} )
							}
							min={2}
							max={20}
						/>
					) }

					{ 'posts' === attributes.ChooseType && (
						<SelectControl
							label={ __( 'Sort by', 'ekiline-block-collection' ) }
							value={ attributes.SetOrderBy }
							options={ [
								{ label: __( 'Date', 'ekiline-block-collection' ), value: 'date' },
								{ label: __( 'Modified', 'ekiline-block-collection' ), value: 'modified' },
								{ label: __( 'Title', 'ekiline-block-collection' ), value: 'title' },
								{ label: __( 'Name', 'ekiline-block-collection' ), value: 'name' },
								{ label: __( 'Author', 'ekiline-block-collection' ), value: 'author' },
								{ label: __( 'Random', 'ekiline-block-collection' ), value: 'rand' },
							] }
							onChange={ ( SetOrderBy ) =>
								setAttributes( { SetOrderBy } )
							}
						/>
					) }

					{ 'posts' === attributes.ChooseType && (
						<SelectControl
							label={ __( 'Find a block in content', 'ekiline-block-collection' ) }
							value={ attributes.FindBlock }
							options={ [
								{ label: __( 'None', 'ekiline-block-collection' ), value: 'none' },
								{ label: __( 'Cover', 'ekiline-block-collection' ), value: 'core/cover' },
								{ label: __( 'Image', 'ekiline-block-collection' ), value: 'core/image' },
								{ label: __( 'Media and text', 'ekiline-block-collection' ), value: 'core/media-text' },
								{ label: __( 'Video', 'ekiline-block-collection' ), value: 'core/video' },
							] }
							onChange={ ( FindBlock ) =>
								setAttributes( { FindBlock } )
							}
						/>
					) }

					{ 'posts' === attributes.ChooseType && 'none' !== attributes.FindBlock && (
						<ToggleControl
							label={ __( 'Show posts even if there are no blocks', 'ekiline-block-collection' ) }
							checked={ attributes.AllowMixed }
							onChange={ ( AllowMixed ) =>
								setAttributes( { AllowMixed } )
							}
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Carousel Look', 'ekiline-block-collection' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Columns', 'ekiline-block-collection' ) }
						value={ attributes.SetColumns }
						onChange={ ( newval ) =>
							setAttributes( { SetColumns: parseInt( newval ) } )
						}
						min={ 1 }
						max={ 4 }
					/>

					<ToggleControl
						label={ __( 'Show controls', 'ekiline-block-collection' ) }
						checked={ attributes.AddControls }
						onChange={ ( AddControls ) =>
							setAttributes( { AddControls } )
						}
					/>

					<ToggleControl
						label={ __( 'Show indicators', 'ekiline-block-collection' ) }
						checked={ attributes.AddIndicators }
						onChange={ ( AddIndicators ) =>
							setAttributes( { AddIndicators } )
						}
					/>

				{/* Opcion de controles */}
				{ attributes.SetColumns === 1
					&& (<ToggleControl
						label={ __( 'Add text controls', 'ekiline-block-collection' ) }
						checked={ attributes.AddIndicatorsText }
						onChange={ ( AddIndicatorsText ) =>
							setAttributes( { AddIndicatorsText } )
						}
				/>)}

					<ToggleControl
						label={ __( 'Auto start', 'ekiline-block-collection' ) }
						checked={ attributes.SetAuto }
						onChange={ ( SetAuto ) => setAttributes( { SetAuto } ) }
					/>

				<ToggleControl
					label={ __( 'Show caption', 'ekiline-block-collection' ) }
					checked={ attributes.ShowCaption }
					onChange={ ( ShowCaption ) => setAttributes( { ShowCaption } ) }
				/>

				{/* Opcion de enlaces */}
				{ attributes.ShowCaption
					&& ( <ToggleControl
							label={ 
								'posts' === attributes.ChooseType
									? __( 'Link titles', 'ekiline-block-collection' )
									: __( 'Link images', 'ekiline-block-collection' )
							}
							checked={ attributes.SetLinks }
							onChange={ ( SetLinks ) => setAttributes( { SetLinks } ) }
					/> )}

					<TextControl
						label={ __( 'Transition in milliseconds', 'ekiline-block-collection' ) }
						type="number"
						value={ attributes.SetTime }
						onChange={ ( newval ) =>
							setAttributes( { SetTime: parseInt( newval ) } )
						}
					/>

					<SelectControl
						label={ __( 'Animation type', 'ekiline-block-collection' ) }
						value={ attributes.SetAnimation }
						options={ [
							{ label: __( 'Default', 'ekiline-block-collection' ), value: '' },
							{ label: __( 'Fade', 'ekiline-block-collection' ), value: 'fade' },
							{ label: __( 'Vertical', 'ekiline-block-collection' ), value: 'vertical' },
						] }
						onChange={ ( SetAnimation ) =>
							setAttributes( { SetAnimation } )
						}
					/>

					<TextControl
						label={ __( 'Height in pixels, set -1 to see the full height of the screen on the device.', 'ekiline-block-collection' ) }
						type="number"
						value={ attributes.SetHeight }
						onChange={ ( newval ) =>
							setAttributes( { SetHeight: parseInt( newval ) } )
						}
						min={-1}
					/>
				</PanelBody>
			</InspectorControls>

			<ServerSideRender
				block="ekiline-block-collection/ekiline-carousel"
				attributes={ props.attributes }
			/>

		</div>
	);
}

/**
 * Transformo una cadena id por nombre.
 * Crear nuevo array de categorias por ID.
 * @param {*} nombres slugs (url) de cada categoria.
 * @param {*} matriz grupo de categorias existentes.
 * @param {*} devolucion nombre de dato que buscas obtener, en este caso IDs.
 * @returns array de IDs por cada categoria.
 */
function cambiarNombrePorIds(nombres,matriz,devolucion){
	const agrupoIds = [];
	nombres.forEach(
		(nombre) => {
			// Encontrar objeto por value
			const encontrado = matriz.find((objeto) => (objeto.slug || objeto.id) === nombre);
			agrupoIds.push(encontrado);
		}
	);
	return agrupoIds.map(
		(itm) => itm[devolucion]
	);
}
