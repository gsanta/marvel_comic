'use strict';

module.exports = function(karma) {
    karma.set({

        frameworks: [ 'jasmine', 'browserify' ],

        files: [
            'test/**/*Test.js'
        ],

        reporters: [ 'dots' ],

        preprocessors: {
            'test/**/*Test.js': [ 'browserify' ]
        },

        browsers: [ 'PhantomJS' ],

        logLevel: 'LOG_DEBUG',

        singleRun: true,
        autoWatch: false,

        // browserify configuration
        browserify: {
            debug: true,
            transform: []
        }
    });
};