angular.module('MyApp')
  .controller('DashboardCtrl', ['$scope', 'Auth', function($scope, Auth) {
  	var contentBlocks = [
  		{
  			blockTemplate: "views/content-blocks/standard-content.html",
  			content: "<p>I wanna put some HTML in here and ting, is it gonna go mental at me?</p><p>Some more</p>"
  		},
  		{
  			blockTemplate: "views/content-blocks/image.html",
  			content: "Image.jpg"
  		}
  	];

  	$scope.items = contentBlocks;

    $scope.logout = function() {
      Auth.logout();
    };
  }]);