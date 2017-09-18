function NewsfeedUserProfileCtrl($scope, $stateParams, $ionicActionSheet, $ionicLoading, Newsfeeds, Utility, Account) {
    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.nf = Newsfeeds.find($stateParams.id);

    Account.loadThisUserOfId($scope, $stateParams.user_id);

    $scope.newsFeedKinds = {
        add: 'add',
        review: 'review'
    };
    $scope.APP_IMAGES_DOMAIN = APP_IMAGES_DOMAIN;
    $scope.share = function (id) {
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: 'Share on Facebook' },
              { text: 'Share on Twitter' },
              { text: 'Share on Yammz it' }
            ],
            titleText: 'Share this review',
            cancelText: 'Cancel',
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                return true;
            }
        });
    };

    $scope.rateBar = rateBar;
    $scope.rate = $scope.rateBar(0, true);
    $scope.getRate = function (value, isCost) {
        $scope.rate = rateBar(value, isCost);
        //console.log("getting rate", $scope.rate);
        return "";
    };

    $scope.comment = {
        review_id: 0,
        kind: "",
        details: "",
        commenTo: 0
    };

    console.log("Getting this user for news feeds and slides: ");
    $scope.user = Account.getThisUser();
    console.log("Found this user for news feeds and slides: ", $scope.user);

    $scope.addReviewComment = function () {
        //alert("working");
        //validate the details
        $scope.comment.details = $scope.comment.details.trim();
        if ($scope.comment.details.length < 4) {
            $ionicLoading.show({ template: "<p style='color:#FFF1F1'>The comment must be at least four(4) characters long<p>", noBackdrop: false, duration: 3000 });
            return;
        }

        $scope.comment.review_id = $scope.nf.id;

        $ionicLoading.show({ template: "<div class='yammzitSpinner'><ion-spinner icon='android'></ion-spinner><div>", noBackdrop: false });
        Newsfeeds.addUsersComment($scope, function (res) {
            $ionicLoading.hide();
            if (res == false) {
                $ionicLoading.show({ template: "<p style='color:#FFF1F1'>This comment was not sent<p>", noBackdrop: false, duration: 4000 });
            } else {
                $scope.comment.details = "";
            }
        });

    };


    $scope.iLike = function (nfid) {
        if ($scope.user == null) {
            return false;
        }
        return Newsfeeds.iLikeReview(nfid, $scope.user.id);
    };

    $scope.like = function (nfid) {
        Newsfeeds.likeReview(nfid, $scope.user.id, function (res) {

        });
    };

    $scope.iLikeComment = function (nfid, cid) {
        if ($scope.user == null) {
            return false;
        }
        var res = Newsfeeds.iLikeComment(nfid, cid, $scope.user.id);
        console.log("checking ", nfid, cid, res);
        return res;
    };

    $scope.likeComment = function (nfid, cid) {
        Newsfeeds.likeComment(nfid, cid, $scope.user, function (res) {

        });
    };


    $scope.doRefresh = function () {
        $scope.nf = Newsfeeds.find($stateParams.id);

        Account.loadThisUserOfId($scope, $stateParams.user_id);

        $scope.$broadcast('scroll.refreshComplete');
    };
}