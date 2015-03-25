'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MoviesCtrl
 * @description
 * # MoviesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp') .controller('MoviesCtrl', function ($scope,Movie) {
   
    $scope.movies = Movie.getList().$object;

});

angular.module('clientApp').controller('MovieViewCtrl', function ($scope, $routeParams, Movie) {
   
    $scope.viewMovie = true;

    $scope.movie = Movie.one($routeParams.id).get().$object;

});

angular.module('clientApp').controller('MovieEditCtrl', function ($scope, $routeParams, Movie, $location) {
    
    $scope.editMovie = true;
    $scope.movie = {};

    Movie.one($routeParams.id).get().then(function(movie){
    	$scope.movie = movie;
    	$scope.saveMovie = function() {
    		$scope.movie.save().then(function(){
    			$location.path('/movie/' + $routeParams.id);
    		});
    	};
    });
});

angular.module('clientApp').controller('MovieDeleteCtrl', function ($scope, $routeParams, Movie, $location) {
    	
    $scope.movie = Movie.one($routeParams.id).get().$object;
    $scope.deleteMovie = function(){

    	$scope.movie.remove().then(function(){

    		$location.path('/movies');
    	});
    };

    $scope.back = function(){

    	$location.path('/movie/' + $routeParams.id);
    };

});

angular.module('clientApp').controller('MovieAddCtrl', function ($scope,Movie, $location) {
    
    $scope.movie = {};
    
    $scope.saveMovie = function(){

    	Movie.post($scope.movie).then(function(){

    		$location.path('/movies');

    	});
    };


});

