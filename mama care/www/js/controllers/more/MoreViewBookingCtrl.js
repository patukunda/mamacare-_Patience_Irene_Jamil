function MoreViewBookingCtrl($scope, $ionicViewService, $ionicHistory, $state, Account, Utility, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.loaded = false;

    $scope.booking = null;
    More.getBooking($scope);

    $scope.doRefresh = function () {
        $scope.loaded = false;
        More.getBooking($scope);
        $scope.$broadcast('scroll.refreshComplete');
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
        $('#viewbookingtimer').html(time);
      }
    };
    $scope.$on('$ionicView.enter', function(){
        //alert("updating the caller");
        window.timerCallback = $scope.updateTimer;
    });

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


}
