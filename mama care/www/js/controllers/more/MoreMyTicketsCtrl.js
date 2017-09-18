function MoreMyTicketsCtrl($scope, $stateParams, Account, Utility, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.loaded = false;
    $scope.paidMovies = [];
    More.getUsersFinishedTickets($scope);

    $scope.doRefresh = function () {
        $scope.paidMovies = [];
        More.getUsersFinishedTickets($scope);
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

    //nyd
    //when ever you are on this page refresh it
    //even when you are from the previous page of deleteUsersReceiptBooking
    //as in run this function
    //More.getUsersFinishedTickets($scope);
}
