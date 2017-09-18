function SupportCtrl($scope, $state, $rootScope, $http, $q, $ionicLoading, $ionicHistory, Account) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.supportModel = {
        title: "",
        details: "",
        email: $scope.user.email
    };

    $scope.sendUsersSupport = function (user, support) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(support);
        var link = APP_DOMAIN + "addUserSupport.php?callback=JSON_CALLBACK&" + user.credential + "&postdata=" + dataStr;
        console.log("sendUsersSupport @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    $scope.sendSupport = function () {
        $ionicLoading.show({ template: "<div class='yammzitSpinner'><ion-spinner icon='android'></ion-spinner><div>", noBackdrop: false });
        $scope.sendUsersSupport($scope.user, $scope.supportModel).then(function (data) {
            $ionicLoading.hide();
            //success
            console.log("send users support success : ", data);
            if (data.errors.length > 0) {
                console.log("send users support fail : ", data.errors);
                $ionicLoading.show({ template: "<p style='color:#FFF1F1'>Support  delivery has failed<p>", noBackdrop: false, duration: 3000 });
            } else {
                $scope.supportModel = {
                    title: "",
                    details: "",
                    email: $scope.user.email
                };
                $ionicHistory.goBack();
            }
        }, function (code) {
            //error
            console.log("send users support query fail : ", code);
            $ionicLoading.show({ template: "<p style='color:#FFF1F1'>Failed to send support issue<p>", noBackdrop: false, duration: 3000 });
        });
    };


}