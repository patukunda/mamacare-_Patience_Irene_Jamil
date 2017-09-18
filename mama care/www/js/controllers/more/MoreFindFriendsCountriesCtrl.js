function MoreFindFriendsCountriesCtrl($scope, $state, $ionicHistory, Utility, Countries) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;
    $scope.country = Countries.getCountry();
    $scope.countries = [];
    console.log("Getting the countries list ");
    Countries.getCountries($scope);
    $scope.selectCountry = function (selectedCountry) {

        $scope.getImage = function (type, url) {
            return Utility.getImage(type, url);
        };

        if (selectedCountry == 1) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            $scope.country = null;
            Countries.setCountry(null);
            $ionicHistory.goBack();
        } else {
            $scope.country = selectedCountry;
        }
    };
    $scope.$watch('country', function (newValue, oldValue) {

        $scope.getImage = function (type, url) {
            return Utility.getImage(type, url);
        };

        if (newValue !== oldValue && newValue !== null) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            Countries.setCountry(newValue);
            $ionicHistory.goBack();
        }
    }, true);
    $scope.isCountry = function (countryObject) {

        $scope.getImage = function (type, url) {
            return Utility.getImage(type, url);
        };

        //console.log("Testing condition ", $scope.country, countryObject);
        if ($scope.country != null && countryObject != null && countryObject.id != null && $scope.country.id == countryObject.id) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            //console.log("Testing condition is true ");
            $('#checkRadio' + countryObject.id + ' input:radio').prop("checked", true).trigger("stateChanged");
            return true;
        }
        if ($scope.country == null && countryObject == null) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            return true;
        }
        //console.log("Testing condition is false ");
        return false;
    };

    $scope.doRefresh = function () {
        $scope.country = Countries.getCountry();
        $scope.countries = [];
        console.log("Getting the countries list ");
        Countries.getCountries($scope);

        $scope.$broadcast('scroll.refreshComplete');
    };
}