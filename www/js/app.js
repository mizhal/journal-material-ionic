angular.module('journal-material', [
  'ionic', 
  //'ionic-material',
  
  'journal-material.controllers', 
  'journal-material.services',

  /** QUESTS MODULE **/
  'journal-material.Quests.controllers',
  'journal-material.Quests.services',
  'journal-material.Quests.directives'
  /** FIN: QUESTS MODULE **/

])

.run(function($ionicPlatform) {
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
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MainCtrl'
  })

  /*** QUESTS MODULE **/
  .state('app.quests', {
    url: '/quests',
    views:{
      content: {
        templateUrl: 'templates/quests/main.html',
        controller: 'journal-material.Quests.controllers.MainCtrl'
      },
      "context-menu": {
        template: 'templates/quests/context-menu.html',
        controller: function(){}
      }
    } 
  })

  .state('app.quests-focus', {
    url: '/focus',
    views: {
      content: {
        templateUrl: 'templates/quests/focus.html',
        controller: 'journal-material.Quests.controllers.FocusCtrl'
      },
      "context-menu": {
        template: 'templates/quests/context-menu.html',
        controller: function(){}
      }
    }
  })

  .state('app.quests-listings', {
    url: '/quests/list/{status}',
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

  .state('app.quest-edit', {
    url: '/quests/edit/{id}',
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

  .state('app.quest-detail', {
    url: '/quests/show/{id}',
    views: {
      content: {
        templateUrl: 'templates/quests/detail.html',
        controller: 'journal-material.Quests.DetailCtrl'
      },
      "context-menu": {
        template: 'templates/quests/context-menu.html',
        controller: function(){}
      }
    }
  })

  /*** END: QUESTS MODULE **/

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/quests');

});
