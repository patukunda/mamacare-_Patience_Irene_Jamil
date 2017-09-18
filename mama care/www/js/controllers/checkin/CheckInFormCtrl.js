function CheckInFormCtrl($scope, $stateParams, $ionicHistory, Account) {
    

    $scope.id = $stateParams.id;
    
    $scope.woman = Account.getWomanOfId($scope.id);

    console.log("They are ",$scope.woman);

    $scope.followupModel = {
        id: (new Date()).getTime(),
        womanId: $scope.id,
        weight: 0,
        lastAntentalVisit: "",
        antentalCenter: "",
        wasVaccinated: "",
        vaccination: "",
        vaccinationDate: "",
        date: new Date(),
        errors: [],
    };


    $scope.addFollowUp = function () {
        Account.saveFolloup($scope.followupModel, function (res) {
            $ionicHistory.goBack();
        });
    };

    $scope.view = 0;
    $scope.showCard = function (id) {
        $scope.view = id;
    };


    $scope.maternalModel = {
        height: $scope.woman.height,
        status: $scope.woman.status,
        estimatedDateOfDelivery: $scope.woman.estimatedDateOfDelivery,
        dateOfDelivery: $scope.woman.dateOfDelivery,
        weightOfBaby: $scope.woman.weightOfBaby,
        babyHealthStatus: $scope.woman.babyHealthStatus,
        wasBabyVaccinated: $scope.woman.wasBabyVaccinated,
        isNormalDelivery: $scope.woman.isNormalDelivery,
        errors: []
    };

    $scope.updateMaternal = function () {
        $scope.woman.height = $scope.maternalModel.height;
        $scope.woman.status = $scope.maternalModel.status;
        $scope.woman.estimatedDateOfDelivery = $scope.maternalModel.estimatedDateOfDelivery;
        $scope.woman.dateOfDelivery = $scope.maternalModel.dateOfDelivery;
        $scope.woman.weightOfBaby = $scope.maternalModel.weightOfBaby;
        $scope.woman.babyHealthStatus = $scope.maternalModel.babyHealthStatus;
        $scope.woman.wasBabyVaccinated = $scope.maternalModel.wasBabyVaccinated;
        $scope.woman.isNormalDelivery = $scope.maternalModel.isNormalDelivery;
        console.log($scope.woman);
        Account.updateWoman($scope.woman, function (res) {
            $ionicHistory.goBack();
        });
    };


    $scope.isFine = function (hay) {
        if(typeof hay != 'undefined' &&
           hay  != undefined &&
           hay != null &&
           hay.toString().length > 0) {
            //console.log("hay",hay);
            return true;
        }
        return false;
    };

    $scope.renderDate = function (dt) {
        if ($scope.isFine(dt) == false) {
            return "";
        }
        if (dt.toString().indexOf("T") > 0) {
            if (dt.toString().split("T")[0].indexOf("G") > 0) {
                var parts = dt.toString().split("T")[0].split(' ');
                return parts[0] + " " + parts[1] + " " + parts[2] + " " + parts[3];
            }
            return dt.toString().split("T")[0];
        } else {
            var parts = dt.toString().split(" ");
            return parts[0] + " " + parts[1] + " " + parts[2] + " " + parts[3];
        }       
    };
}