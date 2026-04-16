const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
module.exports = {
    ...defaultConfig,
    entry: {
        ...defaultConfig.entry(),
        index: './src/index.js',
        'ekiline-bootstrap': './src/ekiline-bootstrap.scss',
        'ekiline-popovers': './src/shared/ekiline-popovers.js',
    },
};