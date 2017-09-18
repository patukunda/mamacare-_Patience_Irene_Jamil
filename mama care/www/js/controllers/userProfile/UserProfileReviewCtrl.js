function UserProfileReviewCtrl($scope, $state, $stateParams, $ionicHistory, $http, $q, Utility, Account) {

    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.user = Account.getThisUser();

    //get the user in question
    $scope.thisUser = Account.getLoadedThisUser();
    console.log($scope.thisUser);
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;
    
    $scope.newsFeedKinds = {
        add: 'add',
        review: 'review'
    };

    $scope.rateBar = rateBar;
    $scope.rate = $scope.rateBar(0, true);
    $scope.getRate = function (value, isCost) {
        //console.log("show me what u got ", value, isCost);
        $scope.rate = rateBar(value, isCost);
        //console.log("getting rate", $scope.rate);
        return "";
    };

    $scope.getLikeId = function (nfid) {
        for (var i = 0; i < $scope.thisUser.reviews.length; i++) {
            if ($scope.thisUser.reviews[i].id === parseInt(nfid)) {
                for (var j = 0; j < $scope.thisUser.reviews[i].likes.length; j++) {
                    if ($scope.thisUser.reviews[i].likes[j].user_id === parseInt($scope.user.id)) {
                        return $scope.thisUser.reviews[i].likes[j].id;
                    }
                }
            }
        }
        return 0;
    };

    $scope.sendUsersReviewLike = function (likeModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(likeModel);
        var link = APP_DOMAIN + "addUsersReviewLike.php?callback=JSON_CALLBACK&" + $scope.user.credential + "&postdata=" + dataStr;
        console.log("sendUsersReviewLike @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    $scope.sendUsersReviewUnLike = function (likeModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(likeModel);
        var link = APP_DOMAIN + "addUsersReviewUnLike.php?callback=JSON_CALLBACK&" + $scope.user.credential + "&postdata=" + dataStr;
        console.log("sendUsersReviewLike @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    $scope.iLike = function (nfid) {
        for (var i = 0; i < $scope.thisUser.reviews.length; i++) {
            if ($scope.thisUser.reviews[i].id === parseInt(nfid)) {
                for (var j = 0; j < $scope.thisUser.reviews[i].likes.length; j++) {
                    if ($scope.thisUser.reviews[i].likes[j].user_id === parseInt($scope.user.id)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    $scope.like = function (nfid) {
        var likeModel = {
            newsfeed_id: nfid
        };
        $scope.sendUsersReviewLike(likeModel).then(function (data) {
            //success
            console.log("send users like success : ", data);
            if (data.errors.length > 0) {
                console.log("send users like errors : ", data.errors);
            } else {
                //add like to news feed
                var like = data.data;
                for (var i = 0; i < $scope.thisUser.reviews.length; i++) {
                    if ($scope.thisUser.reviews[i].id === parseInt(nfid)) {
                        $scope.thisUser.reviews[i].likes = [like].concat($scope.thisUser.reviews[i].likes);
                        Account.setLoadedThisUser($scope.thisUser);
                        break;
                    }
                }
            }
        }, function (code) {
            //error
            console.log("send users like fail : ", code);
        });
    };

    $scope.unlike = function (nfid) {
        var likeid = $scope.getLikeId(nfid);
        var likeModel = {
            likeid: likeid
        };
        $scope.sendUsersReviewUnLike(likeModel).then(function (data) {
            //success
            console.log("send users like success : ", data);
            if (data.errors.length > 0) {
                console.log("send users unlike fail : ", code);
            } else {
                //remove like from news feed
                var like = data.data;
                for (var i = 0; i < $scope.thisUser.reviews.length; i++) {
                    if ($scope.thisUser.reviews[i].id === parseInt(nfid)) {
                        for (var j = 0; j < $scope.thisUser.reviews[i].likes.length; j++) {
                            //find the index of this like
                            if ($scope.thisUser.reviews[i].likes[j].id === parseInt(likeid)) {
                                $scope.thisUser.reviews[i].likes.splice(j, 1);
                                Account.setLoadedThisUser($scope.thisUser);
                                break;
                            }
                        }
                    }
                }
            }
        }, function (code) {
            //error
            console.log("send users like fail : ", code);
        });

    };

    $scope.doRefresh = function () {

        
        //get the user in question
        $scope.thisUser = Account.getLoadedThisUser();

        $scope.$broadcast('scroll.refreshComplete');
    };


    $scope.zonofTime = window.zonofTime;
    $scope.correctTime = function (tym) {
        var x = Utility.getCorrectTime(tym, window.zonofTime);
        return x;
    };
}