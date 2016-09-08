module.exports = {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        inline: true,
        historyApiFallback: true,
        contentBase: './src',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css',
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|svg|ttf)/,
                loader: 'url-loader?limit=8192',
            },
        ],
    },
};
