
function StartCtrl($scope, $ionicSlideBoxDelegate) {

   
    // Called each time the slide changes
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };
     
    
}