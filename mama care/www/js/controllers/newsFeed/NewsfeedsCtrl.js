function NewsfeedsCtrl($scope, $state, $rootScope, $cordovaSocialSharing, $ionicSlideBoxDelegate, $cordovaGeolocation, $ionicActionSheet, $http, $q, $ionicLoading, Account) {

   
    $scope.user = Account.getThisUser();

    $scope.newsFeedKinds = {
        review: 'review',
        review_photo: 'review_photo',
        rate: 'rate',
        new_friend: 'new_friend',
        add_business: 'add_business',
        add_photo: 'add_photo',
        business_post: 'business_post',
        business_photo: 'business_photo',
        business_post_photo: 'business_post_photo',
        business_edit_banner: 'business_edit_banner',
        business_edit_logo: 'business_edit_logo',
        business_edit_info: 'business_edit_info',
        business_edit_some_info: 'business_edit_some_info',
        business_edit_name: 'business_edit_name',
        business_edit_all: 'business_edit_all',
        business_follow: 'business_follow',
        business_favourite: 'business_favourite',
        add_comment: 'add_comment',
        shared_review: 'shared_review',
        shared_add_business: 'shared_add_business',
        shared_business_favourite: 'shared_business_favourite',
        add: 'add',
        tip_welcome : "tip_welcome",
        tip_search_friends : "tip_search_friends",
        tip_follow_businesses:  "tip_follow_businesses",
        tip_follow_people : "tip_follow_people",
        tip_add_business: "tip_add_business",
        check_in: "check_in",
    };

    

    
    
    $scope.searchStr = "";
    $scope.$watch('searchStr', function (newValue, oldValue) {
        if (newValue != oldValue && newValue.length > 0) {
            $scope.log("searchingfor", newValue );
            Search.setQuery(newValue);
        }
    }, true);

    $scope.keyPressed = function(keyEvent) {
        if (keyEvent.keyCode == 13) {
            var temp = $scope.searchStr;
            if(temp.length > 0){
                $scope.searchStr = "";
                Search.setQuery(temp);
                $state.go('tab.searchresults');
            }
        }
    };

    
    
   
}
