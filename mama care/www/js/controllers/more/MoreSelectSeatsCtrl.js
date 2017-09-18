function MoreSelectSeatsCtrl($scope, $ionicViewService, $ionicHistory, $state, Account, Utility, More) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;

    $scope.loaded = false;

    $scope.hall = null;
    More.getHallOfSelectedMovieDate($scope);

    $scope.doRefresh = function () {
        $scope.loaded = false;
        More.getHallOfSelectedMovieDate($scope);
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.placeHold = function () {
    };

    $scope.range = function(num){
      return new Array(num);
    }

    $scope.isThisRegularSeatTaken = function(rowLabel,colNumber){
      if(  $scope.loaded == true){
        for (var i = 0; i < $scope.hall.regularSeatsTaken.length; i++) {
           var takenSeat = $scope.hall.regularSeatsTaken[i];
           if( takenSeat.seat_row == rowLabel && (parseInt(colNumber) == parseInt(takenSeat.seat_col)) ){
             return true;
           }
        }
        return false;
      }
    }

    $scope.isThisVipSeatTaken = function(rowLabel,colNumber){
      if(  $scope.loaded == true){
        for (var i = 0; i < $scope.hall.vipSeatsTaken.length; i++) {
           var takenSeat = $scope.hall.vipSeatsTaken[i];
           if( takenSeat.seat_row == rowLabel && (parseInt(colNumber) == parseInt(takenSeat.seat_col)) ){
             return true;
           }
        }
        return false;
      }
    }

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
        $('#seatsbookingtimer').html(time);
      }
    };
    $scope.$on('$ionicView.loaded', function(){
        //start the timer
        if(window.theTimerForBooking == null){
          //alert('initing');
          window.timeleft = window.startAt;

          window.bookingTimer();
        }
    });
    $scope.$on('$ionicView.enter', function(){
        window.timerCallback = $scope.updateTimer;
    });


    //when it checks at the server side, the server returns
    //with an indication that you have booked this seat or not
    $scope.selectSeat = function(rowLabel,colNumber,seatType){
       //dont do any thing if activity is still going on
       if($scope.loaded == false){
         return false;
       }

        var wasSeatAlreadyTakenOnLoad = $scope.isThisRegularSeatTaken(rowLabel,colNumber) || $scope.isThisVipSeatTaken(rowLabel,colNumber);
        //alert(wasSeatAlreadyTakenOnLoad);
        if(wasSeatAlreadyTakenOnLoad == true){
          alert("Haha seat was already taken on load");
          return true;
        }else{
          //check if its part of the selected seats
          //then deselect it
          var deselectIndex = -1;
          var wasSeatAlreadySelected = $scope.isRegularSeatSelected(rowLabel,colNumber);
          if(wasSeatAlreadySelected == true){
            //deselect id
            for (var i = 0; i < $scope.seatsSelected.regularSeatsSelected.length; i++) {
               var selectedSeat = $scope.seatsSelected.regularSeatsSelected[i];
               if( selectedSeat.seat_row == rowLabel && (parseInt(colNumber) == parseInt(selectedSeat.seat_col)) ){
                 //$scope.seatsSelected.regularSeatsSelected.splice(i,1);
                 deselectIndex = i;
                 break;
               }
            }
          }
          if(deselectIndex > -1){
             //tell the server to deselect this seat booking
             $scope.loaded = false;
             More.removeSeatBooking($scope.seatsSelected.regularSeatsSelected[deselectIndex].id,$scope.user,function(status){
               $scope.loaded = true;
               if(status == true){
                 $scope.seatsSelected.regularSeatsSelected.splice(deselectIndex,1);
                 More.storeSelectedSeats($scope.seatsSelected);
               }else{
                 alert("Failed to unselect regular seat");
               }
             });
          }else{
             //check if it was taken
             wasSeatAlreadyTakenOnLoad = $scope.isThisVipSeatTaken(rowLabel,colNumber) || $scope.isThisVipSeatTaken(rowLabel,colNumber);
             //alert(wasSeatAlreadyTakenOnLoad);
             if(wasSeatAlreadyTakenOnLoad == true){
               alert("Haha vip seat was already taken on load");
               return true;
             }

             //check if it was previously a vip selected seat
             deselectIndex = -1;
             var wasSeatAlreadySelected = $scope.isVipSeatSelected(rowLabel,colNumber);
             if(wasSeatAlreadySelected == true){
               //deselect id
               for (var i = 0; i < $scope.seatsSelected.vipSeatsSelected.length; i++) {
                  var selectedSeat = $scope.seatsSelected.vipSeatsSelected[i];
                  if( selectedSeat.seat_row == rowLabel && (parseInt(colNumber) == parseInt(selectedSeat.seat_col)) ){
                    //$scope.seatsSelected.regularSeatsSelected.splice(i,1);
                    deselectIndex = i;
                    break;
                  }
               }
             }
             if(deselectIndex > -1){
                //tell the server to deselect this seat booking
                $scope.loaded = false;
                More.removeSeatBooking($scope.seatsSelected.vipSeatsSelected[deselectIndex].id,$scope.user,function(status){
                  $scope.loaded = true;
                  if(status == true){
                    $scope.seatsSelected.vipSeatsSelected.splice(deselectIndex,1);
                    More.storeSelectedSeats($scope.seatsSelected);
                  }else{
                    alert("Failed to unselect vip seat");
                  }
                });
             }else{
                //now we select this seat
                $scope.loaded = false;
                More.setSeatBooking(rowLabel,colNumber,seatType,$scope.user,function(booking){
                  $scope.loaded = true;
                  if(booking.seatType == "regular"){
                    $scope.seatsSelected.regularSeatsSelected.push(booking);
                    More.storeSelectedSeats($scope.seatsSelected);
                  }else if(booking.seatType == "vip"){
                    $scope.seatsSelected.vipSeatsSelected.push(booking);
                    More.storeSelectedSeats($scope.seatsSelected);
                  }else{
                    alert("Failed to book seat");
                  }
                });
             }

          }


        }

    }

    $scope.seatsSelected = {
      regularSeatsSelected: [],
      vipSeatsSelected : []
    };

    $scope.isRegularSeatSelected = function(rowLabel,colNumber){
      if(  $scope.loaded == true){
        for (var i = 0; i < $scope.seatsSelected.regularSeatsSelected.length; i++) {
           var selectedSeat = $scope.seatsSelected.regularSeatsSelected[i];
           if( selectedSeat.seat_row == rowLabel && (parseInt(colNumber) == parseInt(selectedSeat.seat_col)) ){
             return true;
           }
        }
        return false;
      }
    }

    $scope.isVipSeatSelected = function(rowLabel,colNumber){
      if(  $scope.loaded == true){
        for (var i = 0; i < $scope.seatsSelected.vipSeatsSelected.length; i++) {
           var selectedSeat = $scope.seatsSelected.vipSeatsSelected[i];
           if( selectedSeat.seat_row == rowLabel && (parseInt(colNumber) == parseInt(selectedSeat.seat_col)) ){
             return true;
           }
        }
        return false;
      }
    }
}
