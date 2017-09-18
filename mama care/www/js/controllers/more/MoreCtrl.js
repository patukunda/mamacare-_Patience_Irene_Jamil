function MoreCtrl($scope, Categories, Account, Utility, More) {

    Categories.resetAllSelectedCategories();

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.signOut = function () {
        Account.signOut();
        //nyd
        //exit the application
    };
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;


    $scope.doRefresh = function () {
        $scope.user = Account.getThisUser();

        $scope.unreadBusinessMessagesCount = 0;
        Account.getUnreadBusinessMessagesCount($scope.user, function (num) {
            $scope.unreadBusinessMessagesCount = num;
            $scope.friendRequestsCount = 0;
            Account.getFriendRequestsCount($scope.user, function (num) {
                $scope.friendRequestsCount = num;
                $scope.unreadMyBusinessMessagesCount = 0;
                Account.getUnreadMyBusinessMessagesCount($scope.user, function (num) {
                    $scope.unreadMyBusinessMessagesCount = num;
                    $scope.$broadcast('scroll.refreshComplete');
                });
            });           
        });

        
    };

    $scope.unreadBusinessMessagesCount = 0;
    Account.getUnreadBusinessMessagesCount($scope.user, function (num) {
        $scope.unreadBusinessMessagesCount = num;
    });

    $scope.unreadMyBusinessMessagesCount = 0;
    Account.getUnreadMyBusinessMessagesCount($scope.user, function (num) {
        $scope.unreadMyBusinessMessagesCount = num;
    });

    $scope.friendRequestsCount = 0;
    Account.getFriendRequestsCount($scope.user, function (num) {
        $scope.friendRequestsCount = num;
    });

}