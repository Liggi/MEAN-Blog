angular.module('MyApp', ['ngCookies', 'ngResource', 'ngRoute', 'ngSanitize'])
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
      .when('/admin/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/admin/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
  		.otherwise({
  			redirectTo: '/'
  		})
  }]);