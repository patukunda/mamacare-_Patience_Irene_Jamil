function MoreMyMovieReceiptCtrl($scope, $stateParams,  $ionicPopup, $ionicLoading, $cordovaDialogs,   $ionicHistory, Account, Utility, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.loaded = false;
    $scope.mybooking = null;
    $scope.receiptBookingId = $stateParams.id;
    More.getUsersReceiptBooking($scope);

    $scope.doRefresh = function () {
        $scope.receiptBookingId = $stateParams.id;
        More.getUsersReceiptBooking($scope);
        $scope.$broadcast('scroll.refreshComplete');
    };


    $scope.placeHold = function () {
    };

    $scope.formatMovieDate = function(movieDate){
        var temp = moment(movieDate);
        var xday = moment().weekday(temp.weekday()).format('ddd') + ((temp.weekday()=='4')?'r':'');
        var dayOfMonth = temp.date();
        var yday = "";
        if(dayOfMonth == 1){
          yday = "01st";
        }else if(dayOfMonth == 2){
          yday = "02nd";
        }else if(dayOfMonth == 3){
          yday = "03rd";
        }else if(dayOfMonth == 21){
          yday = "21st";
        }else if(dayOfMonth == 22){
          yday = "22nd";
        }
        else if(dayOfMonth == 23){
          yday = "23rd";
        }else if(dayOfMonth == 31){
          yday = "31st";
        }else {
          if(dayOfMonth < 10){
            yday = "0" + dayOfMonth + "th";
          }else{
            yday = dayOfMonth + "th";
          }
        }
        var zmonth = moment().month(temp.month()).format('MMM');
        var fdate = xday + "  " + yday + " " + zmonth + ", " + temp.year();
        return fdate;
    };


    $scope.deleteTicket = function () {

        //prompt to confirm
        $cordovaDialogs.confirm('Do you really want to delete this ticket', 'Ticket options', ['Delete Ticket', 'Cancel']).then(function (buttonIndex) {
            // no button = 0, 'OK' = 1, 'Cancel' = 2
            var btnIndex = buttonIndex;
            if(btnIndex == 0){
                return null;
            } else if (btnIndex == 1) { //delete ticket
                $ionicLoading.show({ template: "<div class='yammzitSpinner'><ion-spinner icon='android'></ion-spinner><div>", noBackdrop: false });
                More.deleteUsersReceiptBooking($scope,function(res){
                  $ionicLoading.hide();
                  //go back
                  $ionicHistory.goBack();
                });
            } else if (btnIndex == 2) { //cancel
                return null;
            } else if (btnIndex == 3) {
                return null;
            }
        });



    };


}
