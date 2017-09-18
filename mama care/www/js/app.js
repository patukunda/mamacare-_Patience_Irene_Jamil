'use strict';



// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js , 'cordovaHTTP'
angular.module('starter', ['ionic',  'ngCordova', 'ionic-ratings', 'starter.controllers', 'starter.services', 'ngMessages', 'ion-gallery'])

.run(function ($ionicPlatform, $cordovaGeolocation) {
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
 
 
  window.CLEAN_DB = function () {
      window.localStorage.removeItem("woman");
      window.localStorage.removeItem("worker");
      window.localStorage.removeItem("HealthCenter");
      window.localStorage.removeItem("followup");
  }

  var tz = jstz.determine();
  window.zonofTime = tz.name();
  window.millisecondsCalibaration = 0;

})

.config(function ($stateProvider, $urlRouterProvider) {


  //$httpProvider.defaults.withCredentials = true;

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  //pg welcome
  .state('start', {
      url: '/start',
      cache: false,
      templateUrl: 'templates/start/start.html',
      controller: 'StartCtrl'
  })

  //pg signup
  .state('signup', {
     url: '/signup',
     templateUrl: 'templates/signup/signup.html',
     controller: 'SignupCtrl'
  })
      
  //pg login
  .state('login', {
     url: '/login',
     templateUrl: 'templates/login/login.html',
     controller: 'LoginCtrl'
  })
 

  //pg tabs
  //setup an abstract state for the tabs directive
  //Each tab has its own nav history stack:
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tab/tabs.html',
    controller: 'TabsCtrl'
  })

      .state('tab.newsfeeds', {
        url: '/newsfeeds',
        views: {
          'tab-newsfeeds': {
            templateUrl: 'templates/newsFeed/tab-newsfeeds.html',
            controller: 'NewsfeedsCtrl'
          }
        }
      })


     



  .state('tab.register', {
      url: '/register',
    views: {
        'tab-register': {
            templateUrl: 'templates/register/tab-register.html',
        controller: 'RegisterCtrl'
      }
    }
  })

  

  .state('tab.checkin', {
    cache: false,
    url: '/checkin',
    views: {
      'tab-checkin': {
        templateUrl: 'templates/checkin/tab-checkin.html',
        controller: 'CheckInCtrl'
      }
    }
  })


      .state('tab.checkindetails', {
          cache: false,
          url: '/checkin/:id',
          views: {
              'tab-checkin': {
                  templateUrl: 'templates/checkin/tab-checkin-form.html',
                  controller: 'CheckInFormCtrl'
              }
          }
      })


            .state('tab.followups', {
                cache: false,
                url: '/checkin/follow/:id',
                views: {
                    'tab-checkin': {
                        templateUrl: 'templates/checkin/followups.html',
                        controller: 'CheckInFormCtrl'
                    }
                }
            })


            .state('tab.addmarternals', {
                cache: false,
                url: '/checkin/addMarternalInfo/:id',
                views: {
                    'tab-checkin': {
                        templateUrl: 'templates/checkin/marternalform.html',
                        controller: 'CheckInFormCtrl'
                    }
                }
            })


                    .state('tab.addfollowups', {
                        cache: false,
                        url: '/checkin/follow/add/:id',
                        views: {
                            'tab-checkin': {
                                templateUrl: 'templates/checkin/addfollowups.html',
                                controller: 'CheckInFormCtrl'
                            }
                        }
                    })





  

  .state('tab.more', {
    url: '/more',
    cache:false,
    views: {
      'tab-more': {
        templateUrl: 'templates/more/tab-more.html',
        controller: 'MoreCtrl'
      }
    }
  })

  

  // if none of the above states are matched, use this as the fallbackS
  $urlRouterProvider.otherwise('/start'); //'/tab/newsfeeds'

});
