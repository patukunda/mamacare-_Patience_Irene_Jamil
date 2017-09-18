function NewsfeedsAddABusinessCategoriesCtrl($scope, $state, $ionicHistory, $ionicLoading, Utility, Categories) {
    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };


    $scope.selectedCategories = Categories.getSelectedCategories();

    console.log("Getting the categories list ");
    Categories.getCategories($scope);

    $scope.isASelectedCategory = function (category) {        
        for (var i = 0; i < $scope.selectedCategories.length; i++) {
            for (var j = 0; j < category.sub_categories.length; j++) {
                
                if (parseInt($scope.selectedCategories[i].id) == parseInt(category.sub_categories[j].id)) {
                    //console.log("Testing condition is true ");
                    //alert("gwe");
                    category.classy = "selectedCategoryClass";
                    return "";
                }
            }
        }
        category.classy = "";
        return "";
    };

    
    $scope.searchCategory = "";
    $scope.clearSearch = function () {
        console.log("clicking per second", $scope.trythis);
        $scope.searchCategory = "";
    };

    $scope.$on('$ionicView.enter', function () {
        $scope.selectionError = "";
        //alert("peter");
        if ($scope.categories != null && $scope.categories.length > 0) {
            
            for (var i = 0; i < $scope.categories.length; i++) {
                var cat = $scope.categories[i];
                $scope.isASelectedCategory(cat);
            }
        }
    });

    $scope.doRefresh = function () {
        $scope.searchCategory = "";
        $scope.selectionError = "";
        $scope.selectedCategories = Categories.getSelectedCategories();
        $scope.categories = [];
        console.log("Getting the categories list ");
        Categories.getCategories($scope);

        $scope.$broadcast('scroll.refreshComplete');
    };


}