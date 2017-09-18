function SignupCtrl($scope, $state, $ionicPopup, Account, $ionicPopup, $ionicLoading) {

    $scope.facilities = Account.getFacilities();


    $scope.signupModel = {
        id: (Math.random() * 10),
        name: "",
        address: "",
        usernme: "",
        facilityId: 1,
        password: "",
        accepts_terms: false,
        errors : []
    };

    
    $scope.signUp = function () {
        //clear any previous errors
        $scope.signupModel.errors = null;
        $scope.signupModel.errors = [];

        //validations
        //terms and conditions
        if ($scope.signupModel.accepts_terms == false) {
            $scope.signupModel.errors.push("You must accept the terms and conditions");
        }
        //tfacility
        $scope.signupModel.facilityId = parseInt($scope.signupModel.facilityId);
        console.log($scope.signupModel.facilityId);
        if (typeof $scope.signupModel.facilityId == 'undefined' || $scope.signupModel.facilityId == null ||
            $scope.signupModel.facilityId == 0 ) {
            $scope.signupModel.errors.push("You have to be attached to a facility");
        }
        //username
        if ($scope.signupModel.username == '' ||
            $scope.signupModel.username == undefined ||
            $scope.signupModel.username.length < 6) {
            $scope.signupModel.errors.push("Username must be aleast six (6) characters long");
        }
        //password
        if ($scope.signupModel.password == '' ||
            $scope.signupModel.password == undefined ||
            $scope.signupModel.password.length < 6) {
            $scope.signupModel.errors.push("Password must be aleast six (6) characters long");
        }

        //name
        if ($scope.signupModel.name == '' || $scope.signupModel.name == undefined ) {
            $scope.signupModel.errors.push("The name is required");
        } else {
            $scope.signupModel.name = $scope.signupModel.name.trim();
            if($scope.signupModel.name.length < 1){
                $scope.signupModel.errors.push("The  name must be aleast one (1) character long");
            }
        }

        if ($scope.signupModel.address == '' || $scope.signupModel.address == undefined ) {
            $scope.signupModel.errors.push("The last address is required");
        } else {
            $scope.signupModel.address = $scope.signupModel.address.trim();
            if($scope.signupModel.address.length < 1){
                $scope.signupModel.errors.push("The address must be aleast one (1) character long");
            }
        }

        if ($scope.signupModel.errors != null && $scope.signupModel.errors != undefined && $scope.signupModel.errors.length > 0) {
            return false;
        }

        $ionicLoading.show({ template: "<div class='yammzitSpinner'><ion-spinner icon='android'></ion-spinner><div>", noBackdrop: false });
        Account.signUp($scope.signupModel, function (user) {
            $ionicLoading.hide();
            if (user != null) {
                Account.user = user;
                console.log(Account.user);
                $scope.signupModel.name = "";
                $scope.signupModel.address = "";
                $scope.signupModel.password = "";
                $scope.signupModel.accepts_terms = false;
                $scope.signupModel.errors = [];
                $state.go('tab.register');
            } else {
                $scope.signupModel.errors = [];
                $scope.signupModel.errors.push("There seems to be a problem, registration failed");
            }
        });

    };

    $scope.goToStart = function () {
        $state.go('start');
    }


    $scope.closeLogin = function () {
    };

    $scope.openBrowser = function (link) {
        cordova.InAppBrowser.open(link, '_system', 'location=yes').then(function (event) {
            // success
        }).catch(function (event) {
            var str = JSON.stringify(event);
            alert("link error:" + str);
        });
    };
}
