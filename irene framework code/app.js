'use strict';



// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js , 'cordovaHTTP'
angular.module('starter', ['ionic',  'ngCordova', 'ionic-ratings', 'starter.controllers', 'starter.services', 'ngMessages', 'ion-gallery'])

.run(function ($ionicPlatform, ngFB, $cordovaGeolocation) {
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

  .state('password', {
      url: '/password',
      templateUrl: 'templates/password/password.html',
      controller: 'PasswordCtrl'
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


          .state('tab.newsfeed', {
            url: '/newsfeeds/:id',
            views: {
                'tab-newsfeeds': {
                    templateUrl: 'templates/newsFeed/tab-newsfeed.html',
                    controller: 'NewsfeedCtrl'
                }
            }
          })

          .state('tab.searchresults', {
            url: '/newsfeeds/searchresults',
            views: {
              'tab-newsfeeds': {
                templateUrl: 'templates/newsFeed/tab-newsfeeds-searchresults.html',
                controller: 'NewsfeedsSearchCtrl'
              }
            }
          })

 .state('tab.newsfeeduserprofile', {
     url: '/newsfeeds/profile/of/user/:user_id',
     views: {
         'tab-newsfeeds': {
             templateUrl: 'templates/newsFeed/tab-newsfeed-user-profile.html',
             controller: 'NewsfeedUserProfileCtrl'
         }
     }
 })



 

 //page user profile
  .state('userprofile', {
      url: '/userprofile/:id',
      templateUrl: 'templates/userProfile/userprofile.html',
      controller: 'UserProfileCtrl'
  })
      .state('userprofilemessage', {
          url: '/userprofile/messages/',
          templateUrl: 'templates/userProfile/userprofilemessages.html',
          controller: 'UserProfileMessageCtrl'
      })

      .state('userprofilereviews', {
          url: '/userprofile/reviews/',
          templateUrl: 'templates/userProfile/userprofilereviews.html',
          controller: 'UserProfileReviewCtrl'
      })

      .state('userprofilephotoes', {
          url: '/userprofile/photoes/',
          templateUrl: 'templates/userProfile/userprofilephotoes.html',
          controller: 'UserProfilePhotoCtrl'
      })

      .state('userprofileinfo', {
          url: '/userprofile/info/',
          templateUrl: 'templates/userProfile/userprofileinfo.html',
          controller: 'UserProfileInfoCtrl'
      })

          .state('userprofileinfofriends', {
              url: '/userprofile/info/friends/',
              templateUrl: 'templates/userProfile/userfriends.html',
              controller: 'UserProfileInfoFriendsCtrl'
          })

          .state('userprofileinfofavourites', {
              url: '/userprofile/info/favourites/',
              templateUrl: 'templates/userProfile/userfavourites.html',
              controller: 'UserProfileInfoFavouritesCtrl'
          })

      .state('userprofilecomment', {
          url: '/userprofile/comment/:id',
          templateUrl: 'templates/userProfile/userprofilecomment.html',
          controller: 'UserProfileCommentCtrl'
      })



  .state('myprofile', {
      url: '/myprofile/:id',
      cache:false,
      templateUrl: 'templates/myProfile/myprofile.html',
      controller: 'MyProfileCtrl'
  })

      .state('myprofilesettings', {
          url: '/myprofile/settings/edit',
          templateUrl: 'templates/myProfile/myprofilesettings.html',
          controller: 'MyProfileSettingsCtrl'
      })

      .state('myprofileinfo', {
          url: '/myprofile/info/edit',
          templateUrl: 'templates/myProfile/myprofileinfo.html',
          controller: 'MyProfileInfoEditCtrl'
      })

          .state('myprofileinfocountry', {
            url: '/myprofile/info/country/select',
            templateUrl: 'templates/myProfile/myprofileinfocountry.html',
            controller: 'MyProfileCountryCtrl'
          })

          .state('myprofileinfocity', {
              url: '/myprofile/info/city/select',
              templateUrl: 'templates/myProfile/myprofileinfocity.html',
              controller: 'MyProfileCityCtrl'
          })

     .state('myprofilemessages', {
        cache:false,
        url: '/myprofile/mymessages/',
        templateUrl: 'templates/myProfile/myprofilemessages.html',
        controller: 'MyProfileMessages'
     })

           .state('myprofilemessageschats', {
                url: '/myprofile/mymessages/chats/:id',
                templateUrl: 'templates/myProfile/myprofilemessagechats.html',
                controller: 'MyProfileMessageChats'
           })

      .state('myprofilereviews', {
          url: '/myprofile/myreviews/',
          templateUrl: 'templates/myProfile/myprofilereviews.html',
          controller: 'MyNewsfeedsCtrl'
      })

      .state('myprofilephotoes', {
          url: '/myprofile/myphotoes/',
          templateUrl: 'templates/myProfile/myprofilephotoes.html',
          controller: 'MyProfilePhotoesCtrl'
      })

      .state('myprofilefriends', {
          cache: false,
          url: '/myprofile/myfriends/',
          templateUrl: 'templates/myProfile/myprofilefriends.html',
          controller: 'MyProfileFriendsCtrl'
      })

      .state('myprofilefollowing', {
          cache: false,
          url: '/myprofile/peopleamfollowing/',
          templateUrl: 'templates/myProfile/peopleamfollowing.html',
          controller: 'PeopleAmFollowingCtrl'
      })

      .state('myprofilefollowers', {
          cache: false,
          url: '/myprofile/myfollowers/',
          templateUrl: 'templates/myProfile/myfollowers.html',
          controller: 'MyProfileFollowersCtrl'
      })

      .state('myprofileevents', {
          url: '/myprofile/myevents/',
          templateUrl: 'templates/myProfile/myevents.html',
          controller: 'MyProfileEventsCtrl'
      })

      .state('myprofilebusinesses', {
          url: '/myprofile/mybusinesses/',
          templateUrl: 'templates/myProfile/mybusinesses.html',
          controller: 'MyProfileMyBusinessesCtrl'
      })

      .state('myprofilebusinessesaddedbyme', {
          cache: false,
          url: '/myprofile/mybusinessesaddbyme/',
          templateUrl: 'templates/myProfile/mybusinessesaddedbyme.html',
          controller: 'MyProfileBusinessesAddedByMeCtrl'
      })

      .state('myprofilebusinessesifollow', {
          cache: false,
          url: '/myprofile/mybusinessesifollow/',
          templateUrl: 'templates/myProfile/mybusinessesifollow.html',
          controller: 'MyProfileBusinessesFollowedByUserCtrl'
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
    url: '/checkin',
    views: {
      'tab-checkin': {
        templateUrl: 'templates/checkin/tab-checkin.html',
        controller: 'CheckInCtrl'
      }
    }
  })


      .state('tab.checkindetails', {
          url: '/checkin/:id',
          views: {
              'tab-checkin': {
                  templateUrl: 'templates/checkin/tab-checkin-form.html',
                  controller: 'CheckInFormCtrl'
              }
          }
      })



  .state('tab.notifications', {
      cache: false,
      url: '/notifications',
      views: {
        'tab-notifications': {
            templateUrl: 'templates/notification/tab-notifications.html',
            controller: 'NotificationsCtrl',
            controllerAs: 'NotificationsCtrl'
        }
      }
  })

      .state('tab.notificationdetails', {
          url: '/notifications/view/:id/:nid',
          views: {
              'tab-notifications': {
                  templateUrl: 'templates/notification/tab-notification-newsfeed.html',
                  controller: 'NotificationNewsfeedCtrl'
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

      .state('tab.morefavorites', {
          url: '/more/favorites/',
          views: {
              'tab-more': {
                  templateUrl: 'templates/more/tab-more-favorites.html',
                  controller: 'MoreFavouritesCtrl'
              }
          }
      })

      .state('tab.moreevents', {
          url: '/more/events/',
          views: {
              'tab-more': {
                  templateUrl: 'templates/more/tab-more-events.html',
                  controller: 'MoreEventsCtrl'
              }
          }
      })

      .state('tab.moregossip', {
          url: '/more/gossip/',
          views: {
              'tab-more': {
                  templateUrl: 'templates/more/tab-more-gossip.html',
                  controller: 'MoreGossipCtrl'
              }
          }
      })

      .state('tab.morecinema', {
          url: '/more/cinema/',
          views: {
              'tab-more': {
                  templateUrl: 'templates/more/tab-more-cinema.html',
                  controller: 'MoreCinemaCtrl'
              }
          }
      })

          .state('tab.morecinemaselect', {
              url: '/more/cinema/selectmovie/:id',
              views: {
                  'tab-more': {
                      templateUrl: 'templates/more/tab-more-cinema-selectmovie.html',
                      controller: 'MoreSelectMovieCtrl'
                  }
              }
          })

              .state('tab.morecinemaselectdate', {
                  url: '/more/cinema/selectmovie/selectdate/:id',
                  views: {
                      'tab-more': {
                          templateUrl: 'templates/more/tab-more-cinema-selectmovie-selectdate.html',
                          controller: 'MoreSelectDateCtrl'
                      }
                  }
              })

                      .state('tab.morecinemaselectdateshowtime', {
                          url: '/more/cinema/selectmovie/selectdate/showtime/',
                          views: {
                              'tab-more': {
                                  templateUrl: 'templates/more/tab-more-cinema-selectmovie-selectdate-showtime.html',
                                  controller: 'MoreShowTimeCtrl'
                              }
                          }
                      })

                            .state('tab.morecinemaselectdateshowtimeselectseats', {
                                url: '/more/cinema/selectmovie/selectdate/showtime/selectseats/',
                                views: {
                                    'tab-more': {
                                        templateUrl: 'templates/more/tab-more-cinema-selectmovie-selectdate-showtime-selectseats.html',
                                        controller: 'MoreSelectSeatsCtrl'
                                    }
                                }
                            })


                                .state('tab.morecinemaviewbooking', {
                                    url: '/more/cinema/selectmovie/selectdate/showtime/selectseats/viewbooking/',
                                    views: {
                                        'tab-more': {
                                            templateUrl: 'templates/more/tab-more-cinema-viewbooking.html',
                                            controller: 'MoreViewBookingCtrl'
                                        }
                                    }
                                })


                                      .state('tab.morecinemapaymentmethod', {
                                          url: '/more/cinema/selectmovie/selectdate/showtime/selectseats/viewbooking/paymentmethod/',
                                          views: {
                                              'tab-more': {
                                                  templateUrl: 'templates/more/tab-more-cinema-paymentmethod.html',
                                                  controller: 'MorePaymentMethodCtrl'
                                              }
                                          }
                                      })

                                            .state('tab.morecinemapaymentfinished', {
                                                url: '/more/cinema/selectmovie/selectdate/showtime/selectseats/viewbooking/paymentmethod/paymentfinished/',
                                                views: {
                                                    'tab-more': {
                                                        templateUrl: 'templates/more/tab-more-cinema-paymentfinished.html',
                                                        controller: 'MorePaymentFinishedCtrl'
                                                    }
                                                }
                                            })

      .state('tab.morepurchase', {
          url: '/more/purchase/',
          views: {
              'tab-more': {
                  templateUrl: 'templates/more/tab-more-purchase.html',
                  controller: 'MorePurchaseCtrl'
              }
          }
      })


            .state('tab.morepurchasemytickets', {
                url: '/more/purchase/mytickets/',
                views: {
                    'tab-more': {
                        templateUrl: 'templates/more/tab-more-purchase-mytickets.html',
                        controller: 'MoreMyTicketsCtrl'
                    }
                }
            })

                  .state('tab.morepurchasemyticketsreceipt', {
                      url: '/more/purchase/mytickets/receipt/:id',
                      views: {
                          'tab-more': {
                              templateUrl: 'templates/more/tab-more-purchase-mytickets-receipt.html',
                              controller: 'MoreMyMovieReceiptCtrl'
                          }
                      }
                  })

            .state('tab.morepurchasependingtickets', {
                url: '/more/purchase/pendingtickets/',
                views: {
                    'tab-more': {
                        templateUrl: 'templates/more/tab-more-purchase-pendingtickets.html',
                        controller: 'MorePendingTicketsCtrl'
                    }
                }
            })

      .state('tab.businessmessages', {
          url: '/more/businessmessages/',
          views: {
              'tab-more': {
                  templateUrl: 'templates/more/tab-more-businessmessages.html',
                  controller: 'MoreBusinessMessagesCtrl'
              }
          }
      })

            .state('tab.businessmessageschatters', {
                url: '/more/businessmessages/chat/:id',
                views: {
                    'tab-more': {
                        templateUrl: 'templates/more/tab-more-businessmessage-chat.html',
                        controller: 'MoreBusinessMessageChatCtrl'
                    }
                }
            })


      .state('tab.mybusinessmessages', {
          url: '/more/mybusinessmessages/',
          views: {
              'tab-more': {
                  templateUrl: 'templates/more/tab-more-mybusinessmessages.html',
                  controller: 'MoreMyBusinessMessagesCtrl'
              }
          }
      })

            .state('tab.mybusinessmessageschatters', {
                url: '/more/mybusinessmessages/chat/:id',
                views: {
                    'tab-more': {
                        templateUrl: 'templates/more/tab-more-businessmessages-chatters.html',
                        controller: 'MoreBusinessMessagesChatersCtrl'
                    }
                }
            })

                .state('tab.businessmessageschat', {
                    url: '/more/businessmessages/chat/chatter/:id/:userId',
                    views: {
                        'tab-more': {
                            templateUrl: 'templates/more/tab-more-businessmessages-chat.html',
                            controller: 'MoreBusinessMessagesChatCtrl'
                        }
                    }
                })


      .state('tab.findfriends', {
          url: '/more/findfriends/',
          cache: false,
          views: {
              'tab-more': {
                  templateUrl: 'templates/more/tab-more-findfriends.html',
                  controller: 'MoreFindFriendsCtrl'
              }
          }
      })

            .state('tab.findfriendscountry', {
                url: '/more/findfriends/countries/list',
                views: {
                    'tab-more': {
                        templateUrl: 'templates/more/tab-more-findfriends-countries.html',
                        controller: 'MoreFindFriendsCountriesCtrl'
                    }
                }
            })

            .state('tab.findfriendscity', {
                url: '/more/findfriends/cities/list',
                views: {
                    'tab-more': {
                        templateUrl: 'templates/more/tab-more-findfriends-cities.html',
                        controller: 'MoreFindFriendsCityCtrl'
                    }
                }
            })

      .state('tab.friendrequests', {
          url: '/more/friendrequests/',
          views: {
              'tab-more': {
                  templateUrl: 'templates/more/tab-more-friendrequests.html',
                  controller: 'MoreFriendRequestsCtrl'
              }
          }
      })

      .state('tab.claimyourbusiness', {
          url: '/more/claimyourbusiness',
          views: {
              'tab-more': {
                  templateUrl: 'templates/more/tab-more-claimyourbusiness.html',
                  controller: 'MoreBusinessToClaimCtrl'
              }
          }
      })

          .state('tab.claimyourbusinesspage', {
              url: '/more/claimyourbusiness/:id',
              views: {
                  'tab-more': {
                      templateUrl: 'templates/more/tab-more-claimyourbusiness-page.html',
                      controller: 'MoreBusinessToClaimPageCtrl'
                  }
              }
          })

      .state('tab.addabusiness', {
          url: '/more/addabusiness',
          views: {
              'tab-more': {
                  templateUrl: 'templates/more/tab-more-addabusiness.html',
                  controller: 'MoreAddAbusinessCtrl'
              }
          }
      })

            .state('tab.moreaddbusinesscountries', {
                url: '/more/addabusiness/countries/list',
                views: {
                    'tab-more': {
                        templateUrl: 'templates/more/tab-more-addabusiness-countries.html',
                        controller: 'MoreAddABusinessCountryCtrl'
                    }
                }
            })

            .state('tab.moreaddbusinesscities', {
                url: '/more/addabusiness/cities/list',
                views: {
                    'tab-more': {
                        templateUrl: 'templates/more/tab-more-addabusiness-cities.html',
                        controller: 'MoreAddABusinessCityCtrl'
                    }
                }
            })

           .state('tab.moreaddbusinesscategories', {
              url: '/more/addabusiness/categories/list',
              views: {
                  'tab-more': {
                      templateUrl: 'templates/more/tab-more-addabusiness-categories.html',
                      controller: 'MoreAddABusinessCategoriesCtrl'
                  }
              }
           })

                .state('tab.moreaddbusinesscategorysubcategories', {
                    url: '/more/addabusiness/categories/list/:id',
                    views: {
                        'tab-more': {
                            templateUrl: 'templates/more/tab-more-addabusiness-categories-subcategories.html',
                            controller: 'MoreAddABusinessCategoriesSubCategoriesCtrl'
                        }
                    }
                })

      .state('tab.moreabout', {
          url: '/more/about/',
          views: {
              'tab-more': {
                  templateUrl: 'templates/more/tab-more-about.html',
                  controller: 'MoreAboutCtrl'
              }
          }
      })

      .state('tab.moresupport', {
          url: '/more/support/',
          cache :false,
          views: {
              'tab-more': {
                  templateUrl: 'templates/more/tab-more-support.html',
                  controller: 'MoreSupportCtrl'
              }
          }
      })



  .state('tab.profile', {
    url: '/more/:id',
    views: {
      'tab-more': {
        templateUrl: 'templates/more/tab-more-profile.html',
        controller: 'MoreProfileCtrl'
      }
    }
  })

  .state('tab.mybussinesses', {
      url: '/more/profile/mybussinesses',
      views: {
          'tab-more': {
              templateUrl: 'templates/more/tab-more-profile-mybussinesses.html',
              controller: 'MoreProfileMyBussinessCtrl'
          }
      }
  })

  .state('tab.mybusiness', {
      url: '/more/profile/mybussinesses/:id',
      views: {
          'tab-more': {
              templateUrl: 'templates/more/tab-more-profile-mybussinesses-mybussiness.html',
              controller: 'MoreProfileMyBussinessBussinessCtrl'
          }
      }
  })

  .state('tab.mymessages', {
      url: '/more/profile/mymessages',
      views: {
          'tab-more': {
              templateUrl: 'templates/more/tab-more-profile-mymessages.html',
              controller: 'MoreProfileMyMessagesCtrl'
          }
      }
  })

  .state('tab.mymessage', {
      url: '/more/profile/mymessages/:id',
      views: {
          'tab-more': {
              templateUrl: 'templates/more/tab-more-profile-mymessages-mymessage.html',
              controller: 'MoreProfileMyMessagesMyMessageCtrl'
          }
      }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start'); //'/tab/newsfeeds'

});
