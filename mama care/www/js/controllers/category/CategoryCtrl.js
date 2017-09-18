﻿function RegisterCtrl($scope, $state, $ionicLoading, Account) {



    Account.getUser($scope, function (user) {});
    $scope.addWomanModel = {
        id: (new Date()).getTime(),
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        dob: "",
        workerId: $scope.user.id,
        height: 0,
        status: false,
        estimatedDateOfDelivery: "",
        dateOfDelivery: "",
        weightOfBaby: 0,
        babyHealthStatus: "",
        wasBabyVaccinated: false,
        isNormalDelivery: false
    }

    $scope.addWoman = function () {

        //firstName
        $scope.addWomanModel.firstName = $scope.addWomanModel.firstName.trim();
        if ($scope.addWomanModel.firstName.length < 3) {
            $ionicLoading.show({ template: "<p style='color:#FFF1F1'>The firstName of the woman must be at least three(3) characters long<p>", noBackdrop: false, duration: 3000 });
            return false;
        }

        //lastName
        $scope.addWomanModel.lastName = $scope.addWomanModel.lastName.trim();
        if ($scope.addWomanModel.lastName.length < 3) {
            $ionicLoading.show({ template: "<p style='color:#FFF1F1'>The lastName of the woman must be at least three(3) characters long<p>", noBackdrop: false, duration: 3000 });
            return false;
        }

        //address
        $scope.addWomanModel.address = $scope.addWomanModel.address.trim();
        if ($scope.addWomanModel.address.length < 6) {
            $ionicLoading.show({ template: "<p style='color:#FFF1F1'>The address of the business must be at least six(6) characters long<p>", noBackdrop: false, duration: 3000 });
            return false;
        }



        if ($scope.addWomanModel.phone.length == 0) {
            $scope.addWomanModel.phone = "  ";
        }

        if ($scope.addWomanModel.dob.length == 0) {
            $scope.addWomanModel.dob = "  ";
        }



        $ionicLoading.show({ template: "<div class='yammzitSpinner'><ion-spinner icon='android'></ion-spinner><div>", noBackdrop: false });

        Account.addWoman($scope.addWomanModel, function (res) {
            $ionicLoading.hide();
            if (res) {
                $state.go('tab.checkin');
            } else {
                $ionicLoading.show({ template: "<p style='color:#FFF1F1'>Failed to add the business<p>", noBackdrop: false, duration: 3000 });
            }
        });

    };

    $scope.$on('$ionicView.enter', function () {
        console.log("recalling");
    })

   

}
