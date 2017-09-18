function MoreSelectDateCtrl($scope, $stateParams, Account, Utility, More) {

  $scope.getImage = function (type, url) {
      return Utility.getImage(type, url);
  };

  $scope.user = Account.getThisUser();

  $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

  $scope.movieDates = [];
  $scope.movieId = $stateParams.id;
  More.getMovieDates($scope);
  More.setSelectedMovieId($scope.movieId);

  $scope.doRefresh = function () {
      $scope.movieId = $stateParams.id;
      More.getMovieDates($scope);
      $scope.$broadcast('scroll.refreshComplete');
  };

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


  $scope.placeHold = function () {
  };

  $scope.finishedLoading = false;

  $scope.usersSelectedDate = null;
  $scope.renderCalendar = function(){
    $scope.usersSelectedDate = null;
    console.log($scope.movieDates);
    //extracting unique dates for this movie
    var uniqueDates = [];
    for (var i = 0; i < $scope.movieDates.length; i++) {
      var thisDateAndTime = $scope.movieDates[i].date_time;
      var thisTime = "";
      if(typeof thisDateAndTime != 'undefined' && thisDateAndTime.length > 0 ){
        thisTime = (thisDateAndTime.split(" "))[0];
      }
      if(thisTime != "" && uniqueDates.indexOf(thisTime) == -1){
        uniqueDates.push(thisTime);
      }
    }

  // here's some magic to make sure the dates are happening this month.
  var thisMonth = moment().format('YYYY-MM');
  var thisYear = moment().format('YYYY');
  var thisDay = moment().format('YYYY-MM-DD');
  //alert(thisMonth);
  var eventArray = [];
  //fill the events array
  for (var i = 0; i < uniqueDates.length; i++) {
      eventArray.push({
        startDate : uniqueDates[i],
        endDate : uniqueDates[i],
        title: ""
      });
  }

  calendars.clndr1 = $('.cal1').clndr({
    events: [], //eventArray,
    constraints: {
      //startDate: (uniqueDates.length > 0)? uniqueDates[0] : thisDay,
      //endDate: (uniqueDates.length > 0)? uniqueDates[uniqueDates.length - 1] : thisDay
      startDate: thisDay
    },
    clickEvents: {
      click: function(target) {
        console.log(target);
        if($(target.element).hasClass('inactive')) {
          console.log('not a valid datepicker date.');
        } else {
          //remove the selected dates
          $('.clndrTheSelectedDate').removeClass('clndrTheSelectedDate');
          window.haa = target.element;
          $(target.element).css({
              backgroundColor : '#BC2434 !important'
          });
          $(target.element).addClass('clndrTheSelectedDate');
          console.log('VALID datepicker date.');
          //alert(target.date._i);
          $scope.usersSelectedDate = target.date._i;
          More.setSelectedMovieDate(target.date._i);
        }
      },
      nextMonth: function() {
        console.log('next month.');
      },
      previousMonth: function() {
        console.log('previous month.');
      },
      onMonthChange: function() {
        console.log('month changed.');
      },
      nextYear: function() {
        console.log('next year.');
      },
      previousYear: function() {
        console.log('previous year.');
      },
      onYearChange: function() {
        console.log('year changed.');
      }
    },
    multiDayEvents: {
      startDate: 'startDate',
      endDate: 'endDate'
    },
    showAdjacentMonths: true,
    adjacentDaysChangeMonth: false
  });

    $scope.finishedLoading = true;
};//end render calender


}
