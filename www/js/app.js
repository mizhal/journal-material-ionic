angular.module('journal-material', [
  'ionic', 
  'ionic-datepicker',
  'ngMessages',
  'ngSanitize',
  //'ionic-material',
  
  'journal-material.controllers',
  'journal-material.service-localdb', 
  'journal-material.services',
  'journal-material.filters',

  /** QUESTS MODULE **/
  'journal-material.Quests.controllers',
  'journal-material.Quests.services',
  'journal-material.Quests.directives',
  /** FIN: QUESTS MODULE **/

  /** JOURNAL MODULE **/
  'journal-material.Journal.controllers',
  'journal-material.Journal.services',
  'journal-material.Journal.directives'
  /** FIN: JOURNAL MODULE **/  

])

.run([
  "$ionicPlatform",
  "journal-material.service-localdb.DBService",
  function($ionicPlatform, DBService) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  }
])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MainCtrl'
  })

  .state('app.dashboard', {
    url: '/dash',
    views:{
      content: {
        templateUrl: 'templates/dashboard.html',
        controller: function(){}
      },
      "context-menu": {
        templateUrl: 'templates/context-menu.html',
        controller: function(){}
      }
    }
  })

  /*** QUESTS MODULE **/
  .state('app.quests', {
    url: '/quests',
    abstract: true,
    views:{
      content: {
        template: '<ion-nav-view name="content"></ion-nav-view>',
        controller: 'journal-material.Quests.controllers.MainCtrl'
      },
      "context-menu": {
        templateUrl: 'templates/context-menu.html',
        controller: 'journal-material.Quests.controllers.ContextController'
      }
    }
  })

  .state('app.quests.all', {
    url: '/all',
    views:{
      content: {
        templateUrl: 'templates/quests/main.html',
        controller: 'journal-material.Quests.controllers.AllCtrl'
      }
    } 
  })

  .state('app.quests.focus', {
    url: '/focus',
    views: {
      content: {
        templateUrl: 'templates/quests/focus.html',
        controller: 'journal-material.Quests.controllers.FocusCtrl'
      }
    }
  })

  .state('app.quests.listings', {
    url: '/list/{status}',
    views: {
      content: {
        templateUrl: 'templates/quests/listing.html',
        controller: 'journal-material.Quests.controllers.ListingCtrl'
      },
      "context-menu": {
        template: 'templates/quests/context-menu.html',
        controller: function(){}
      }
    }
  })

  .state('app.quests.edit', {
    url: '/edit/{id}',
    views: {
      content: {
        templateUrl: 'templates/quests/edit.html',
        controller: 'journal-material.Quests.controllers.EditCtrl'
      },
      "context-menu": {
        template: 'templates/quests/context-menu.html',
        controller: function(){}
      }
    }
  }) 

  .state('app.quests.detail', {
    url: '/show/{id}',
    views: {
      content: {
        templateUrl: 'templates/quests/detail.html',
        controller: 'journal-material.Quests.controllers.DetailCtrl',
        resolve: {
          questData: ["$stateParams", "journal-material.Quests.services.QuestService",
            function($stateParams, QuestService){
              return QuestService.get($stateParams.id);  
            }
          ]
        }
      }
    }
  })

  /*** END: QUESTS MODULE **/

  /*** CODEX MODULE **/

  .state('app.codex', {
    url: '/codex',
    abstract: true,
    views:{
      content: {
        template: '<ion-nav-view name="content"></ion-nav-view>',
        //controller: 'journal-material.Codex.controllers.CodexCtrl'
      },
      "context-menu": {
        templateUrl: 'templates/context-menu.html',
        //controller: 'journal-material.Codex.controllers.ContextController'
      }
    }
  })

  .state('app.codex.main', {
    url: '/all',
    views:{
      content: {
        templateUrl: 'templates/codex/main.html',
        //controller: 'journal-material.Quests.Codex.MainCtrl'
      }
    }
  })

  /*** END: CODEX MODULE **/

  /*** JOURNAL MODULE ***/
  .state('app.journal', {
    url: '/journal',
    abstract: true,
    views:{
      content: {
        template: '<ion-nav-view name="content"></ion-nav-view>',
        //controller: 'journal-material.Codex.controllers.CodexCtrl'
      },
      "context-menu": {
        templateUrl: 'templates/context-menu.html',
        //controller: 'journal-material.Codex.controllers.ContextController'
      }
    }
  })

  .state('app.journal.main', {
    url: '/all',
    views:{
      content: {
        templateUrl: 'templates/journal/main.html',
        //controller: 'journal-material.Quests.Codex.MainCtrl'
      }
    }
  })

  .state('app.journal.edit', {
    url: '/edit/{quest_id}',
    views: {
      content: {
        templateUrl: 'templates/journal/edit.html',
        controller: 'journal-material.Journal.controllers.EditController'
      }
    }
  })
  /*** END: JOURNAL MODULE ***/

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dash');

});

/*** COMMON FUNCS **/
function local_url(url){
  if(ionic.Platform.isAndroid()){
    return "/android_asset/www" + url;
  } 
  return url;
}
/*** END: COMMON FUNCS **/
