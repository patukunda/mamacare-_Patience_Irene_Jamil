function MoreAddABusinessCountryCtrl($scope, $state, $ionicHistory, Utility, Countries) {

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

        $scope.country = selectedCountry;
    };
    $scope.$watch('country', function (newValue, oldValue) {

        $scope.getImage = function (type, url) {
            return Utility.getImage(type, url);
        };

        if (newValue !== oldValue) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            Countries.setCountry(newValue);
            $ionicHistory.goBack();
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
}