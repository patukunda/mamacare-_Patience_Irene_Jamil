function Account($http, $q) {
    var user = null;

    //a function to extract the user from the database
    var extractUser = function () {

        var userStr = window.localStorage.getItem("user");
        //console.log("extractUser strig : ", userStr);
        if (userStr == null || userStr == undefined || userStr.length == 0) {
            return null;
        }
        user = JSON.parse(userStr);
        user.credential = "username="+ user.username + "&password=" + user.password
        return user;
    };

    //save the user to the database
    var saveUser = function (userToSave) {
        var userStr = JSON.stringify(userToSave);
        //console.log("saveUser strig : " ,userStr);
        window.localStorage.setItem("user", userStr);
    };

    var women = null;
    var saveWoman = function (womanToSave) {      
        women = extractWomen();
        women.push(womanToSave);
        var str = JSON.stringify(women);
        window.localStorage.setItem("woman", str);
    };
    var extractWomen = function () {
        var womenStr = window.localStorage.getItem("woman");
        if (womenStr == null || womenStr == undefined || womenStr.length == 0) {
            return [];
        }
        women = JSON.parse(womenStr);
        return women;
    };
    
    var sendUserSignup = function (signupModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(signupModel);
        var link = APP_DOMAIN + "signup.php?callback=JSON_CALLBACK&postdata=" + dataStr;
        console.log("sendUserSignup @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    var sendUserResetCode = function (forgotModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(forgotModel);
        var link = APP_DOMAIN + "reset.php?callback=JSON_CALLBACK&postdata=" + dataStr;
        console.log("sendUserResetCode @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

   
    var sendUserLogin = function (loginModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(loginModel);
        var link = APP_DOMAIN + "login.php?callback=JSON_CALLBACK&postdata=" + dataStr;
        console.log("sendUserLogin @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    //chunked request here
    var chunkSize = 1000;
    var sendUsersProfileUpdate = function (found_user, updateModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(updateModel);
        var currentStart = 0;
        var stopAt = chunkSize;
        var chunk = dataStr.slice(currentStart, stopAt);
        var rounds = 0;
        var payloads = 0;
        var sentLoads = 0;
        var hadErrors = false;
        function pump() {
            if (hadErrors) {
                console.log("Closingg pump with  errors after round " + rounds);
                defer.reject(1000);
                return defer.promise;
            }
            if (chunk.length <= 0) {
                var link = APP_DOMAIN + "saveMyUpdate.php?callback=JSON_CALLBACK&" + found_user.credential;
                console.log("sendUsersProfileUpdate @link : ", link);
                $http.jsonp(link).success(function (data) {
                    defer.resolve(data);
                }).error(function (status, code) {
                    defer.reject(code);
                });
                return defer.promise;
            }
            rounds = rounds + 1;
            sentLoads = sentLoads + rounds;
            console.log("Sending round " + rounds);
            sendUserChunck(found_user, chunk, rounds).then(function (data) {
                //success
                console.log("send user chunck success : ", data);
                if (data.errors.length > 0) {
                    console.log("Chunk failure ", data);
                    hadErrors = true;
                    console.log("Closing pump with  errors after round " + rounds);
                    defer.reject(700);
                    return defer.promise;
                } else {
                    console.log("Sent load for " + data.rounds + " returned as ", data.data);
                    payloads = payloads + parseInt(data.data);
                    currentStart = stopAt;
                    stopAt = stopAt + chunkSize;
                    chunk = dataStr.slice(currentStart, stopAt);
                }
                pump();
            }, function (code) {
                //error
                console.log("chunk failure from server : ", code);
                hadErrors = true;
                console.log("Closing pump with  errors after round " + rounds);
                defer.reject(code);
                return defer.promise;
            });
            return defer.promise;
        }
        return pump();
    };
    var sendUserChunck = function (found_user, chunck, rounds) {
        var defer = $q.defer();
        var thisRound = rounds;
        var link = APP_DOMAIN + "user_chuncks.php?callback=JSON_CALLBACK&" + found_user.credential + "&num=" + thisRound + "&postdata=" + chunck;
        console.log("sendUserChunck @link : ", link);
        $http.jsonp(link).success(function (data) {
            data.rounds = thisRound;
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject({ code: code, rounds: thisRound });
        });
        return defer.promise;
    };
    var clearUserChunks = function (found_user) {
        var defer = $q.defer();
        var link = APP_DOMAIN + "clear_user_chuncks.php?callback=JSON_CALLBACK&" + found_user.credential;
        console.log("clearUserChunks @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    
    var thisUser = null;
    var fetchThisUserOfID = function (user_id) {
        var defer = $q.defer();
        var link = APP_DOMAIN + "get_user_of_id.php?callback=JSON_CALLBACK&user_id=" + user_id;
        console.log("fetchThisUserOfID @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    }; 

   
    var sendUsersMessage = function (found_user, MessageModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(MessageModel);
        var link = APP_DOMAIN + "addUsersMessage.php?callback=JSON_CALLBACK&" + found_user.credential + "&postdata=" + dataStr;
        console.log("sendUsersMessage @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    var fetchUsersMessages = function (found_user) {
        var defer = $q.defer();
        var link = APP_DOMAIN + "getUsersMessages.php?callback=JSON_CALLBACK&" + found_user.credential ;
        console.log("fetchUsersMessages @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    var sendUserGoogleLogin = function (loginModel) {
        var defer = $q.defer();
        var dataStr = JSON.stringify(loginModel);
        var link = APP_DOMAIN + "googleLogin.php?callback=JSON_CALLBACK&postdata=" + dataStr;
        console.log("sendUserGoogleLogin @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    var FetchUsersUnreadMessage = function (found_user) {
        var defer = $q.defer();
        var link = APP_DOMAIN + "usersUnreadMessages.php?callback=JSON_CALLBACK&" + found_user.credential;
        console.log("usersUnreadMessages @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    var FetchUsersPhotoesCount = function (found_user) {
        var defer = $q.defer();
        var link = APP_DOMAIN + "usersPhotoesCount.php?callback=JSON_CALLBACK&id=" + found_user.id;
        console.log("usersPhotoesCount @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    var FetchUsersPhotoes = function (found_user) {
        var defer = $q.defer();
        var link = APP_DOMAIN + "usersPhotoes.php?callback=JSON_CALLBACK&id=" + found_user.id;
        console.log("usersPhotoes @link : ", link);
        $http.jsonp(link).success(function (data) {
            defer.resolve(data);
        }).error(function (status, code) {
            defer.reject(code);
        });
        return defer.promise;
    };

    var facilities = [
        { id: 1, name: "Mulago Hospital", Address: "Mulago" },
        { id: 2, name: "Mengo Hospital", Address: "Mengo" },
    ];

    return {
        getFacilities: function () {
            return facilities;
        },
        getUser: function (scope,callback) {
            user = extractUser();
            scope.user = user;
            callback(scope.user);
        },
        signUp: function (signupModel, callback) {
            delete signupModel.accepts_terms;
            delete signupModel.errors;
            saveUser(signupModel);
            //fetch the user
            user = extractUser();
            callback(user);
        },
        logIn: function (loginModel, finallCallback) {
            //fetch the user
            user = extractUser();
            if (typeof user == 'undefined' || user == null) {
                finallCallback(null);
            } else if (loginModel.username != user.username || loginModel.password != user.password) {
                finallCallback(null);
            } else {
                finallCallback(user);
            }
        },
        addWoman: function (womanModel, callback) {
            //add a woman
            saveWoman(womanModel);
            callback(true);
        },
        getThisUser: function () {
            var thisOne = extractUser();
            return thisOne;
        },

        upDateProfile: function (found_user, updateModel, finallCallback) {

            clearUserChunks(found_user).then(function (data) {
                //success
                console.log("clear User Chunks success : ", data);
                if (data.errors.length > 0) {
                    finallCallback(false);
                } else {
                    window.thisTigidi = updateModel;
                    sendUsersProfileUpdate(found_user, updateModel).then(function (data) {
                        //success
                        console.log("update profile success : ", data);
                        if (data.errors.length > 0) {
                            finallCallback(false);
                        } else {
                            saveUser(data.data);
                            finallCallback(true);
                        }
                    }, function (code) {
                        //error
                        console.log("update profile fail : ", code);
                        finallCallback(false);
                    });
                }
            }, function (code) {
                //error
                console.log("clear User Chunks  fail : ", code);
                finallCallback(false);
            });
        },
        signOut: function () {
            user = extractUser();
            CLEAN_DB();

            ionic.Platform.exitApp();
            // stops the app           
        },
        faceBookLogin: function () {
            hello('facebook').login(function () {
                hello('facebook').api('/me').success(function (json) {
                    IS_FACEBOOKER = true;
                    console.log("executing this", IS_FACEBOOKER);
                    console.log(json);
                });
            });
        },
        loadThisUserOfId: function (scope, user_id) {
            thisUser = null;
            fetchThisUserOfID(user_id).then(function (data) {
                //success
                console.log("load this user success : ", data);
                if (data.errors.length > 0) {

                } else {
                    thisUser = data.data;
                }
                scope.thisUser = thisUser;
                if (undefined != scope.thisUser.reviews) {
                    if (scope.thisUser.reviews.length > 0) {
                        scope.lastid = scope.thisUser.reviews[scope.thisUser.reviews.length - 1].review_id;
                    }
                }
                scope.checkfollow();
                scope.checkFriend();
            }, function (code) {
                //error
                console.log("load this user fail : ", code);
                scope.thisUser = thisUser;
            });
        },
        loadThisUserOfIdV2: function (scope, user_id) {
            thisUser = null;
            fetchThisUserOfID(user_id).then(function (data) {
                //success
                console.log("load this user success : ", data);
                if (data.errors.length > 0) {
                } else {
                    thisUser = data.data;
                }
                scope.thisUser = thisUser;
                scope.thisUser.messages = [];
                scope.loadUserMessages();
            }, function (code) {
                //error
                console.log("load this user fail : ", code);
                scope.thisUser = thisUser;
            });
        },
        loadMoreUserReviews: function (scope) {
            if (scope.thisUser != undefined && scope.thisUser != null) {
                fetchMoreFeedsOfUser(scope.thisUser.id, scope.lastid).then(function (data) {
                    //success
                    console.log("load this user more feeds success : ", data);
                    if (data.errors.length > 0) {
                    } else {
                        var newfeeds = data.data;
                        scope.thisUser.reviews = scope.thisUser.reviews.concat(newfeeds);
                    }
                }, function (code) {
                    //error
                    console.log("load this user more feeds fail : ", code);
                });
            }
        },
        setLoadedThisUser: function (loadedThisUser) {
            thisUser = loadedThisUser;
        },
        getLoadedThisUser: function () {
            return thisUser;
        },
        getUsersMessages: function (scope) {
            fetchUsersMessages(scope.user).then(function (data) {
                //success
                console.log("fetch users messages success : ", data);
                if (data.errors.length > 0) {
                    console.log("fetch users messages error : ", data);
                } else {
                    scope.user.mymessages = data.data;
                    saveUser(scope.user);
                    scope.user = extractUser();
                }
            }, function (code) {
                //error
                console.log("update users messages  fail : ", code);
            });
        },
        sendMessage: function (scope) {
            console.log("mts :" + scope.messageToSend);
            if (scope.messageToSend.length > 0) {
                var MessageModel = {
                    user_id: scope.thisUser.id,
                    details: scope.messageToSend
                };
                scope.sendUsersMessage(MessageModel).then(function (data) {
                    //success
                    console.log("send users message success : ", data);
                    if (data.errors.length > 0) {
                        console.log("send users message error : ", data.errors);
                    } else {
                        var msg = data.data;
                        //get the message
                        scope.business.mymessages.push(msg);
                        scope.messageToSend = "";
                        $("#toFocus").focus();
                        $("#messageInput").focus();
                    }
                }, function (code) {
                    //error
                    console.log("send users message fail : ", code);
                });
            }
        },
        getUsersUnreadMessages: function (user, finallCallback) {
            FetchUsersUnreadMessage(user).then(function (data) {
                //success
                console.log("fetch users unread messages success : ", data);
                if (data.errors.length > 0) {
                    console.log("fetch users unread messages : ", data.errors);
                    finallCallback(NaN);
                } else {
                    var count = data.data;
                    finallCallback(count);
                }
            }, function (code) {
                //error
                console.log("fetch users unread messages fail : ", code);
                finallCallback(NaN);
            });
        },
        GetUsersPhotoesCount: function (user, finallCallback) {
            FetchUsersPhotoesCount(user).then(function (data) {
                //success
                console.log("fetch users photoes number success : ", data);
                if (data.errors.length > 0) {
                    console.log("fetch users photoes number  has error : ", data.errors);
                    finallCallback(NaN);
                } else {
                    var count = data.data;
                    finallCallback(count);
                }
            }, function (code) {
                //error
                console.log("fetch users photoes number  fail : ", code);
                finallCallback(NaN);
            });
        },
        getUsersPhotoes: function (user, finallCallback) {
            FetchUsersPhotoes(user).then(function (data) {
                //success
                console.log("fetch users photoes success : ", data);
                if (data.errors.length > 0) {
                    console.log("fetch users photoes  has error : ", data.errors);
                    finallCallback([]);
                } else {
                    var photoes = data.data;
                    finallCallback(photoes);
                }
            }, function (code) {
                //error
                console.log("fetch users photoes fail : ", code);
                finallCallback([]);
            });
        }
    }
}