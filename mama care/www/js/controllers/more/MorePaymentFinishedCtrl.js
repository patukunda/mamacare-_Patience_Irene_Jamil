function MorePaymentFinishedCtrl($scope, $state, $ionicPopup, $ionicLoading, $rootScope, $ionicViewService, $ionicHistory,Account, Utility, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.loaded = false;

    $scope.payDetails = More.getPaymentDetails();
    $ionicViewService.nextViewOptions({
       disableBack: true
    });
    //$ionicHistory.clearCache();
    $ionicHistory.clearHistory();

    $scope.$on('$ionicView.afterEnter', function(){
        //SUBMIT OUT PAYMENT FORM
        if($scope.payDetails != null){
          //console.log($scope.payDetails);
          $('#payDetails_password').val($scope.payDetails.password);
          $('#payDetails_email').val($scope.payDetails.email);
          $('#payDetails_movieDateId').val($scope.payDetails.movieDateId);
          $('#payDetails_payphone').val($scope.payDetails.payphone);
          $('#payForm_email').val($scope.payDetails.email);
          $('#moviePaymentForm').submit();
          More.removePaymentDetails();
        }else{
          $scope.loaded = true;
        }
    });

    $scope.doRefresh = function () {
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.placeHold = function () {
    };

    $scope.range = function(num){
      return new Array(num);
    }

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

    $scope.openBrowser = function (link) {
        cordova.InAppBrowser.open(link, '_system', 'location=yes').then(function (event) {
            // success
        }).catch(function (event) {
            var str = JSON.stringify(event);
            alert("link error:" + str);
        });
    };

    $scope.finishPayment = function(){
      $state.go("tab.more");
    }

    //nyd
    //delete all previous history
    //$rootScope.$viewHistory.backView = null;
    $ionicViewService.nextViewOptions({
       disableBack: true
    });
    $ionicHistory.clearHistory();

    //nyd
    //clicking the back button should delete previous history
    //and take you to tab.more

}
