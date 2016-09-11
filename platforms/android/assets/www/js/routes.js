angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'pages/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.refer', {
    url: '/refer',
    views: {
      'side-menu21': {
        templateUrl: 'pages/refer.html',
        controller: 'referCtrl'
      }
    }
  })

  .state('menu.kauhale', {
    url: '/kauhale',
    views: {
      'side-menu21': {
        templateUrl: 'pages/kauhale.html',
        controller: 'kauhaleCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'pages/menu.html',
    abstract:true
  })

  .state('resources', {
    url: '/resources',
    templateUrl: 'pages/resources.html',
    controller: 'resourcesCtrl'
  })

  .state('volunteer', {
    url: '/volunteer',
    templateUrl: 'pages/volunteer.html',
    controller: 'volunteerCtrl'
  })

  .state('events', {
    url: '/events',
    templateUrl: 'pages/events.html',
    controller: 'eventsCtrl'
  })

$urlRouterProvider.otherwise('/side-menu21/home')

  

});