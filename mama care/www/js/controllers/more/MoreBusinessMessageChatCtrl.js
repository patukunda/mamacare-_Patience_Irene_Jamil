function MoreBusinessMessageChatCtrl($scope, $state, $stateParams, $ionicHistory, $ionicLoading, $cordovaCamera, $cordovaDialogs, $cordovaImagePicker, Business, Utility, Account) {
    $scope.user = Account.getThisUser();

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    //get the business in question
    $scope.business_id = parseInt($stateParams.id);
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;


    $scope.loadUserMessage = function () {
        Business.fetchBusinessMessagesWithUser($scope);
    };



    $scope.messageToSend = "";
    $scope.sendMessage = function () {
        Business.sendMessageOfUserToBusiness($scope);
    };

    //when ever this page is entered 
    $scope.$on('$ionicView.enter', function (e) {       
        $scope.loadUserMessage();        
    });


    $scope.zonofTime = window.zonofTime;
    $scope.correctTime = function (tym) {
        var x = Utility.getCorrectTime(tym, window.zonofTime);
        return x;
    };

    $scope.placeHold = function () {
    };


}