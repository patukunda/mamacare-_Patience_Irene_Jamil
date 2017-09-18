function MoreBusinessMessagesCtrl($scope, Account, Utility, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    //More.loadMyBusinessMessages($scope);
    More.loadBusinessMessages($scope);

    $scope.doRefresh = function () {
        More.loadBusinessMessages($scope);

        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.zonofTime = window.zonofTime;
    $scope.correctTime = function (tym) {
        var x = Utility.getCorrectTime(tym, window.zonofTime);
        return x;
    };


    $scope.placeHold = function () {
    };
}