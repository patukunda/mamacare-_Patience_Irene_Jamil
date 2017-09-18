function MorePendingTicketsCtrl($scope, $stateParams, Account, Utility, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.loaded = false;


    $scope.pendingMovies = [];

    More.getUsersPendingTickets($scope);

    	//alert("whats happening");
    $scope.doRefresh = function () {
        $scope.loaded = false;
        More.getUsersPendingTickets($scope);
        $scope.$broadcast('scroll.refreshComplete');
    };


    $scope.placeHold = function () {
    };
}
