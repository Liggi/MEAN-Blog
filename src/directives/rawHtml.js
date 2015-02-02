angular.module('MyApp')
  .directive('rawHtml', ['$http', function($http) {
    return { 
      link: function(scope, element, attrs) {
        attrs.$observe('html', function(html) {
          $(element).replaceWith(html);
        });
      }
    };
  }]);