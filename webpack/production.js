var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

const baseConfig = require('./base');

var apiPath = path.join(__dirname, '/../api');

var config = _.merge({
    entry: './src/index.js',
    cache: false,
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}, baseConfig);

config.resolve.alias =  {
    api: path.join(apiPath + '/production.js')
};

config.module.loaders.push({
    test: /\.jsx?$/,
    exclude: [/node_modules/, /bower_components/],
    loader: 'babel',
    query: {
        presets: ['react', 'es2015']
    }
});

module.exports = config;
