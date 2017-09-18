/// <reference path="../../../templates/more/tab-more-findfriends.html" />
function MoreBusinessToClaimPageCtrl($scope, $state, $stateParams, $cordovaDialogs, $cordovaCamera, $ionicLoading, Account, Utility, More, Categories) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.businessid = $stateParams.id;

    $scope.user = Account.getThisUser();

    $scope.claimModel = {
        user_id: $scope.user.id,
        business_id: $scope.businessid,
        phone_1: 0,
        phone_2: 0,
        email: "",
        address : "",
        position: "",
        banner_web: "",
        banner_mobile: "",
        logo_web: "",
        logo_mobile: "",
        other: "",
        description: "",
        category1: null,
        category1_id: 0,
        category2: null,
        category2_id: 0,
        category3: null,
        category3_id: 0,
        monday_open: "",
        monday_close: "",
        tuesday_open: "",
        tuesday_close: "",
        wednesday_open: "",
        wednesday_close: "",
        thursday_open: "",
        thursday_close: "",
        friday_open: "",
        friday_close: "",
        saturday_open: "",
        saturday_close: "",
        sunday_open: "",
        sunday_close: "",
        facebook_link: "",
        twitter_link: "",
        instagram_link: "",
        youtube_link: "",
        other_take_away: false,
        other_accepts_credit_card: false,
        other_good_for_children: false,
        other_good_for_groups: false,
        other_music: false,
        other_good_for_dancing: false,
        other_alcohol: false,
        other_happy_hour: false,
        other_best_night: false,
        other_outdoor_seating: false,
        other_has_wi_fi: false,
        other_good_for_groups: false,
        other_has_tv: false,
        other_water_service: false,
        other_has_pool_table: false
    };

    $scope.takeBannerPhoto = function () {
        //prompt to pick image from gallary or take photo
        $cordovaDialogs.confirm('Choose source of photo', 'Photo options', ['Image Gallery', 'Take a photo', 'Cancel']).then(function (buttonIndex) {
            // no button = 0, 'OK' = 1, 'Cancel' = 2
            var btnIndex = buttonIndex;
            if (btnIndex == 0) {
                return null;
            } else if (btnIndex == 1) { //image gallery              

                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };


                $cordovaCamera.getPicture(options).then(function (imageData) {
                    //alert("when hello");
                    $scope.claimModel.banner_web = "data:image/jpeg;base64," + imageData;
                }, function (err) {
                    //alert("fees hello");
                    // An error occured. Show a message to the user
                    //$ionicLoading.show({ template: "!!! Oops, something went wrong in picking ", noBackdrop: false, duration: 2000 });
                    alert("!!! Oops, something went wrong in picking ");
                    alert(err);
                });





            } else if (btnIndex == 2) { //camera
                //alert("hello");
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
                //alert("after hello");
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    //alert("when hello");
                    $scope.claimModel.banner_web = "data:image/jpeg;base64," + imageData;
                }, function (err) {
                    //alert("fees hello");
                    // An error occured. Show a message to the user
                    $ionicLoading.show({ template: "!!! Oops, something went wrong ", noBackdrop: false, duration: 2000 });
                });
            } else if (btnIndex === 3) {
                return null;
            }
        });
    };

    

    $scope.takeLogoPhoto = function () {
        //prompt to pick image from gallary or take photo
        $cordovaDialogs.confirm('Choose source of photo', 'Photo options', ['Image Gallery', 'Take a photo', 'Cancel']).then(function (buttonIndex) {
            // no button = 0, 'OK' = 1, 'Cancel' = 2
            var btnIndex = buttonIndex;
            if (btnIndex == 0) {
                return null;
            } else if (btnIndex == 1) { //image gallery              

                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };


                $cordovaCamera.getPicture(options).then(function (imageData) {
                    //alert("when hello");
                    $scope.claimModel.logo_web = "data:image/jpeg;base64," + imageData;
                }, function (err) {
                    //alert("fees hello");
                    // An error occured. Show a message to the user
                    //$ionicLoading.show({ template: "!!! Oops, something went wrong in picking ", noBackdrop: false, duration: 2000 });
                    alert("!!! Oops, something went wrong in picking ");
                    alert(err);
                });





            } else if (btnIndex == 2) { //camera
                //alert("hello");
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
                //alert("after hello");
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    //alert("when hello");
                    $scope.claimModel.logo_web = "data:image/jpeg;base64," + imageData;
                }, function (err) {
                    //alert("fees hello");
                    // An error occured. Show a message to the user
                    $ionicLoading.show({ template: "!!! Oops, something went wrong ", noBackdrop: false, duration: 2000 });
                });
            } else if (btnIndex === 3) {
                return null;
            }
        });
    };

    $scope.$on('$ionicView.enter', function () {
        var selectedCatergories = Categories.getSelectedCategories();

        if (selectedCatergories != null && selectedCatergories.length > 0) {
            //console.log("they are here", $scope.claimModel.category3);
            if (selectedCatergories.length == 1) {
                $scope.claimModel.category1 = selectedCatergories[0];
                $scope.claimModel.category1_id = $scope.claimModel.category1.id;
                $scope.claimModel.category2 = null;
                $scope.claimModel.category2_id = 0;
                $scope.claimModel.category3 = null;
                $scope.claimModel.category3_id = 0;
            }

            if (selectedCatergories.length == 2) {
                $scope.claimModel.category1 = selectedCatergories[0];
                $scope.claimModel.category1_id = $scope.claimModel.category1.id;
                $scope.claimModel.category2 = selectedCatergories[1];
                $scope.claimModel.category2_id = $scope.claimModel.category2.id;
                $scope.claimModel.category3 = null;
                $scope.claimModel.category3_id = 0;
            }

            if (selectedCatergories.length == 3) {
                $scope.claimModel.category1 = selectedCatergories[0];
                $scope.claimModel.category1_id = $scope.claimModel.category1.id;
                $scope.claimModel.category2 = selectedCatergories[1];
                $scope.claimModel.category2_id = $scope.claimModel.category2.id;
                $scope.claimModel.category3 = selectedCatergories[2];
                //console.log("i dont know", $scope.claimModel.category3);
                $scope.claimModel.category3_id = $scope.claimModel.category3.id;
            }          
        } else {
            $scope.claimModel.category1 = null;
            $scope.claimModel.category1_id = 0;
            $scope.claimModel.category2 = null;
            $scope.claimModel.category2_id = 0;
            $scope.claimModel.category3 = null;
            $scope.claimModel.category3_id = 0;
        }
    });


    $scope.claimBusiness = function () {
        //validate data
        //nyd

        $ionicLoading.show({ template: "<div class='yammzitSpinner'><ion-spinner icon='android'></ion-spinner><div>", noBackdrop: false });
       
        $scope.category1= $scope.clearClaimModal.category1;
        $scope.category2= $scope.clearClaimModal.category2;
        $scope.category3= $scope.clearClaimModal.category3;
        $scope.clearClaimModal.category1 = null;
        $scope.clearClaimModal.category2 = null;
        $scope.clearClaimModal.category3 = null;
        Account.sendBusinessClaim($scope.user, $scope.claimModel, function (res) {
            $ionicLoading.hide();
            console.log("update profile returned ", res);
            if (res) {
                $ionicLoading.show({ template: "<p style='color:#FFF1F1'>Your claim has been submitted successfully<p>", noBackdrop: false, duration: 3000 });
                //clear the fields
                $scope.clearClaimModal();
                //got to claim your business page
                $state.go('tab.claimyourbusiness');
            } else {
                $ionicLoading.show({ template: "<p style='color:#FFF1F1'>Failed to send your business claim<p>", noBackdrop: false, duration: 3000 });
                
                $scope.clearClaimModal.category1 = $scope.category1;
                $scope.clearClaimModal.category2 = $scope.category2;
                $scope.clearClaimModal.category3 = $scope.category3;
                $scope.category1 = null;
                $scope.category2 = null;
                $scope.category3 = null;
            }
        });
    };

    $scope.clearClaimModal = function () {
        $scope.claimModel = null;
        $scope.claimModel = {
            user_id: $scope.user.id,
            business_id: $scope.businessid,
            phone_1: 0,
            phone_2: 0,
            email: "",
            address: "",
            position: "",
            banner_web: "",
            banner_mobile: "",
            logo_web: "",
            logo_mobile: "",
            other: "",
            description: "",
            category1: null,
            category1_id : 0,
            category2: null,
            category2_id : 0,
            category3: null,
            category3_id : 0,
            monday_open: "",
            monday_close: "",
            tuesday_open: "",
            tuesday_close: "",
            wednesday_open: "",
            wednesday_close: "",
            thursday_open: "",
            thursday_close: "",
            friday_open: "",
            friday_close: "",
            saturday_open: "",
            saturday_close: "",
            sunday_open: "",
            sunday_close: "",
            facebook_link: "",
            twitter_link: "",
            instagram_link: "",
            youtube_link: "",
            other_take_away: false,
            other_accepts_credit_card: false,
            other_good_for_children: false,
            other_good_for_groups: false,
            other_music: false,
            other_good_for_dancing: false,
            other_alcohol: false,
            other_happy_hour: false,
            other_best_night: false,
            other_outdoor_seating: false,
            other_has_wi_fi: false,
            other_good_for_groups: false,
            other_has_tv: false,
            other_water_service: false,
            other_has_pool_table: false
        };
    };

    
}