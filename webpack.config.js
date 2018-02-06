var webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
