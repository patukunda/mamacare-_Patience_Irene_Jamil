function MorePaymentMethodCtrl($scope, $state, $ionicPopup, $ionicLoading, $ionicViewService,$ionicHistory,Account, Utility, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.loaded = true;


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

    $scope.payForm = {
      phone_number: "",
      email: ""
    };

    $scope.errors = [];

    $scope.payBrowser = null;
    $scope.loadStopCallBack = function() {
        if ($scope.payBrowser != undefined) {
          $ionicLoading.hide();
        }else{
          alert("Payment window is not available");
        }
    }
    $scope.loadErrorCallBack = function(params) {
        alert("Sorry we cannot open the payment window. Message from the server is : "+ params.message );
    }
    $scope.exitCallBack = function() {
      $ionicViewService.nextViewOptions({
         disableBack: true
      });
      $ionicHistory.clearHistory();
      //go to the next page
      $state.go('tab.morecinemapaymentfinished');
    }

    $scope.movieDateId = More.getSelectedMoviesShowDateId();
    $scope.payForMovie = function(){
      $scope.errors = [];
      var res = $scope.validateInputs();
      if(res == false){
        alert("The information you provided has some invalid inputs");
      }else{
        $ionicLoading.show({ template: "<div class='yammzitSpinner'><ion-spinner icon='android'></ion-spinner><div>", noBackdrop: false });
        // setPaymentDetails({
        //
        // });

        //the 256
        /*More.registerPaymentDetails($scope,function(results){
          if(results == false){
            $ionicLoading.hide();
            alert("Failed to register payment details");
          }else{
            //alert("we assume that yo payments resulted in a pending state");
            $ionicLoading.hide();
            // using the ionicViewService to hide the back button on next view
            $ionicViewService.nextViewOptions({
               disableBack: true
            });
            $ionicHistory.clearHistory();
            //go to the next page
            $state.go('tab.morecinemapaymentfinished');
          }
        });cordovaHTTP*/

        // var plink  = APP_DOMAIN + "saveCinemaPaymentDetails.php?";
        // plink = plink + "movieDateId=" + More.getSelectedMoviesShowDateId();
        // plink = plink + "&payphone=" + $scope.payForm.phone_number.replace("0","256");
        // plink = plink + "&payemail=" + $scope.payForm.email;
        // plink = plink + "&password=" + $scope.user.password;
        // plink = plink + "&email=" + $scope.user.email;
        // alert(plink);
        // $scope.payBrowser = cordova.InAppBrowser.open(
        //   plink,
        //   '_blank',
        //   'location=yes,clearcache=yes,clearsessioncache=yes').then(function (event) {
        //     // success
        // }).catch(function (event) {
        //     var str = JSON.stringify(event);
        //     alert("link error:" + str);
        // });
        // $scope.payBrowser.addEventListener('loadstop', $scope.loadStopCallBack);
        // $scope.payBrowser.addEventListener('loaderror', $scope.loadErrorCallBack);
        // $scope.payBrowser.addEventListener('exit', $scope.exitCallBack);

        //
        //  window.plugins.CordovaHttpPlugin.get(APP_DOMAIN + "saveCinemaPaymentDetails.php", {
        //       movieDateId: More.getSelectedMoviesShowDateId,
        //       payphone: $scope.payForm.phone_number.replace("0","256"),
        //       payemail: $scope.payForm.email,
        //       email: $scope.user.email,
        //       password: $scope.user.password
        //   },{ }, function(response) {
        //       $ionicLoading.hide();
        //       alert("sucess woow");
        //       alert(response);
        //   }, function(response) {
        //     $ionicLoading.hide();
        //     alert("error yiyi");
        //     alert(JSON.stringify(response));
        //   });

      }
    };


    $scope.timedOut = false;
    $scope.updateTimer = function(time){
      if(time == 'cancel'){
        $scope.timedOut = true;
        window.theTimerForBooking == null;
        More.resetBooking($scope,function(){
          $ionicViewService.nextViewOptions({
             disableBack: true
          });
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
          $state.go("tab.more");
        });
      }else{
        $('#pmbookingtimer').html(time);
      }
    };
    $scope.$on('$ionicView.enter', function(){
        //alert("updating the caller");
        window.timerCallback = $scope.updateTimer;
    });

    $scope.crazyForm = function(){
      window.theTimerForBooking == null;
      $ionicViewService.nextViewOptions({
         disableBack: true
      });
      $ionicHistory.clearHistory();
      More.setPaymentDetails({
        password : $scope.user.password,
        email : $scope.user.email,
        movieDateId : $scope.movieDateId,
        payphone: $scope.payForm.phone_number.replace('0','256'),
        payemail: $scope.payForm.email
      });
      //go to the next page
      $state.go('tab.morecinemapaymentfinished');
    }

    $scope.showBtn = false;
    $scope.validatePhone = function(){
      $scope.errors = [];
      if($scope.payForm.phone_number.length == 0 ){
        $scope.errors.push("Invalid phone number format");
        return false;
        $scope.showBtn = false;
      }

      if ($scope.payForm.phone_number == '' ||
          $scope.payForm.phone_number == undefined ||
          ($scope.payForm.phone_number = $scope.payForm.phone_number.trim()).length != 10 ||
         /^\d+$/.test($scope.payForm.phone_number) == false ||
        $scope.payForm.phone_number[0] != "0" ||
        $scope.payForm.phone_number[1] != "7")
      {
          $scope.errors.push("Invalid phone number format");
          $scope.showBtn = false;
          return false;
      }

      $scope.showBtn = true;
      return true;
    }

    $scope.validateInputs = function(){
      if($scope.payForm.phone_number.length == 0 || $scope.payForm.email.length == 0){
        $scope.errors.push("Invalid phone number format");
        return false;
      }

      //email
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if ($scope.payForm.email == '' ||
          $scope.payForm.email == undefined ||
          ($scope.payForm.email = $scope.payForm.email.trim()).length == 0 ||
          re.test($scope.payForm.email) == false)
      {
          $scope.errors.push("Invalid email format");
          return false;
      }

      //phone number
      if ($scope.payForm.phone_number == '' ||
          $scope.payForm.phone_number == undefined ||
          ($scope.payForm.phone_number = $scope.payForm.phone_number.trim()).length != 10 ||
         /^\d+$/.test($scope.payForm.phone_number) == false ||
        $scope.payForm.phone_number[0] != "0" ||
        $scope.payForm.phone_number[1] != "7")
      {
          $scope.errors.push("Invalid phone number format");
          return false;
      }

      return true;
    }

}
