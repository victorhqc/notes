const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

const baseConfig = require('./base');

const apiPath = path.join(__dirname, '/../api');

const config = _.merge({
    entry: './src/index.jsx',
    cache: false,
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
}, baseConfig);

config.resolve.alias = {
    api: path.join(`${apiPath}/production.js`),
};

config.module.loaders.push({
    test: /\.jsx?$/,
    exclude: [/node_modules/, /bower_components/],
    loader: 'babel',
    query: {
        presets: ['react', 'es2015'],
    },
});

module.exports = config;
