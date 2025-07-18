/**
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/
 * metadata
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#render
 * dynamic blocks
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/
 * Otra aproximación
 * @see https://rudrastyh.com/gutenberg/dynamic-blocks.html
 */

import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';

export function DynamicEdit() {
    
  const posts = useSelect( ( select ) => {
    return select( 'core' ).getEntityRecords( 'postType', 'post' );
  }, [] );

  return (
    <div { ...useBlockProps() }>
      { ! posts && 'Loading' }
      { posts && 0 === posts.length && 'No Posts' }
      { posts && posts.length > 0 && (
        <a href={ posts[ 0 ].link }>
          { posts[ 0 ].title.rendered }
        </a>
      ) }
    </div>
  );

}

export function DynamicSave() {
    return null;
}
