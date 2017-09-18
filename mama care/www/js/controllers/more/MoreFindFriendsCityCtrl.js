function MoreFindFriendsCityCtrl($scope, $state, $ionicHistory, Utility, Countries) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.country = Countries.getCountry();
    $scope.city = Countries.getCity();

    $scope.selectCity = function (selectedCity) {

        $scope.getImage = function (type, url) {
            return Utility.getImage(type, url);
        };

        if (selectedCity == 1) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            $scope.city = null;
            Countries.setCity(null);
            $ionicHistory.goBack();
        } else {
            $scope.city = selectedCity;
        }
    };
    $scope.$watch('city', function (newValue, oldValue) {

        $scope.getImage = function (type, url) {
            return Utility.getImage(type, url);
        };

        if (newValue !== oldValue && newValue !== null) {

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

        if ($scope.city == null && cityObject == null) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            return true;
        }

        //console.log("Testing condition ", $scope.city, cityObject);
        if ($scope.city != null && cityObject !== null && $scope.city.id == cityObject.id) {

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

    $scope.doRefresh = function () {
        $scope.country = Countries.getCountry();
        $scope.city = Countries.getCity();

        $scope.$broadcast('scroll.refreshComplete');
    };
}