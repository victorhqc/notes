'use strict';

var path = require('path');
var args = require('minimist')(process.argv.slice(2));

// List of allowed environments
const allowedEnvs = ['development', 'production'];

// Set the correct environment
const env = process.env.NODE_ENV || 'development';

// Get available configurations
var configs = {
  development: require(path.join(__dirname, 'webpack/development')),
  production: require(path.join(__dirname, 'webpack/production'))
};

/**
 * Get an allowed environment
 * @param  {String}  env
 * @return {String}
 */
function getValidEnv(env) {
  var isValid = env && env.length > 0 && allowedEnvs.indexOf(env) !== -1;
  return isValid ? env : 'development';
}

/**
 * Build the webpack configuration
 * @param  {String} env Environment to use
 * @return {Object} Webpack config
 */
function buildConfig(env) {
  var usedEnv = getValidEnv(env);
  return configs[usedEnv];
}

module.exports = buildConfig(env);
