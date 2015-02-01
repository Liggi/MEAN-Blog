angular.module('MyApp')
  .directive('contentItem', ['$http', '$compile', '$templateCache', function($http, $compile, $templateCache) {
    var getTemplate = function(contentType) {
      var templateLoader,
          baseUrl = "/views/content-blocks/",
          templateMap = {
            standardContent: "standard-content.html",
            imageFloatLeft: "image-float-left.html",
            imageFloatRight: "image-float-right.html",
            image: "image.html"
          };

      var templateUrl = baseUrl + templateMap[contentType];
      templateLoader = $http.get(templateUrl, {cache: $templateCache});

      return templateLoader;
    }

    return { 
      link: function(scope, element, attrs) {
        var loader = getTemplate(scope.item.type);

         var promise = loader.success(function(html) {
             element.html(html);
         }).then(function (response) {
             element.replaceWith($compile(element.html())(scope));
        });
      }
    };
  }]);