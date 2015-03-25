'use strict';

angular.module('clientApp').factory('auth',function ($http,$window) {

   var auth = {};

   auth.saveToken = function (token){

	  $window.localStorage['appToken-sec-100'] = token;

	};

	auth.getToken = function (){

	  return $window.localStorage['appToken-sec-100'];

	};

	auth.isLoggedIn = function(){

	  var token = auth.getToken();

	  if(token){
	    var payload = JSON.parse($window.atob(token.split('.')[1]));

	    return payload.exp > Date.now() / 1000;

	  } else {
	    
	    return false;
	  
	  }
	};

	auth.currentUser = function(){

	  if(auth.isLoggedIn()){
	    var token = auth.getToken();
	    var payload = JSON.parse($window.atob(token.split('.')[1]));

	    return payload.username;

	  }
	};

	auth.currentId = function(){

	  if(auth.isLoggedIn()){
	    var token = auth.getToken();
	    var payload = JSON.parse($window.atob(token.split('.')[1]));

	    return payload._id;
	    
	  }
	};


	auth.register = function(user){
	  	return $http({

		    url: 'http://localhost:3001/register',
		    dataType: 'json',
		    method: 'POST',
		    data: 'username='+user.username+'&password='+user.password+'&firstName='+user.firstName+'&lastName='+user.lastName,
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    }

		}).success(function(data){

	    	auth.saveToken(data.token);

	  	});
	};


	auth.logIn = function(user){

	  	return $http({

		    url: 'http://localhost:3001/login',
		    dataType: 'json',
		    method: 'POST',
		    data: 'username='+user.username+'&password='+user.password,
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    }

		}).success(function(data){

	   		auth.saveToken(data.token);

	  	});
	};

	auth.logOut = function(){

	  $window.localStorage.removeItem('appToken-sec-100');

	};


  	return auth;
});