//This is used to send messages to the user who sent a message to the business
function MoreBusinessMessagesChatCtrl($scope, $state, $stateParams, $ionicHistory, $http, $q, Utility, Account) {


    var business_id = $stateParams.id;
    var user_id = $stateParams.userId;
    //alert(userid);
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };


    $scope.user = Account.getThisUser();
    //get_users_messages

    $scope.fetchThisBusinessesMessagesForThisUser = function () {
        var defer = $q.defer();
        var link = APP_DOMAIN + "get_businesses_messeges_for_user.php?callback=JSON_CALLBACK&id=" + business_id + "&userid=" + user_id;
        console.log("fetchThisBusinessesMessagesForThisUser @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    $scope.loadUserMessages = function () {
        $scope.fetchThisBusinessesMessagesForThisUser().then(function (data) {
            //success
            console.log("fetch users business messages success : ", data);
            if (data.errors.length > 0) {
                console.log("fetch users busines messages fail : ", data.errors);
            } else {
                $scope.dialogue = data.data;
            }
        }, function (code) {
            //error
            console.log("fetch users business messages fail : ", code);
        });
    };


    $scope.sendUsersMessage = function (msg) {
        var defer = $q.defer();
        //var dataStr = JSON.stringify(msg);
        //nyd
        //escape the msg string in html
        //alert($scope.messageToSend);
        var link = APP_DOMAIN + "addBusinessToUsersMessage.php?callback=JSON_CALLBACK&id=" + business_id + "&userid=" + user_id + "&msg=" + msg;
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
            $scope.sendUsersMessage($scope.messageToSend).then(function (data) {
                //success
                console.log("send business to users  message success : ", data);
                if (data.errors.length > 0) {
                    console.log("send business to users message error : ", data.errors);
                } else {
                    var msg = data.data;
                    //get the message
                    $scope.dialogue.chats.push(msg);                    
                    $scope.messageToSend = "";
                    $("#toFocus").focus();
                    $("#messageInput").focus();
                }
            }, function (code) {
                //error
                console.log("send business to users message : ", code);
            });
        }
    };
    $scope.messageToSend = "";

    //get the user in question
    //Account.loadThisUserOfIdV2($scope, $stateParams.id);

    $scope.loadUserMessages();



    $scope.zonofTime = window.zonofTime;
    $scope.correctTime = function (tym) {
        var x = Utility.getCorrectTime(tym, window.zonofTime);
        return x;
    };


    $scope.placeHold = function () {
    };
}