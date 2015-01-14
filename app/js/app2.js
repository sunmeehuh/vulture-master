(function(){
  var app = angular.module('searchBox', [])
    app.controller('searchBoxController', ['$scope', function($scope) {

      $scope.master = {};

      $scope.update = function(query) {
        $scope.master = angular.copy(query);
      };

      $scope.reset = function() {
        $scope.query = angular.copy($scope.master);
      };

    $scope.reset();

  }]);
})();