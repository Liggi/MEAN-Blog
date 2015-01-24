angular.module('MyApp')
  .controller('PostCtrl', ['$scope', '$routeParams', 'Post',
    function($scope, $routeParams, Post) {
      Post.get({ postSlug: $routeParams.postSlug }, function(post) {
        $scope.post = post;
      });
    }]);