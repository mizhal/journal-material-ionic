// karma.conf.js
module.exports = function(config) {
  config.set(
      {
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            // LIBS
            "./www/lib/faker.min.js",
            './www/lib/ionic/js/ionic.bundle.js',
            './www/lib/ionic-material/dist/ionic.material.min.js',
            './www/lib/angular-locale_es-es.js',
            './www/lib/angular-messages.min.js',
            './www/lib/angular-mocks-1.5.5.js',
            './www/lib/pouchdb/pouchdb-5.3.2.min.js',
            './www/lib/hashids.min.js',
            './www/lib/ionic-datepicker.bundle.min.js',
            './www/lib/bluebird.js',
            "./www/lib/require.js",
            'cordova.js',
            // END: LIBS

            // APP
            './www/js/app.js',
            './www/js/controllers.js',
            './www/js/directives.js',
            './www/js/services.js',
            './www/js/service-localdb.js',
            './www/js/quests/controllers.js',
            './www/js/quests/directives.js',
            './www/js/quests/services.js',
            './www/js/quests/seed.js',
            // END: APP

            // TESTS
            './spec/unit/**/*.js'
            // END: TESTS
        ],
        browsers: ['Chrome'], // 'PhantomJS', 
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