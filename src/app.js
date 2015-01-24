angular.module('MyApp', ['ngResource', 'ngRoute', 'ngSanitize'])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  	$locationProvider.html5Mode(true);
  	$routeProvider
  		.when('/', {
  			templateUrl: 'views/home.html',
  			controller: 'MainCtrl'
  		})
      .when('/posts/:postSlug', {
        templateUrl: 'views/post.html',
        controller: 'PostCtrl'
      })
  		.otherwise({
  			redirectTo: '/'
  		})
  }]);