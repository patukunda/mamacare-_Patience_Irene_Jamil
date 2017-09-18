function MoreCinemaCtrl($scope, Account, Utility, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.loaded = false;
    $scope.cinemas = [];
    More.getCinemas($scope);

    $scope.rateBar = rateBar;
    $scope.rate = $scope.rateBar(0, true);
    $scope.getRate = function (value, isCost) {
        //console.log("show me what u got ", value, isCost);
        $scope.rate = rateBar(value, isCost);
        //console.log("getting rate", $scope.rate);
        return "";
    };

    $scope.doRefresh = function () {
        $scope.loaded = false;
        More.getCinemas($scope);
        $scope.$broadcast('scroll.refreshComplete');
    };


    $scope.placeHold = function () {
    };
}
