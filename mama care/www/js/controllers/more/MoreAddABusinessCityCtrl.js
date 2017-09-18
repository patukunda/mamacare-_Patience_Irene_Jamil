function MoreAddABusinessCityCtrl($scope, $state, $ionicHistory, Utility, Countries) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.doRefresh = function () {

        $scope.country = Countries.getCountry();
        $scope.city = Countries.getCity();

        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.country = Countries.getCountry();
    $scope.city = Countries.getCity();

    $scope.selectCity = function (selectedCity) {

        $scope.getImage = function (type, url) {
            return Utility.getImage(type, url);
        };

        $scope.city = selectedCity;
    };
    $scope.$watch('city', function (newValue, oldValue) {

        $scope.getImage = function (type, url) {
            return Utility.getImage(type, url);
        };

        if (newValue !== oldValue) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            Countries.setCity(newValue);
            $ionicHistory.goBack();
        }
    }, true);
    $scope.isCity = function (cityObject) {

        $scope.getImage = function (type, url) {
            return Utility.getImage(type, url);
        };

        //console.log("Testing condition ", $scope.city, cityObject);
        if ($scope.city != null && $scope.city.id == cityObject.id) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            //console.log("Testing condition is true ");
            $('#checkCityRadio' + cityObject.id + ' input:radio').prop("checked", true).trigger("stateChanged");
            return true;
        }
        //console.log("Testing condition is false ");
        return false;
    };
}