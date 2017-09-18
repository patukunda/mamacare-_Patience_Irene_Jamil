function CheckInCtrl($scope, Account) {
    
    $scope.allWomen = [];
    $scope.women = Account.getWomen();
    $scope.allWomen = $scope.women;
    
    console.log("Helo", $scope.women);

    $scope.searchStr = "";

    $scope.isFineAndHas = function (obj, attr, hay) {
        //console.log(obj, attr, obj[attr], hay);
        if(typeof obj[attr] != 'undefined' &&
           obj[attr]  != undefined &&
           obj[attr] != null &&
           obj[attr].toString().length > 0 &&
           obj[attr].toString().toLowerCase().indexOf(hay.toLowerCase()) >= 0) {
            console.log(true);
            return true;
        }
        return false;
    };

    $scope.searchWoman = function () {
        $scope.women = $scope.allWomen;
        var temp = $scope.searchStr;
        if (temp.length > 0) {
            var newList = [];
            for (var i = 0; i < $scope.women.length; i++) {
                if ($scope.isFineAndHas($scope.women[i], "firstName", temp) ||
                    $scope.isFineAndHas($scope.women[i], "lastName", temp) ||
                    $scope.isFineAndHas($scope.women[i], "address", temp) ||
                    $scope.isFineAndHas($scope.women[i], "phone", temp)) {
                    newList.push($scope.women[i]);
                }
            }
            $scope.women = newList;
            //$scope.searchStr = "";
        }
    };

    $scope.keyPressed = function (keyEvent) {
        if (keyEvent.keyCode == 13) {
            $scope.searchWoman();
        }
    };
}