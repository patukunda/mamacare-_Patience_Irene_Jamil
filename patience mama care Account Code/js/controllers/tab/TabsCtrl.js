function TabsCtrl($scope, $state, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $cordovaSocialSharing, ngFB, Newsfeeds, Slides, $ionicActionSheet, Account, Utility, Search) {

    //alert("Hero");
    //Utility.testApi();

    $scope.globalNotifications = 0;
    $scope.globalMores = 0;
    window.setInterval(function () {
        $scope.user = Account.getThisUser();
        //console.log("shake it");
        if ($scope.user != null) {
            //console.log("shake then");
            Account.getUsersUnreadNotificationsCount($scope.user, function (num) {
                $scope.globalNotifications = num;
            });

            Account.getUsersGlobalMoresCount($scope.user, function (num) {
                $scope.globalMores = num;
            });
        }
    }, 30000);//check every after 0.5 minute

    //var geocoder;
    
    //$ionicPlatform.ready(function () {
    //    geocoder = new google.maps.Geocoder();
    //    //$ionicLoading.show({
    //    //    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
    //    //});

    //    var posOptions = {
    //        enableHighAccuracy: true,
    //        timeout: 20000,
    //        maximumAge: 0
    //    };

    //    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
    //        console.log("our position:",position);
    //        var lat = position.coords.latitude;
    //        var long = position.coords.longitude;

    //        codeLatLng(lat, long);

    //        //var myLatlng = new google.maps.LatLng(lat, long);

    //        //var mapOptions = {
    //        //    center: myLatlng,
    //        //    zoom: 16,
    //        //    mapTypeId: google.maps.MapTypeId.ROADMAP
    //        //};

    //        //var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //        //$scope.map = map;
    //        //$ionicLoading.hide();

    //    }, function (err) {
    //       // $ionicLoading.hide();
    //        console.log(err);
    //    });
    //});



    //function codeLatLng(lat, lng) {

    //    var latlng = new google.maps.LatLng(lat, lng);
    //    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
    //        if (status == google.maps.GeocoderStatus.OK) {
    //            console.log(results)
    //            if (results[1]) {
    //                //formatted address
    //                alert(results[0].formatted_address)
    //                //find country name
    //                for (var i = 0; i < results[0].address_components.length; i++) {
    //                    for (var b = 0; b < results[0].address_components[i].types.length; b++) {

    //                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
    //                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
    //                            //this is the object you are looking for
    //                            city = results[0].address_components[i];
    //                            break;
    //                        }
    //                    }
    //                }
    //                //city data
    //                alert(city.short_name + " " + city.long_name)


    //            } else {
    //                alert("No results found");
    //            }
    //        } else {
    //            alert("Geocoder failed due to: " + status);
    //        }
    //    });
    //};









}