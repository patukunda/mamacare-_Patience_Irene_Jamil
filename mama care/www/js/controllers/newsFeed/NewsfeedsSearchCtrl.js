function NewsfeedsSearchCtrl($scope, $stateParams, $ionicSlideBoxDelegate, Utility,Slides, Search, $ionicPopup, $ionicPopover, Countries, Account) {
    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.query = Search.getQuery();
    Search.searchForBusinesses($scope);
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;
    $scope.rateBar = rateBar;
    $scope.rate = $scope.rateBar(0, true);
    $scope.getRate = function (value, isCost) {
        $scope.rate = rateBar(value, isCost);
        //console.log("getting rate", $scope.rate);
        return "";
    };
    $scope.filterResults = $scope.query;
    $scope.clearFilter = function () {
        $scope.filterResults = "";
    };
     
    //select country
    $scope.countries = [];
    console.log("Getting the countries list ");
    Countries.getCountries($scope);
    $scope.selectCountry = function (selectedCountry) {
        $scope.country = selectedCountry;
    };
    $scope.$watch('country', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            
            Countries.setCountry(newValue);
            //remove the city

            console.log("newValue", newValue);
            console.log("oldValue", oldValue);

            //angular.element('#closeCountryPopup').click();
            if (newValue != null ) {
                $scope.countriesPopover.hide();
                //clear the city
                $scope.city = null;
                //filter results by country
                $scope.filteByCountry();
            }
        }
    }, true);
    $scope.isCountry = function (countryObject) {
        //console.log("Testing condition ", $scope.country, countryObject);
        if ($scope.country != null && countryObject != null && countryObject.id != null && $scope.country.id == countryObject.id) {
            //console.log("Testing condition is true ");
            $('#checkRadio' + countryObject.id + ' input:radio').prop("checked", true).trigger("stateChanged");
           
            return true;
        }
        //console.log("Testing condition is false ");
        return false;
    };
    //select city    
    $scope.selectCity = function (selectedCity) {
        $scope.city = selectedCity;
    };
    $scope.$watch('city', function (newValue, oldValue) {
        if (newValue !== oldValue) {

            Countries.setCity(newValue);

            console.log("newCityValue", newValue);
            console.log("oldCityValue", oldValue);

            //angular.element('#closeCountryPopup').click();
            if (newValue != null) {
                $scope.citiesPopover.hide();

                //filter results by country
                $scope.filteByCountry();
                $scope.filteByCity();
            }
        }
    }, true);
    $scope.isCity = function (cityObject) {
        //console.log("Testing condition ", $scope.city, cityObject);
        if ($scope.city != null && $scope.city.id == cityObject.id) {
            //console.log("Testing condition is true ");
            $('#checkCityRadio' + cityObject.id + ' input:radio').prop("checked", true).trigger("stateChanged");
            return true;
        }
        //console.log("Testing condition is false ");
        return false;
    };


    $scope.doRefresh = function () {
        
        $scope.filterResults = "";

        $scope.query = Search.getQuery();
        Search.searchForBusinesses($scope);

        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.activeUpperFilter = 1;
    $scope.activeLowerFilter = 0;

    $scope.setUpperFilter = function (filt, $event) {
        if (filt == 2) {
            $scope.country = Countries.getCountry();
            //alert("The disabloity");
            //show the select country popover
            $scope.selectCountryPopup($event);           
        }

        if (filt == 3) {
            $scope.city = Countries.getCity();

            //alert("The disabloity");
            //show the select city popover
            $scope.selectCityPopup($event);
        }

        $scope.activeUpperFilter = filt;
        if ($scope.activeUpperFilter == 1) {
            $scope.results = $scope.originalResults;

            $scope.activeLowerFilter = 0;
            ///remove country and city
            $scope.country = null;
            $scope.city = null;
            
        }       
    };

    //The countries popover
    $scope.selectCountryPopup = function ($event) {
        $scope.openCountriesPopover($event);
    };
    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('templates/popNewsFeedsSearchCountryFilter.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.countriesPopover = popover;
    });
    $scope.openCountriesPopover = function ($event) {
        $scope.countriesPopover.show($event).then(function(){
            var myEl = angular.element( document.querySelector( '#TheCountrySelectionPopup' ) );
            myEl.css('top', '0px');
            $scope.isCountry($scope.country);
            console.log("country id", $scope.country);
        });
    };
    $scope.closeCountriesPopover = function () {
        $scope.countriesPopover.hide();
        $scope.countriesPopover.remove();
        $ionicPopover.fromTemplateUrl('templates/popNewsFeedsSearchCountryFilter.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.countriesPopover = popover;
        });
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
       // $scope.countriesPopover.remove();
    });
    // Execute action on hide popover
    $scope.$on('countriesPopover.hidden', function () {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('countriesPopover.removed', function () {
        // Execute action
    });
    
    //The cities popover
    $scope.selectCityPopup = function ($event) {
        $scope.openCitiesPopover($event);
    };
    //.fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('templates/popNewsFeedsSearchCityFilter.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.citiesPopover = popover;
    });
    $scope.openCitiesPopover = function ($event) {
        $scope.citiesPopover.show($event).then(function () {
            var myEl = angular.element(document.querySelector('#TheCitySelectionPopup'));
            myEl.css('top', '0px');
            $scope.isCity($scope.city);
            console.log("city id", $scope.city);
        });
    };
    $scope.closeCitiesPopover = function () {
        $scope.citiesPopover.hide();
        $scope.citiesPopover.remove();
        $ionicPopover.fromTemplateUrl('templates/popNewsFeedsSearchCityFilter.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.citiesPopover = popover;
        });
    };
    // Execute action on hide popover
    $scope.$on('citiesPopover.hidden', function () {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('citiesPopover.removed', function () {
        // Execute action
    });




    $scope.setLowerFilter = function (filt) {
        $scope.activeLowerFilter = filt;
        if ($scope.activeLowerFilter > 0 && $scope.activeUpperFilter == 1) {
            $scope.activeUpperFilter = 0;
        }else if ($scope.activeLowerFilter > 0 && $scope.activeUpperFilter == 2) {
            $scope.activeUpperFilter = 2;
        } else if ($scope.activeLowerFilter > 0 && $scope.activeUpperFilter == 3) {
            $scope.activeUpperFilter = 3;
        }
    };

    $scope.call = function (number) {
        window.plugins.CallNumber.callNumber(function () {
            //success logic goes here
        }, function () {
            //error logic goes here
        }, number, true);
    };

    $scope.keyPressed = function (keyEvent) {
        $scope.query = $scope.filterResults;
        Search.setQuery($scope.query);
        if (keyEvent.keyCode == 13) {           
            Search.searchForBusinesses($scope);
        }
    };

    
    //"#/tab/more/profile/mybussinesses/{{buzynes.id}}"
    //['tab.more', 'tab.mybussinesses', 'tab.mybusiness']

    $scope.checkFriend = function (thisPerson) {
        for (var i = 0; i < thisPerson.friends.length; i++) {
            if (parseInt(thisPerson.friends[i].id) == parseInt($scope.user.id)) {
                //check for the status
                if (parseInt(thisPerson.friends[i].status) == 2) {
                    return 2;
                } else if (parseInt(thisPerson.friends[i].status) == 1) {
                    //check if am the person being requested
                    if (parseInt(thisPerson.friends[i].user_id) == parseInt($scope.user.id)) {
                        return 3;
                    } else {
                        return 1;
                    }
                }
            }
        }
        return 0;
    };

    $scope.originalResults = null;
    $scope.originalCountryResults = null;
    $scope.filteByCountry = function () {       
        $scope.results = {
            data : [],
            found: {
                businesses: [],
                events: $scope.originalResults.found.events,
                gossip: $scope.originalResults.found.gossip,
                people: [],
                sorted: $scope.originalResults.found.sorted
            },
            sponsored: $scope.originalResults.sponsored
        };
        //data
        for (var i = 0; i < $scope.originalResults.data.length; i++) {
            //check if city id == 0
            var cityId = parseInt($scope.originalResults.data[i].city_id);
            if (cityId == 0) {
                continue;
            }

            var countryId = parseInt($scope.originalResults.data[i].city.country.id);
            if (countryId == parseInt($scope.country.id)) {
                $scope.results.data.push($scope.originalResults.data[i]);
            }
        }
        //found.businesses
        for (var i = 0; i < $scope.originalResults.found.businesses.length; i++) {
            //check if city id == 0
            var cityId = parseInt($scope.originalResults.found.businesses[i].city_id);
            if (cityId == 0) {
                continue;
            }

            var countryId = parseInt($scope.originalResults.found.businesses[i].city.country.id);
            if (countryId == parseInt($scope.country.id)) {
                $scope.results.found.businesses.push($scope.originalResults.found.businesses[i]);
            }
        }
        //found.people
        for (var i = 0; i < $scope.originalResults.found.people.length; i++) {
            //check if city id == 0
            var cityId = parseInt($scope.originalResults.found.people[i].city_id);
            if (cityId == 0) {
                continue;
            }

            var countryId = parseInt($scope.originalResults.found.people[i].city.country.id);
            if (countryId == parseInt($scope.country.id)) {
                $scope.results.found.people.push($scope.originalResults.found.people[i]);
            }
        }
        $scope.originalCountryResults = $scope.results;
    };
    $scope.filteByCity = function () {
        $scope.results = {
            data: [],
            found: {
                businesses: [],
                events: $scope.originalCountryResults.found.events,
                gossip: $scope.originalCountryResults.found.gossip,
                people: [],
                sorted: $scope.originalCountryResults.found.sorted
            },
            sponsored: $scope.originalCountryResults.sponsored
        };
        //data
        for (var i = 0; i < $scope.originalCountryResults.data.length; i++) {
            //check if city id == 0
            var cityId = parseInt($scope.originalCountryResults.data[i].city_id);
            if (cityId == 0) {
                continue;
            }

            var cityId = parseInt($scope.originalCountryResults.data[i].city_id);
            if (cityId == parseInt($scope.city.id)) {
                $scope.results.data.push($scope.originalCountryResults.data[i]);
            }
        }
        //found.businesses
        for (var i = 0; i < $scope.originalCountryResults.found.businesses.length; i++) {
            //check if city id == 0
            var cityId = parseInt($scope.originalCountryResults.found.businesses[i].city_id);
            if (cityId == 0) {
                continue;
            }

            var cityId = parseInt($scope.originalCountryResults.found.businesses[i].city_id);
            if (cityId == parseInt($scope.city.id)) {
                $scope.results.found.businesses.push($scope.originalCountryResults.found.businesses[i]);
            }
        }
        //found.people
        for (var i = 0; i < $scope.originalCountryResults.found.people.length; i++) {
            //check if city id == 0
            var cityId = parseInt($scope.originalCountryResults.found.people[i].city_id);
            if (cityId == 0) {
                continue;
            }

            var cityId = parseInt($scope.originalCountryResults.found.people[i].city_id);
            if (cityId == parseInt($scope.city.id)) {
                $scope.results.found.people.push($scope.originalCountryResults.found.people[i]);
            }
        }

    };

    $scope.getBusinessLink = function (id) {
        for (var i = 0; i < $scope.user.directory.length; i++) {
            if (parseInt(id) == parseInt($scope.user.directory[i])) {
                return "#/mybusinessprofile/" + id;
            }
        }
        return '#/businessprofile/' + id;
    };


    $scope.placeHold = function () {
    };

    //get the slides of the user
    console.log("Getting the slides staff ", $scope.user);
    Slides.getSlides($scope, function (returnedSlides) {
        //$scope.slides = returnedSlides;
        $ionicSlideBoxDelegate.update();
    });
}