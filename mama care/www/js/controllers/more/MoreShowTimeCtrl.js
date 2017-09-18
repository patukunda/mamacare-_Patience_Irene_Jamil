function MoreShowTimeCtrl($scope, Account, Utility, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.$on('$ionicView.enter', function(){
        //reset the timer
        window.timeleft = window.startAt;
        window.timerCallback = null;
        if(window.theTimerForBooking != null){
        }else{
          clearTimeout(window.theTimerForBooking);
        }
        window.theTimerForBooking = null;
    });

    $scope.movie = null;
    More.getSelectedMovie($scope);
    $scope.movieDate = null;
    $scope.movieDateFormated = null;
    More.getSelectedMovieDate($scope);
    $scope.formatMovieDate = function(){
        var temp = moment($scope.movieDate);
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
        $scope.movieDateFormated = xday + "  " + yday + " " + zmonth + ", " + temp.year();
    };
    $scope.formatMovieDate();
    $scope.movieShowDates = [];
    $scope.loaded = false;
    More.getMoviesShowTimeOnDate($scope);

    $scope.doRefresh = function () {
        More.getSelectedMovie($scope);
        More.getSelectedMovieDate($scope);
        $scope.formatMovieDate();
        $scope.loaded = false;
        More.getMoviesShowTimeOnDate($scope);
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.selectedMoviesShowDateId = 0;
    $scope.selectShowTime = function(movieDateThingId){
      //alert(movieDateThingId);
      $('.movieTimeThing').css({
        backgroundColor : "#E6E6E6"
      });
      $("#movieTimeThing"+movieDateThingId).css({
        backgroundColor : "#BD2532"
      });
      $scope.selectedMoviesShowDateId = movieDateThingId;
      More.setSelectedMoviesShowDateId($scope.selectedMoviesShowDateId);
    };

    $scope.placeHold = function () {
    };
}
