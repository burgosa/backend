'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular.module('clientApp', [ 'ngRoute', 'restangular'])

  .config(function ($routeProvider,RestangularProvider) {

    RestangularProvider.setBaseUrl('http://localhost:3001');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        access: { requiredLogin: true }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        access: { requiredLogin: true }
      })

      //User Routes
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        access: { requiredLogin: true }
      })
      .when('/user/:id/delete', {
        templateUrl: 'views/user-delete.html',
        controller: 'UserDeleteCtrl',
        access: { requiredLogin: true }
      })

      //Categories Routes
      .when('/categories', {
        templateUrl: 'views/categories.html',
        controller: 'CategoriesCtrl',
        access: { requiredLogin: true }
      })
      .when('/create/category', {
        templateUrl: 'views/category-add.html',
        controller: 'CategoryAddCtrl',
        access: { requiredLogin: true }
      })
      .when('/category/:id/delete', {
        templateUrl: 'views/category-delete.html',
        controller: 'CategoryDeleteCtrl',
        access: { requiredLogin: true }
      })
      .when('/category/:id', {
        templateUrl: 'views/category-view.html',
        controller: 'CategoryViewCtrl',
        access: { requiredLogin: true }
      })
      .when('/category/:id/edit', {
        templateUrl: 'views/category-edit.html',
        controller: 'CategoryEditCtrl',
        access: { requiredLogin: true }
      })

      //Subcategories Routes

      .when('/create/:id/subcategory', {
        templateUrl: 'views/subcategory-add.html',
        controller: 'SubcategoryAddCtrl',
        access: { requiredLogin: true }
      })
      .when('/category/:id/subcategory/:subid/edit', {
        templateUrl: 'views/subcategory-edit.html',
        controller: 'SubcategoryEditCtrl',
        access: { requiredLogin: true }
      })
      .when('/category/:id/subcategory/:subid', {
        templateUrl: 'views/subcategory-view.html',
        controller: 'SubcategoryViewCtrl',
        access: { requiredLogin: true }
      })
      .when('/category/:id/subcategory/:subid/delete', {
        templateUrl: 'views/subcategory-delete.html',
        controller: 'SubcategoryDeleteCtrl',
        access: { requiredLogin: true }
      })

      //Products Routes

      .when('/create/:id/subcategory/:subid/product', {
        templateUrl: 'views/product-add.html',
        controller: 'ProductAddCtrl',
        access: { requiredLogin: true }
      })



      //Moviews Routes
      .when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl',
        access: { requiredLogin: true }
      })
      .when('/create/movie', {
        templateUrl: 'views/movie-add.html',
        controller: 'MovieAddCtrl',
        access: { requiredLogin: true }
      })
      .when('/movie/:id', {
        templateUrl: 'views/movie-view.html',
        controller: 'MovieViewCtrl',
        access: { requiredLogin: true }
      })
      .when('/movie/:id/delete', {
        templateUrl: 'views/movie-delete.html',
        controller: 'MovieDeleteCtrl',
        access: { requiredLogin: true }
      })
      .when('/movie/:id/edit', {
        templateUrl: 'views/movie-edit.html',
        controller: 'MovieEditCtrl',
        access: { requiredLogin: true }
      })

      //Auth Routes
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        access: { requiredLogin: false }
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl',
        access: { requiredLogin: false }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location, auth) {
      $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
          if (nextRoute.access.requiredLogin && !auth.isLoggedIn()) {
              
            $location.path('/login');

          }
      });
  })
  .factory('MovieRestanglar', function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id : '_id'
      });
    });
  })
  .factory('Movie', function(MovieRestanglar){
    return MovieRestanglar.service('movie');
  })
  .factory('UserRestanglar', function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id : '_id'
      });
    });
  })
  .factory('User', function(UserRestanglar){
    return UserRestanglar.service('user');
  })
  .factory('CategoryRestanglar', function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id : '_id'
      });
    });
  })
  .factory('Category', function(CategoryRestanglar){
    return CategoryRestanglar.service('category');
  })
  .factory('SubcategoryRestanglar', function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id : '_id'
      });
    });
  })
  .factory('Subcategory', function(SubcategoryRestanglar){
    return SubcategoryRestanglar.service('subcategory');
  })
  .factory('ProductRestanglar', function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id : '_id'
      });
    });
  })
  .factory('Product', function(ProductRestanglar){
    return ProductRestanglar.service('product');
  });

  
