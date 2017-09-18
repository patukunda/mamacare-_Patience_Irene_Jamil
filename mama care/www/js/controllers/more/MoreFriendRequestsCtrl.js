function MoreFriendRequestsCtrl($scope, Account, More, Utility, Countries) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    Account.getUsersFriendRequests($scope.user, function (requests) {
        $scope.requests = requests;
    });

   
    $scope.requests = [];
    $scope.doRefresh = function () {
        $scope.user = Account.getThisUser();
        $scope.requests = [];
        Account.getUsersFriendRequests($scope.user, function (requests) {
            $scope.requests = requests;

            $scope.$broadcast('scroll.refreshComplete');
        });

        
    };

    $scope.acceptRequest = function (friend_id) {
        Account.acceptFriendRequest($scope.user, friend_id, function (res) {
            if (res == true) {
                //remove from ui
                for (var i = 0; i < $scope.requests.length; i++) {
                    if ($scope.requests[i].id == friend_id) {
                        $scope.requests.splice($scope.requests.indexOf($scope.requests[i]), 1);
                    }
                }
            }
        });
    };

    $scope.blockUser = function (friend_id) {
        Account.declineFriendRequest($scope.user, friend_id, function (res) {
            if (res == true) {
                //remove from ui
                for (var i = 0; i < $scope.requests.length; i++) {
                    if ($scope.requests[i].id == friend_id) {
                        $scope.requests.splice($scope.requests.indexOf($scope.requests[i]), 1);
                    }
                }
            }
        });
    };


    $scope.zonofTime = window.zonofTime;
    //alert($scope.zonofTime);
    $scope.correctTime = function (tym) {
        var tm = Utility.getCorrectTime(tym, window.zonofTime);
        return tm;
    };

    $scope.placeHold = function () {
    };


}