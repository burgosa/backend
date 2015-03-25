'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp') .controller('SubcategoriesCtrl', function ($scope,Category) {
   
    $scope.categories = Category.getList().$object;

});

angular.module('clientApp').controller('SubcategoryAddCtrl', function ($scope, Subcategory,Category, $routeParams, $location) {
    
    $scope.category = Category.one($routeParams.id).get().$object;
    $scope.subcategory = {};
    $scope.subcategory.category = {};
    $scope.subcategory.category = $routeParams.id ;

    $scope.saveSubcategory = function(){

    	Subcategory.post($scope.subcategory).then(function(res){

            $scope.category.subcategories.push(res._id);

            $scope.category.save().then(function(){
                $location.path('/category/' + $routeParams.id); 
            });
                
    	});  

    };

});

angular.module('clientApp').controller('SubcategoryViewCtrl', function ($scope, $routeParams, Subcategory) {
   
    $scope.subcategory = Subcategory.one($routeParams.subid).get({'populate':['category','products']}).$object;

});

angular.module('clientApp').controller('SubcategoryDeleteCtrl', function ($scope, $routeParams, Subcategory, Category, $location) {
        
    $scope.subcategory = Subcategory.one($routeParams.subid).get().$object;
    $scope.category = Category.one($routeParams.id).get().$object;

    $scope.deleteSubcategory = function(){
        
        for (var i = 0; i < $scope.category.subcategories.length; i++) {

            if ($scope.category.subcategories[i] === $routeParams.subid) {

                $scope.category.subcategories.splice(i, 1);

            }
        }
        
        $scope.subcategory.remove().then(function(){

            $scope.category.save().then(function(){

                $location.path('/category/' + $routeParams.id);

            });

        });

    };

    $scope.back = function(){

        $location.path('/category/' + $routeParams.id);
    };

});

angular.module('clientApp').controller('SubcategoryEditCtrl', function ($scope, $routeParams,Subcategory, $location) {

    $scope.subcategory = {};

    Subcategory.one($routeParams.subid).get().then(function(Subcategory){

        $scope.subcategory = Subcategory;

        $scope.saveSubcategory = function() {
            $scope.subcategory.save().then(function(){

                $location.path('/category/' + $routeParams.id);

            });
        };
    });
});

