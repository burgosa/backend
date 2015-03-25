'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MoviesCtrl
 * @description
 * # MoviesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp').controller('NavCtrl', function($scope, $location, auth){

  	$scope.isLoggedIn = auth.isLoggedIn;
  	$scope.currentUser = auth.currentUser;
  	$scope.logOut = function(){

  		auth.logOut();

  		$location.path('/login');

  	};

});