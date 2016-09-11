const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

const baseConfig = require('./base');

const apiPath = path.join(__dirname, '/../api');

const config = _.merge({
    entry: './src/index.jsx',
    cache: true,
    devServer: {
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
}, baseConfig);

config.resolve.alias = {
    api: path.join(`${apiPath}/local.js`),
};

config.module.loaders.push({
    test: /\.jsx?$/,
    exclude: [/node_modules/, /bower_components/],
    loader: 'react-hot',
});

config.module.loaders.push({
    test: /\.jsx?$/,
    exclude: [/node_modules/, /bower_components/],
    loader: 'babel-loader',
    query: {
        presets: ['react', 'es2015'],
    },
});

module.exports = config;
