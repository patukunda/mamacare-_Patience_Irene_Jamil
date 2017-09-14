function CheckInCtrl($scope, Account) {
    
    $scope.women = Account.getWomen();
    
    console.log("Helo", $scope.women);
}