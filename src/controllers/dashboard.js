angular.module('MyApp')
  .controller('DashboardCtrl', ['$scope', '$sce', 'Auth', function($scope, $sce, Auth) {
  	var contentBlocks = [
  		{
  			type: "standardContent",
  			content: $sce.trustAsHtml("<p>I wanna put some HTML in here and ting, is it gonna go mental at me?</p><p>Some more</p>")
  		},
      {
        type: "standardContent",
        content: $sce.trustAsHtml("<blockquote>Blah blah blah</blockquote>")
      },
  		{
  			type: "image",
  			content: "Image.jpg"
  		}
  	];

  	$scope.items = contentBlocks;

    $scope.logout = function() {
      Auth.logout();
    };
  }]);