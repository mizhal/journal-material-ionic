// karma.conf.js
module.exports = function(config) {
  config.set(
      {
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            // LIBS
            './www/lib/ionic/js/ionic.bundle.js',
            './www/lib/ionic-material/dist/ionic.material.min.js',
            './www/lib/angular-locale_es-es.js',
            './www/lib/angular-messages.min.js',
            './www/lib/pouchdb/pouchdb-5.3.2.min.js',
            './www/lib/hashids.min.js',
            './www/lib/ionic-datepicker.bundle.min.js',
            './www/lib/bluebird.js',
            'cordova.js',
            // END: LIBS

            // APP
            './www/js/*.js',
            './www/js/quests/*.js',
            // END: APP

            // TESTS
            './spec/unit/**/*.js'
            // END: TESTS
        ],
        browsers: ['PhantomJS', 'Chrome'],
        reporters: ['progress', 'coverage'],
        preprocessors: {
            './www/js/*.js': ['coverage'],
            './www/js/quests/*.js': ['coverage']
        },
        coverageReporter: {
          type : 'html',
          dir : 'coverage/'
        },
        singleRun: true,
      }
  );
};