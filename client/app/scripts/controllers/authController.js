'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MoviesCtrl
 * @description
 * # MoviesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp').controller('AuthCtrl', function ($scope, $location, auth){

    $scope.user = {};

    $scope.register = function(){
    
        auth.register($scope.user).error(function(error){

            $scope.error = error;
    
        }).then(function(){
    
            $location.path('/');
    
        });
    };

    $scope.logIn = function(){

        auth.logIn($scope.user).error(function(error){
    
            $scope.error = error;
    
        }).then(function(){
    
           $location.path('/');
    
        });
  
    };

});

