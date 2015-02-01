angular.module('MyApp')
  .directive('contentItem', function() {
    return { 
      restrict: 'AE',
      replace: true,
      template: "<p class='gangster-shit'></p>",
      link: function(scope, element, attrs) {
        $(element).text(attrs.type);
      }
    };
  });