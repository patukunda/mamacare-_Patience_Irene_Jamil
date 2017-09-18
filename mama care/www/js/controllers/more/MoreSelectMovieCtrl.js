function MoreSelectMovieCtrl($scope, $stateParams, Account, Utility, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.loaded = false;
    $scope.movies = [];
    $scope.businessId = $stateParams.id;
    More.getCinemaMovies($scope);


    $scope.doRefresh = function () {
        scope.loaded = false;
        $scope.businessId = $stateParams.id;
        More.getCinemaMovies($scope);
        $scope.$broadcast('scroll.refreshComplete');
    };


    $scope.placeHold = function () {
    };
}
