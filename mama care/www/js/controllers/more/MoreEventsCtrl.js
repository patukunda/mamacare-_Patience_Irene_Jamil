function MoreEventsCtrl($scope, Account, Utility, Request) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.doRefresh = function () {

        $scope.$broadcast('scroll.refreshComplete');
    };

    //alert("Hey you");

    $scope.currentSelectedTab = 0;
    $scope.changeTab = function(tabIndex){
      $scope.currentSelectedTab = tabIndex;
    };

    //get the  events
    $scope.events = {
      upcoming:[],
      invites:[],
      past:[]
    };
    Request.get($scope,'events',yo.endPoints.getEvents(),{name:"MoreEventsCtrl ", lnb: true});

}
