angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  
  
  .state('menu.resources', {
    url: '/resources',
    views: {
      'side-menu21': {
        templateUrl: 'pages/resources.html',
        controller: 'resourcesCtrl'
      }
    }
  })
  
  .state('menu.food', {
    url: '/resources',
    views: {
      'side-menu21': {
        templateUrl: 'pages/resources.html',
        controller: 'foodCtrl'
      }
    }
  })
  .state('menu.medical', {
    url: '/resources',
    views: {
      'side-menu21': {
        templateUrl: 'pages/resources.html',
        controller: 'medicalCtrl'
      }
    }
  })
  .state('menu.shelter', {
    url: '/resources',
    views: {
      'side-menu21': {
        templateUrl: 'pages/resources.html',
        controller: 'shelterCtrl'

      }
    }
  })
  
  .state('menu.vispdat', {
    url: '/vispdat',
    views: {
      'side-menu21': {
        templateUrl: 'pages/vispdat.html',
        controller: 'vispdatCtrl'
      }
    }
  })
  
  
  .state('menu.events', {
    url: '/events',
    views: {
      'side-menu21': {
        templateUrl: 'pages/events.html',
        controller: 'eventsCtrl'
      }
    }
  })
  
  .state('menu.contact', {
    url: '/contact',
    views: {
      'side-menu21': {
        templateUrl: 'pages/contact.html',
        controller: 'contactCtrl'
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
  
    .state('menu.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'pages/login.html',
        controller: 'loginCtrl'
      }
    }
  })
  
    .state('menu.logout', {
    url: '/logout',
    views: {
      'side-menu21': {
        templateUrl: 'pages/logout.html',
        controller: 'logoutCtrl'
      }
    }
  })

  .state('menu', {
    url: '/kauhale',
    templateUrl: 'pages/menu.html',
    abstract:true
  })
  
    .state('resource-menu', {
    url: '/resources/menu',
    templateUrl: 'pages/menu.html',
    abstract:true
  })
  
  
  
 
$urlRouterProvider.otherwise('/kauhale/login')
  

});