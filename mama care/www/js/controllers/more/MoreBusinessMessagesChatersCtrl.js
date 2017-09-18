function MoreBusinessMessagesChatersCtrl($scope, $state, $stateParams, Account, Utility, More, Business) {
        
    $scope.doRefresh = function () {
        $scope.user = Account.getThisUser();
        Account.getUsersMessages($scope);

        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    //load this businesses messengers
    //Account.getUsersMessages($scope);
    $scope.business_id = $stateParams.id;
    Business.getUsersWhoSentMessagesToBusiness($scope);


    $scope.zonofTime = window.zonofTime;
    $scope.correctTime = function (tym) {
        var x = Utility.getCorrectTime(tym, window.zonofTime);
        return x;
    };


    $scope.placeHold = function () {
    };
}