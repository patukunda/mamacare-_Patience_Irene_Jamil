function NewsfeedsAddABusinessCategorySubCategoriesCtrl($scope, $state, $stateParams, $ionicHistory, $ionicLoading, Utility, Categories) {
    $scope.getImage = function (type, url) {
        return Utility.getImage(type, url);
    };

    $scope.categoryId = $stateParams.id;


    $scope.selectedCategories = Categories.getSelectedCategories();

    $scope.category = Categories.get($scope.categoryId);
    gift = $scope.category;

    $scope.$watch('selectedCategories', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            console.log("new selected categories values ", $scope.selectedCategories);
            Categories.setSelectedCategories(newValue);
        }
    }, true);

    //check if the subcategory is selected
    //note a subcategory is like a category, as in they have the same structure but is not a category
    $scope.isSelected = function (subCategory) {
        //console.log("Testability ", selectedCategory);
        for (var i = 0; i < $scope.selectedCategories.length; i++) {
            if (parseInt($scope.selectedCategories[i].id) == parseInt(subCategory.id)) {
                //console.log("Testing condition is true ");
                return true;
            }
        }
        //console.log("Testing condition is false ");
        return false;
    };
   
    $scope.selectCategory = function (selectedCategory) {
        console.log("------------CLIKING TO SELECT--------");
        $scope.selectionError = "";
        //if the category is already  selected then it is removed
        var wasSelected = $scope.isSelected(selectedCategory);
        if (wasSelected) {
            console.log("It was already selected ", selectedCategory);
            $scope.removeCategory(selectedCategory);
            return;
        } else {
            console.log("It was not selected before ", selectedCategory);
        }
        console.log("selecting IT ", selectedCategory);
        if ($scope.selectedCategories.length < 3) {
            $scope.selectedCategories.push(selectedCategory);
            return true;
        } else {
            console.log("Failed to add IT ", selectedCategory);
            //$scope.selectionError = ;
            $ionicLoading.show({ template: "!!! You cannot select more than three categories", noBackdrop: false, duration: 2000 });
            //document.getElementById("check" + selectedCategory.id).click();
            $('#check' + selectedCategory.id + ' input:checkbox').prop("checked", false).trigger("stateChanged");
        }
    };


    $scope.removeCategory = function (selectedCategory) {
        for (var i = 0; i < $scope.selectedCategories.length ; i++) {
            if (parseInt($scope.selectedCategories[i].id) == parseInt(selectedCategory.id)) {
                $scope.selectedCategories.splice(
                    $scope.selectedCategories.indexOf($scope.selectedCategories[i]),
                    1
                );
                return true;
            }
        }
        return false;
    };
    $scope.selectionError = "";
    

    $scope.searchSubCategory = "";
    $scope.clearSearch = function () {
        console.log("clicking per second", $scope.trythis);
        $scope.searchSubCategory = "";
    };
    $scope.$on('$ionicView.enter', function () {
        $scope.selectionError = "";
    })

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