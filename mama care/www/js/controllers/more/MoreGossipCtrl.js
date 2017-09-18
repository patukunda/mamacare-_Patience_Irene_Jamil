function MoreGossipCtrl($scope, Account, Utility, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.doRefresh = function () {
        
        $scope.$broadcast('scroll.refreshComplete');
    };


}