'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp') .controller('ProductsCtrl', function ($scope,Product) {
   
    $scope.products = Product.getList().$object;

});

angular.module('clientApp').controller('ProductAddCtrl', function ($scope, Subcategory, Product, $routeParams, $location) {
    
    $scope.subcategory = Subcategory.one($routeParams.subid).get().$object;
    
    $scope.product = {};
    $scope.product.subcategory = {};
    $scope.product.subcategory = $routeParams.subid ;
    

    $scope.saveProduct = function(){

        //console.log($scope.product);

    	Product.post($scope.product).then(function(res){

            $scope.subcategory.products.push(res._id);

            $scope.subcategory.save().then(function(){

                $location.path('/category/' + $routeParams.id  + '/subcategory/' + $routeParams.subid); 

            });
                
    	});  

    };

});