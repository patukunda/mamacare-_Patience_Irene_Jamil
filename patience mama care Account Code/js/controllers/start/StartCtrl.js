function StartCtrl($scope, $state, $ionicSlideBoxDelegate) {

   
    // Called each time the slide changes
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };
     
    
}