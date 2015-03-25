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

            Subcategory.pupulate('category');

            $scope.category.subcategories.push(res._id);

            $scope.category.save().then(function(){
                $location.path('/category/' + $routeParams.id);
            });
                
    	});  

    };

});

