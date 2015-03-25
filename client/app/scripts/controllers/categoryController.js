'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp') .controller('CategoriesCtrl', function ($scope,Category) {
   
    $scope.categories = Category.getList({'populate':'subcategories'}).$object;


});

angular.module('clientApp').controller('CategoryViewCtrl', function ($scope, $routeParams, Category) {
   
    $scope.category = Category.one($routeParams.id).get({'populate':['subcategories','products']}).$object;

});

angular.module('clientApp').controller('CategoryEditCtrl', function ($scope, $routeParams, Category, $location) {

    $scope.category = {};

    Category.one($routeParams.id).get().then(function(Category){

    	$scope.category = Category;
    	$scope.saveCategory = function() {
    		$scope.category.save().then(function(){
    			$location.path('/category/' + $routeParams.id);
    		});
    	};
    });
});

angular.module('clientApp').controller('CategoryDeleteCtrl', function ($scope, $routeParams, Category, $location) {
    	
    $scope.category = Category.one($routeParams.id).get().$object;

    $scope.deleteCategory = function(){

    	$scope.category.remove().then(function(){

    		$location.path('/categories');
    	});
    };

    $scope.back = function(){

    	$location.path('/category/' + $routeParams.id);
    };

});

angular.module('clientApp').controller('CategoryAddCtrl', function ($scope, Category, $location) {
    
    $scope.category = {};

    $scope.saveCategory = function(){

    	Category.post($scope.category).then(function(){

    		$location.path('/categories');

    	});
        
    };

});

