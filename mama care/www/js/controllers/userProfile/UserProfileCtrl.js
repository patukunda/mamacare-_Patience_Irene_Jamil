function UserProfileCtrl($scope, $state, $stateParams, $ionicHistory, $ionicLoading, $http, $q, Utility, Account) {
    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };


    $scope.user = Account.getThisUser();

    $scope.lastid = 0;
    //get the user in question
    Account.loadThisUserOfId($scope, $stateParams.id);
    $scope.loadMore = function () {
        Account.loadMoreUserReviews($scope);
    };


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
            if ($scope.thisUser.reviews[i].id == parseInt(nfid)) {
                for (var j = 0; j < $scope.thisUser.reviews[i].likes.length; j++) {
                    if ($scope.thisUser.reviews[i].likes[j].user_id == parseInt($scope.user.id)) {
                        return $scope.thisUser.reviews[i].likes[j].id;
                    }
                }
            }
        }
        return 0;
    };

    $scope.sendUsersReviewLike= function (likeModel) {
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
            if ($scope.thisUser.reviews[i].id == parseInt(nfid)) {
                for (var j = 0; j < $scope.thisUser.reviews[i].likes.length; j++) {
                    if ($scope.thisUser.reviews[i].likes[j].user_id == parseInt($scope.user.id)) {
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
                    if ($scope.thisUser.reviews[i].id == parseInt(nfid)) {
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
                    if ($scope.thisUser.reviews[i].id == parseInt(nfid)) {
                        for (var j = 0; j < $scope.thisUser.reviews[i].likes.length; j++) {
                            //find the index of this like
                            if ($scope.thisUser.reviews[i].likes[j].id == parseInt(likeid)) {
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

    $scope.sendUsersFollow = function(followModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(followModel);
        var link = APP_DOMAIN + "addFollowUser.php?callback=JSON_CALLBACK&" + $scope.user.credential + "&postdata=" + dataStr;
        console.log("sendUsersReview @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };
    
    $scope.sendUsersUnFollow = function(followModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(followModel);
        var link = APP_DOMAIN + "addUnFollowUser.php?callback=JSON_CALLBACK&" + $scope.user.credential + "&postdata=" + dataStr;
        console.log("sendUsersReview @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    $scope.ifollow = false;
    $scope.checkfollow = function () {
        $scope.ifollow = false;
        for (var i = 0; i < $scope.thisUser.followers.length; i++) {
            //alert("checking" + $scope.thisUser.followers[i].id + ":" + $scope.user.id);
            if ($scope.thisUser.followers[i].id == $scope.user.id) {
                //alert("checkingfor follwing found match");
                $scope.ifollow = true;
                break;
            }
        }
    };

    $scope.follow = function(user_id){
        var followModel = {
            user_id : user_id
        };
        $scope.sendUsersFollow(followModel).then(function (data) {
            //success
            console.log("follow user success : ", data);
            if (data.errors.length > 0) {
                console.log("follow user fail error : ", data.errors);
            } else {
                //get the follower
                var follower = data.data;
                //add this follower to the users's followers
                $scope.thisUser.followers.push(follower);
                Account.setLoadedThisUser($scope.thisUser);
                $scope.checkfollow();
            }
        }, function (code) {
            //error
            console.log("follow user fail : ", code);
        });
    };

    $scope.unfollow = function (user_id) {
        var followModel = {
            user_id: user_id
        };
        $scope.sendUsersUnFollow(followModel).then(function (data) {
            //success
            console.log("unfollow user success : ", data);
            if (data.errors.length > 0) {
                console.log("unfollow user fail error : ", data.errors);
            } else {
                //find the index of this follow
                for (var i = 0; i < $scope.thisUser.followers.length; i++) {
                    if ($scope.thisUser.followers[i].id == parseInt($scope.user.id)) {
                        $scope.thisUser.followers.splice(i, 1);
                        Account.setLoadedThisUser($scope.thisUser);
                        $scope.checkfollow();
                        break;
                    }
                }
            }
        }, function (code) {
            //error
            console.log("unfollow user fail : ", code);
        });
    };

    $scope.sendUsersfriend = function (friendModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(friendModel);
        var link = APP_DOMAIN + "addFriendUser.php?callback=JSON_CALLBACK&" + $scope.user.credential + "&postdata=" + dataStr;
        console.log("sendUsersReview @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    $scope.sendUsersUnFriend = function (friendModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(friendModel);
        var link = APP_DOMAIN + "addUnFriend.php?callback=JSON_CALLBACK&" + $scope.user.credential + "&postdata=" + dataStr;
        console.log("sendUsersReview @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    $scope.amfriend = 0;
    $scope.checkFriend = function () {
        $scope.amfriend = 0;
        for (var i = 0; i < $scope.thisUser.friends.length; i++) {
            if ($scope.thisUser.friends[i].id ==  $scope.user.id) {
                //console.log("checkingfor follwing found match");
                $scope.amfriend = parseInt($scope.thisUser.friends[i].status);
                //alert("am a friend");
                break;
            }
        }
    };

    $scope.friend = function (user_id) {
        var friendModel = {
            user_id: user_id
        };
        $scope.sendUsersfriend(friendModel).then(function (data) {
            //success
            console.log("friend user success : ", data);
            if (data.errors.length > 0) {
                console.log("friend user fail error : ", data.errors);
            } else {
                //get the friend
                var friend = data.data;
                //add this friend to the users's friends
                $scope.thisUser.friends.push(friend);
                Account.setLoadedThisUser($scope.thisUser);
                $scope.checkFriend();
            }
        }, function (code) {
            //error
            console.log("friend user fail : ", code);
        });
    };

    $scope.unfriend = function (user_id) {
        var friendModel = {
            user_id: user_id
        };
        $scope.sendUsersUnFriend(friendModel).then(function (data) {
            //success
            console.log("unfriend user success : ", data);
            if (data.errors.length > 0) {
                console.log("unfriend user fail error : ", data.errors);
            } else {
                //find the index of this follow
                for (var i = 0; i < $scope.thisUser.friends.length; i++) {
                    if ($scope.thisUser.friends[i].id == parseInt($scope.user.id)) {
                        $scope.thisUser.friends.splice(i, 1);
                        $scope.checkFriend();
                        Account.setLoadedThisUser($scope.thisUser);
                        break;
                    }
                }
            }
        }, function (code) {
            //error
            console.log("unfriend user fail : ", code);
        });
    };

    $scope.commentLink = "/userprofile/comment/";

    $scope.doRefresh = function () {
        $scope.amfriend = 0;
        $scope.ifollow = false;

        $scope.user = Account.getThisUser();

        //get the user in question
        Account.loadThisUserOfId($scope, $stateParams.id);

        $scope.$broadcast('scroll.refreshComplete');
    };


    $scope.zonofTime = window.zonofTime;
    $scope.correctTime = function (tym) {
        var x = Utility.getCorrectTime(tym, window.zonofTime);
        return x;
    };

    $scope.getBusinessLink = function (id) {
        for (var i = 0; i < $scope.user.directory.length; i++) {
            if (parseInt(id) == parseInt($scope.user.directory[i])) {
                return "#/mybusinessprofile/" + id;
            }
        }
        return '#/businessprofile/' + id;
    };

}