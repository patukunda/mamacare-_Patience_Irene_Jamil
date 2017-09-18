function Account($http, $q) {
    var storageNames = {
        woman: "woman",
        followup: "followup",
        user: "user",
        healthCenter: "healtCenter"
    };
    var user = null;
    var women = null;
    var followups = null;
    var dataExtractor = function (storageName,def) {
        var dataStr = window.localStorage.getItem(storageName);
        if (typeof dataStr == 'undefined' || dataStr == null || dataStr == undefined || dataStr.length == 0) {
            return def;
        }
        var data = JSON.parse(dataStr);
        return data;
    };
    var dataSaver = function (storageName, data) {
        var list = dataExtractor(storageName, []);
        list.push(data);
        var str = JSON.stringify(list);
        window.localStorage.setItem(storageName, str);
    };
    var dataUpdater = function (storageName, data, id) {
        var list = dataExtractor(storageName, []);
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                list[i] = data;
                break;
            }
        }
        var str = JSON.stringify(list);
        window.localStorage.setItem(storageName, str);
    };

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

    var getGoodDateString = function (str) {
        if (typeof str == 'undefined' || str == null || str == undefined || (str = str.trim()).length == 0) {
            return null;
        }
        return new Date(str.split("T")[0]);
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
        getThisUser: function (scope) {
            user = extractUser();
            return user;
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
            dataSaver(storageNames.woman,womanModel);
            callback(true);
        },
        getWomen: function () {
            women = dataExtractor(storageNames.woman, []);;
            return women;
        },
        getWomanOfId: function (id) {
            var woman = null;
            var womenList = dataExtractor(storageNames.woman, []);
            for (var i = 0; i < womenList.length; i++) {
                if (womenList[i].id == id) {
                    woman = womenList[i];
                    break;
                }
            }
            if (woman != null) {
                //date issues
                woman.estimatedDateOfDelivery = getGoodDateString(woman.estimatedDateOfDelivery);
                woman.dateOfDelivery = getGoodDateString(woman.dateOfDelivery);
                //get the followups
                woman.followups = this.getFolloupsOfWoman(id);
            }

            return woman;
        },
        getFolloupsOfWoman: function (id) {
            var forWoman = [];
            var followupsList = dataExtractor(storageNames.followup, []);
            for (var i = 0; i < followupsList.length; i++) {
                if (followupsList[i].womanId == id) {
                    var followUp = followupsList[i];
                    forWoman.push(followUp);
                }
            }
            return forWoman;
        },
        saveFolloup: function (followUpModel, callback) {
            delete followUpModel.errors;
            dataSaver(storageNames.followup, followUpModel);
            callback(true);
        },
        updateWoman: function (womanModel, callback) {
            delete womanModel.followups;
            dataUpdater(storageNames.woman, womanModel, womanModel.id);
            callback(true);
        },
        signOut: function () {
            ionic.Platform.exitApp();
            // stops the app           
        }
    }
}