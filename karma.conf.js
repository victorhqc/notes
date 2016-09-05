const webpackConfig = require('./webpack/test');

webpackConfig.devtool = 'inline-source-map';

module.exports = function configkarma(config) {
    config.set({
        browsers: ['PhantomJS'],
        singleRun: true,
        frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai', 'es6-shim'],
        files: [
            'node_modules/whatwg-fetch/fetch.js',
            'tests.webpack.js',
        ],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-mocha-reporter',
            'karma-sinon',
            'karma-sinon-chai',
            'karma-es6-shim',
            'karma-nyan-reporter',
            'karma-eslint',
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap', 'eslint'],
        },
        reporters: ['mocha'],
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true,
        },
        autoWatch: true,
    });
};
