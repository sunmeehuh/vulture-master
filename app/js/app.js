'use strict';
// define a new module called "vulture" and brings in the required modules
// almost like the "main" module
var vulture = angular.module('vulture', [
    'ngRoute', //allows you to create routes -> lets you use $routeProvider
    'ngSanitize', //sanitize the HTML file -> no bad input
    'vultureControllers', //controllers.js
    'vultureServices', //services.js 
    'vultureFilters', //filters.js 
    'vultureDirectives' //directives.js
  ]);

// routes for the app
// all controllers in controllers.js
vulture.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'searchCtlr'
      }).
      when('/results/:origin', {
        templateUrl: 'partials/results.html',
        controller: 'resultsCtlr'
      }).
      when('/test', {
        templateUrl: 'partials/test.html',
        controller: 'testCtlr'
      }).
      otherwise({
        redirectTo: '/search'
      });
  }]);