function NewsfeedsAddABusinessCityCtrl($scope, $state, $ionicHistory, Utility, Countries) {
    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };


    $scope.country = Countries.getCountry();
    $scope.city = Countries.getCity();
    
    $scope.selectCity = function (selectedCity) {
        $scope.city = selectedCity;
    };
    $scope.$watch('city', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            Countries.setCity(newValue);
            $ionicHistory.goBack();
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
        $scope.country = Countries.getCountry();
        $scope.city = Countries.getCity();

        $scope.$broadcast('scroll.refreshComplete');
    };
}