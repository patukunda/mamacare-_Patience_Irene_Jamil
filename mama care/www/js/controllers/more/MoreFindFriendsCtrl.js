function MoreFindFriendsCtrl($scope, Account, More, Utility, Countries) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    More.fetchDefaultFriendsResults($scope);

    $scope.addBusinessModel = {
        country: Countries.getCountry(),
        name: "",
        city: Countries.getCity()
    };

    $scope.$on('$ionicView.enter', function () {

        $scope.getImage = function (type, url) {
            return Utility.getImage(type, url);
        };

        $scope.addBusinessModel.country = Countries.getCountry();
        $scope.addBusinessModel.city = Countries.getCity();
        //$scope.addBusinessModel.name = "";
    });

    $scope.searchFriend = function () {

        $scope.getImage = function (type, url) {
            return Utility.getImage(type, url);
        };

        var countryId = ($scope.addBusinessModel.country == null) ? 0 : $scope.addBusinessModel.country.id;
        var cityId = ($scope.addBusinessModel.city == null) ? 0 : $scope.addBusinessModel.city.id;
        More.lookForFriends(countryId, cityId, $scope.addBusinessModel.name, $scope);
    };

    $scope.doRefresh = function () {
        $scope.addBusinessModel = {
            country: Countries.getCountry(),
            name: "",
            city: Countries.getCity()
        };
        More.fetchDefaultFriendsResults($scope);
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.hidebanner = false;
    $scope.hideme = function () {
        $scope.hidebanner = true;
        angular.element('#thisContent').css({'padding-top': '10px', 'margin-top':'90px'});
    };


}