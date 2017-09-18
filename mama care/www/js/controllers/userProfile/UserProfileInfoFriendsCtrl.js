function UserProfileInfoFriendsCtrl($scope, $state, $stateParams, $ionicHistory, $http, $q, Utility, Account) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    //get the user in question
    $scope.thisUser = Account.getLoadedThisUser();
    console.log("users more information ", $scope.thisUser);
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.doRefresh = function () {
        $scope.user = Account.getThisUser();

        //get the user in question
        $scope.thisUser = Account.getLoadedThisUser();

        $scope.$broadcast('scroll.refreshComplete');
    };
}