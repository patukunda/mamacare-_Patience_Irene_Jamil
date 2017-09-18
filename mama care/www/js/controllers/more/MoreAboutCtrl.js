function MoreAboutCtrl($scope, $cordovaInAppBrowser, Account, Utility, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.doRefresh = function () {

        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.openBrowser = function (link) {
        cordova.InAppBrowser.open(link, '_system', 'location=yes').then(function (event) {
            // success
        }).catch(function (event) {
            var str = JSON.stringify(event);
            alert("link error:" + str);
        });
    };

}