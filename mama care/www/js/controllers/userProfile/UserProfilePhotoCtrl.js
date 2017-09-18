function UserProfilePhotoCtrl($scope, $state, $stateParams, $ionicHistory, $http, $q, Utility, Account) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    //get the user in question
    $scope.thisUser = Account.getLoadedThisUser();
    console.log($scope.thisUser);
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.doRefresh = function () {
        
        //get the user in question
        $scope.thisUser = Account.getLoadedThisUser();

        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.items = [];
    for (var i = 0; i < $scope.thisUser.photoes.length; i++) {
        var photoObject = {
            src:$scope.getImage('banner',$scope.thisUser.photoes[i].photo),
            sub:$scope.thisUser.photoes[i].business.name + " on " + $scope.thisUser.photoes[i].date_created
        };
        $scope.items.push(photoObject);
    }

    //  {
    //       'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
    //       'This is a <b>subtitle</b>'
    //  },
    //  {
    //      src: 'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
    //      sub: '' /* Not showed */
    //  },
    //  {
    //      src: 'http://www.hdwallpapersimages.com/wp-content/uploads/2014/01/Winter-Tiger-Wild-Cat-Images.jpg',
    //      thumb: 'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
    //  }
    //];
}