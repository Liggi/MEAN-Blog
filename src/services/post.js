angular.module('MyApp')
  .factory('Post', ['$resource', function($resource) {
    return $resource('/api/posts/:postSlug');
  }]);