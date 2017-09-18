function UserProfileMessageCtrl($scope, $state, $stateParams, $ionicHistory, $http, $q, Utility, Account) {
    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    //get the user in question
    $scope.thisUser = Account.getLoadedThisUser();
    $scope.thisUser.messages = [];
    console.log($scope.thisUser);
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.user = Account.getThisUser();

    $scope.fetchThisUserMessages = function () {
        var defer = $q.defer();
        var messageModel = {
            user_id: $scope.thisUser.id
        };
        var dataStr = JSON.stringify(messageModel);
        console.log("user is here", $scope.user);
        var link = APP_DOMAIN + "get_users_messages.php?callback=JSON_CALLBACK&" + $scope.user.credential + "&postdata=" + dataStr;
        console.log("fetchThisUserMessages @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };
    
    $scope.loadUserMessages = function () {
        $scope.fetchThisUserMessages().then(function (data) {
            //success
            console.log("fetch users messages success : ", data);
            if (data.errors.length > 0) {
                console.log("fetch users messages fail : ", data.errors);
            } else {
                $scope.thisUser.messages = data.data
            }
        }, function (code) {
            //error
            console.log("fetch users messages fail : ", code);
        });
    };
    $scope.loadUserMessages();

    

    $scope.sendUsersMessage = function (MessageModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(MessageModel);
        var link = APP_DOMAIN + "addUsersMessage.php?callback=JSON_CALLBACK&" + $scope.user.credential + "&postdata=" + dataStr;
        console.log("sendUsersMessage @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };
    $scope.sendMessage = function () {
        console.log("mts :" + $scope.messageToSend);
        if ($scope.messageToSend.length > 0) {
            var MessageModel = {
                user_id: $scope.thisUser.id,
                details: $scope.messageToSend
            };
            $scope.sendUsersMessage(MessageModel).then(function (data) {
                //success
                console.log("send users message success : ", data);
                if (data.errors.length > 0) {
                    console.log("send users message error : ", data.errors);
                } else {
                    var msg = data.data;
                    //get the message
                    $scope.thisUser.messages.push(msg);
                    Account.setLoadedThisUser($scope.thisUser);
                    $scope.messageToSend = "";
                    $("#toFocus").focus();
                    $("#messageInput").focus();
                }
            }, function (code) {
                //error
                console.log("send users message fail : ", code);
            });
        }
    };
    $scope.messageToSend = "";

   

    $scope.doRefresh = function () {
        $scope.messageToSend = "";
        $scope.thisUser = Account.getLoadedThisUser();
        $scope.thisUser.messages = [];
        $scope.fetchThisUserMessages();


        $scope.$broadcast('scroll.refreshComplete');
    };
}