/**
 * 01OCT2024 Selector de entradas, maneja la informacion que se guarda en el bloque.
 * @param {*} attributes Accede a los registros en el bloque.
 * @param {*} setAttributes Actualiza los registros en el bloque.
 * @returns Custom component: FormTokenField.
 */
const TokenPostsSelect = ()=>{
	// Array de entradas existentes.
	const posts = useSelect(
		select =>
			select( coreDataStore ).getEntityRecords('postType', 'post', { per_page: -1 }),
		[]
	);
	// Actualizacion de entradas seleccionadas.
	const [ selectedPosts, setSelectedPosts ] = useState( [] );
	// Componente, necesita de cambiarNombrePorIds.
	return(
		<FormTokenField
			label={ __('Find and select posts:', 'ekiline-collection') }
			value={
				(!attributes.SavePosts) ? selectedPosts : attributes.SavePosts
			}
			// Mostrar sugerencias por nombre de url. (id, name, slug).
			suggestions={
				posts?.map( ( el ) => el.slug )
			}
			// Varias operaciones: mostrar entradas seleccionadas, actualizar/guardar datos.
			onChange={ ( tokens ) => {
				setSelectedPosts( tokens );
				setAttributes( {
					SavePosts:tokens,
					// SaveImages: [],
				} );
			} }
		/>
	);
};


/**
 * Bloque secundario de entradas individuales.
 * Dato, elegir segun el postType: page/post.
 * Atributos de query:
 * per_page, categories = numero entero
 *
 * @returns Custom component: EntriesList.
 */
function SingleEntriesList({attributes}) {

	console.log('atts',attributes)
	const queryPosts = {
		include: attributes.SetPostIds,
	}
	console.log('atts2',queryPosts)

	const posts = useSelect(
		select =>
			select( coreDataStore ).getEntityRecords( 'postType', 'post', queryPosts ),
		[]
	);
	console.log('atts3',posts)

	return <PostsList posts={ posts }/>;
}