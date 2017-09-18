function UserProfileCommentCtrl($scope, $state, $stateParams, $ionicHistory, $ionicLoading, $http, $q, Utility, Account) {

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

    $scope.nf = null;
    for (var i = 0; i < $scope.thisUser.reviews.length; i++) {
        if ($scope.thisUser.reviews[i].id === parseInt($stateParams.id)) {
            $scope.nf = $scope.thisUser.reviews[i];
        }
    }
    
    

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



    $scope.sendUsersCommentLike = function (commentModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(commentModel);
        var link = APP_DOMAIN + "addUsersCommentLike.php?callback=JSON_CALLBACK&" + $scope.user.credential + "&postdata=" + dataStr;
        console.log("sendUsersCommentLike @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    $scope.sendUsersCommentUnLike = function (commentModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(commentModel);
        var link = APP_DOMAIN + "addUsersCommentUnLike.php?callback=JSON_CALLBACK&" + $scope.user.credential + "&postdata=" + dataStr;
        console.log("sendUsersCommentLike @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    $scope.sendUsersComment = function (commentModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(commentModel);
        var link = APP_DOMAIN + "addUsersComment.php?callback=JSON_CALLBACK&" + $scope.user.credential + "&postdata=" + dataStr;
        console.log("sendUsersComment @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };
   
    $scope.addReviewComment = function () {
        $scope.comment = {
            review_id: 0,
            kind: "",
            details: $scope.commentToSend,
            commenTo: 0
        };
        //validate the details
        $scope.comment.details = $scope.comment.details.trim();
        if ($scope.comment.details.length < 4) {
            $ionicLoading.show({ template: "<p style='color:#FFF1F1'>The comment must be at least four(4) characters long<p>", noBackdrop: false, duration: 3000 });
            return;
        }

        $scope.comment.review_id = $scope.nf.id;

        $ionicLoading.show({ template: "<div class='yammzitSpinner'><ion-spinner icon='android'></ion-spinner><div>", noBackdrop: false });
        $scope.sendUsersComment($scope.comment).then(function (data) {
            $ionicLoading.hide();
            //success
            console.log("send users comment success : ", data);
            if (data.errors.length > 0) {
                console.log("send users comment error : ", data.errors);
                $ionicLoading.show({ template: "<p style='color:#FFF1F1'>This comment was not sent<p>", noBackdrop: false, duration: 4000 });
            } else {
                //add comment sent back to the current news feed
                var comment = data.data;
                $scope.nf.comments =  [comment].concat($scope.nf.comments);
                $scope.comment.details = "";
                $scope.commentToSend = "";
            }
        }, function (code) {
            //error
            console.log("send users comment fail : ", code);
        });
    };   

    $scope.iLikeComment = function (cid) {
        if ($scope.user == null) {
            return false;
        }
        for (var j = 0; j < $scope.nf.comments.length; j++) {
            if ($scope.nf.comments[j].id === parseInt(cid)) {
                for (var k = 0; k < $scope.nf.comments[j].likes.length; k++) {
                    if ($scope.nf.comments[j].likes[k].user_id === parseInt($scope.user.id)) {
                        return true;
                    }
                }
            }            
        }
        return false;
    };

    $scope.likeComment = function (cid) {
        //console.log("comment parameters ", nfid, cid, found_user);
        var commentModel = {
            comment_id: cid
        };
        $scope.sendUsersCommentLike(commentModel).then(function (data) {
            //success
            console.log("send users comment like success : ", data);
            if (data.errors.length > 0) {
                console.log("send users comment like error : ", data.errors);
            } else {
                //add like to news feed comment
                var like  = data.data;
                for (var j = 0; j < $scope.nf.comments.length; j++) {
                    if ($scope.nf.comments[j].id === parseInt(cid)) {
                        $scope.nf.comments[j].likes = [like].concat($scope.nf.comments[j].likes);
                        console.log("situation", $scope.nf.comments[j].likes);
                        break;
                    }
                }  
            }
        }, function (code) {
            //error
            console.log("send users comment like fail : ", code);
            callback(false);
        });
    };
    
    $scope.unlikeComment = function (cid) {
        //console.log("comment parameters ", nfid, cid, found_user);
        var commentModel = {
            comment_id: cid
        };
        $scope.sendUsersCommentUnLike(commentModel).then(function (data) {
            //success
            console.log("send users comment un like success : ", data);
            if (data.errors.length > 0) {
                console.log("send users comment un like error : ", data.errors);
            } else {
                //remove like to news feed comment
                var like = data.data;
                for (var j = 0; j < $scope.nf.comments.length; j++) {
                    if ($scope.nf.comments[j].id === parseInt(cid)) {
                        for (var k = 0; k < $scope.nf.comments[j].likes.length; k++) {
                            if ($scope.nf.comments[j].likes[k].user_id === parseInt($scope.user.id)) {
                                console.log("before situation @" + j, $scope.nf.comments[j].likes);
                                $scope.nf.comments[j].likes.splice(k, 1);
                                console.log("situation", $scope.nf.comments[j].likes);
                                break;
                            }
                        }
                    }
                }
            }
        }, function (code) {
            //error
            console.log("send users comment un like fail : ", code);
            callback(false);
        });
    };

    $scope.commentLink = "/userprofile/comment/";

    $scope.commentToSend = "";

    $scope.doRefresh = function () {
        //get the user in question
        $scope.thisUser = Account.getLoadedThisUser();
        console.log($scope.thisUser);
        
        $scope.nf = null;
        for (var i = 0; i < $scope.thisUser.reviews.length; i++) {
            if ($scope.thisUser.reviews[i].id === parseInt($stateParams.id)) {
                $scope.nf = $scope.thisUser.reviews[i];
            }
        }

        $scope.$broadcast('scroll.refreshComplete');
    };
    

    $scope.zonofTime = window.zonofTime;
    $scope.correctTime = function (tym) {
        var x = Utility.getCorrectTime(tym, window.zonofTime);
        return x;
    };
}