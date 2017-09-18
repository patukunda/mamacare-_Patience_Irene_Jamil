function MoreFavouritesCtrl($scope, Account, Utility, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    More.getFavourites($scope);

    $scope.doRefresh = function () {
        More.getFavourites($scope);
        $scope.$broadcast('scroll.refreshComplete');
    };


    $scope.placeHold = function () {
    };
}