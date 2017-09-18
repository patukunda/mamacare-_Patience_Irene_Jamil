function LoginCtrl($scope, $state, $ionicPopup, $ionicLoading, Account) {

    $scope.loginModel = {
        username: "",
        password: "",
        errors : []
    };


    $scope.logIn = function () {

        //clear any previous errors
        $scope.loginModel.errors = null;
        $scope.loginModel.errors = [];

        //username
        if ($scope.loginModel.username == '' ||
            $scope.loginModel.username == undefined ||
            $scope.loginModel.username.length < 6) {
            $scope.loginModel.errors.push("Please enter a valid username");
        }
        //password
        if ($scope.loginModel.password == '' ||
            $scope.loginModel.password == undefined ||
            $scope.loginModel.password.length < 6) {
            $scope.loginModel.errors.push("Password must be aleast six (6) characters long");
        }

        if ($scope.loginModel.errors != null && $scope.loginModel.errors != undefined && $scope.loginModel.errors.length > 0) {
            return false;
        }





        console.log("Log in model : ", $scope.loginModel);
        $ionicLoading.show({ template: "<div class='yammzitSpinner'><ion-spinner icon='android'></ion-spinner><div>", noBackdrop: false });
        Account.logIn($scope.loginModel, function (user) {
            console.log("Btn returnedxxx ", user);
            $ionicLoading.hide();
            if (user != null) {
                $state.go('tab.register');
            }else {
                //close the loading indicator
                $ionicLoading.hide();
                $scope.loginModel.errors.push("Failed to login, sign up if you dont have an account");
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
