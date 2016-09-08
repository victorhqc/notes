const path = require('path');

const local = require(path.join(__dirname, 'webpack/local'));
const production = require(path.join(__dirname, 'webpack/production'));

// List of allowed environments
const allowedEnvs = ['local', 'production'];

// Set the correct environment
const env = process.env.NODE_ENV || 'local';

// Get available configurations
const configs = {
    local,
    production,
};

/**
* Get an allowed environment
* @param  {String}  env
* @return {String}
*/
function getValidEnv(environment) {
    const isValid = environment && environment.length > 0 && allowedEnvs.indexOf(environment) !== -1;
    return isValid ? environment : 'local';
}

/**
* Build the webpack configuration
* @param  {String} env Environment to use
* @return {Object} Webpack config
*/
function buildConfig(environment) {
    const usedEnv = getValidEnv(environment);
    return configs[usedEnv];
}

module.exports = buildConfig(env);
