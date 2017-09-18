function MoreBusinessToClaimCtrl($scope, Utility, Search, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };


    $scope.searchStr = "";
    

    $scope.keyPressed = function (keyEvent) {
        if (keyEvent.keyCode == 13) {
            var temp = $scope.searchStr;
            if (temp.length > 0) {
                More.fetchBusinessesToClaim($scope);
            }
        }
    };

    $scope.search = function () {
        More.fetchBusinessesToClaim($scope);
    };


    More.fetchBusinessesToClaim($scope);
    

}