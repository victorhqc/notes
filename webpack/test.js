var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

const baseConfig = require('./base');

var apiPath = path.join(__dirname, '/../api');

var config = _.merge({
    entry: './src/index.js',
    cache: true,
    devServer: {
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}, baseConfig);

config.resolve.alias =  {
    api: path.join(apiPath + '/local.js')
};

config.module.loaders.push({
    test: /\.jsx?$/,
    exclude: [/node_modules/, /bower_components/],
    loader: 'babel-loader',
    query: {
        presets: ['react', 'es2015']
    }
});

module.exports = config;