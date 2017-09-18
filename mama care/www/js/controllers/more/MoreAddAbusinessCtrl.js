function MoreAddAbusinessCtrl($scope, $state, $cordovaCamera, $ionicLoading, Account, Countries, Categories, Utility, MyBusinesses) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.doRefresh = function () {
        $scope.chosenCategories = [];
        $scope.addBusinessModel = {
            country: Countries.getCountry(),
            name: "",
            address: "",
            city: Countries.getCity(),
            categories: Categories.getSelectedCategories(),
            phone_1: "",
            website: "",
            banner: "",
        };


        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.chosenCategories = [];
    $scope.addBusinessModel = {
        country: Countries.getCountry(),
        name: "",
        address: "",
        city: Countries.getCity(),
        categories: Categories.getSelectedCategories(),
        phone_1: "",
        website: "",
        banner: "",
    };

    console.log("The county is:", $scope.addBusinessModel.country);



    console.log("Getting this user for add a business: ");
    //check if this user has a session on the server
    $scope.user = Account.getThisUser();

    $scope.addBusiness = function (form) {

        $scope.getImage = function (type, url) {
            return Utility.getImage(type, url);
        };


        //name
        $scope.addBusinessModel.name = $scope.addBusinessModel.name.trim();
        if ($scope.addBusinessModel.name.length < 3) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            $ionicLoading.show({ template: "<p style='color:#FFF1F1'>The name of the business must be at least three(3) characters long<p>", noBackdrop: false, duration: 3000 });
            return false;
        }

        //address
        $scope.addBusinessModel.address = $scope.addBusinessModel.address.trim();
        if ($scope.addBusinessModel.address.length < 6) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            $ionicLoading.show({ template: "<p style='color:#FFF1F1'>The address of the business must be at least six(6) characters long<p>", noBackdrop: false, duration: 3000 });
            return false;
        }

        //city
        //validating the city validates the country beacuse you cannot have a city without the country
        if ($scope.addBusinessModel.city == null) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            $ionicLoading.show({ template: "<p style='color:#FFF1F1'>The city of the business is required<p>", noBackdrop: false, duration: 3000 });
            return false;
        }

        //categories
        if ($scope.addBusinessModel.categories.length == 0) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            $ionicLoading.show({ template: "<p style='color:#FFF1F1'>You need at least one category<p>", noBackdrop: false, duration: 3000 });
            return false;
        }

        if ($scope.addBusinessModel.phone_1.length == 0) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            $scope.addBusinessModel.phone_1 = "  ";
        }

        if ($scope.addBusinessModel.website.length == 0) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            $scope.addBusinessModel.website = "  ";
        }


        $ionicLoading.show({ template: "<div class='yammzitSpinner'><ion-spinner icon='android'></ion-spinner><div>", noBackdrop: false });
        console.log("Add bussiness model : ", $scope.addBusinessModel);
        MyBusinesses.add($scope.user, $scope.addBusinessModel, function (res) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            $ionicLoading.hide();
            console.log("add bussiness returned ", res);
            if (res) {

                $scope.getImage = function (type, url) {
                    return Utility.getImage(type, url);
                };

                //got to news feeds
                $state.go('tab.more');
            } else {
                $ionicLoading.show({ template: "<p style='color:#FFF1F1'>Failed to add the business<p>", noBackdrop: false, duration: 3000 });
            }
        });

    };

    $scope.$on('$ionicView.enter', function () {

        $scope.getImage = function (type, url) {
            return Utility.getImage(type, url);
        };

        console.log("recalling");
        $scope.addBusinessModel.country = Countries.getCountry();
        $scope.addBusinessModel.city = Countries.getCity();
        $scope.addBusinessModel.categories = Categories.getSelectedCategories();
    });

    $scope.takePhoto = function () {

        $scope.getImage = function (type, url) {
            return Utility.getImage(type, url);
        };

        //Camera.DestinationType.DATA_URL,Camera.DestinationType.FILE_URI
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            $scope.addBusinessModel.banner = "data:image/jpeg;base64," + imageData;
        }, function (err) {

            $scope.getImage = function (type, url) {
                return Utility.getImage(type, url);
            };

            // An error occured. Show a message to the user
            $ionicLoading.show({ template: "!!! Oops, something went wrong ", noBackdrop: false, duration: 2000 });
        });
    };

}