<div <?php echo get_block_wrapper_attributes() ?>>
	<?php
		$latest_posts = get_posts( array(
            // 'posts_per_page' => $attributes[ 'postsToShow' ],
			'posts_per_page' => 1,
			'post_status' => 'publish',
			'fields' => 'ids',
		) );

		if( ! $latest_posts ) {
			echo 'No posts';
		}

		$latest_post_id = reset( $latest_posts );

		printf(
			'<a href="%1$s">%2$s</a>',
			esc_url( get_permalink( $latest_post_id ) ),
			esc_html( get_the_title( $latest_post_id ) )
		);
	?>
</div>