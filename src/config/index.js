'use strict';

var config = {
    development: {
        mode: 'development',
        port: 3000
    },
    production: {
        mode: 'production',
        port: 5000
    }
};

module.exports = function(mode) {
    return config[mode || process.argv[2] || 'development'] || config.development;
};