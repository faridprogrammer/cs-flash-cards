/* eslint no-alert: 0 */

'use strict';

//
// Here is how to define your module
// has dependent on mobile-angular-ui
//
var app = angular.module('MobileAngularUiExamples', [
  'ngRoute',
  'mobile-angular-ui',

  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'.
  // This is intended to provide a flexible, integrated and and
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);

app.run(function($transform) {
  window.$transform = $transform;
});

//
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false'
// in order to avoid unwanted routing.
//
app.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'home.html?v=1', reloadOnSearch: false});
  $routeProvider.when('/item/:name', {templateUrl: 'itemDetail.html', reloadOnSearch: false});
  $routeProvider.when('/category/:name', {templateUrl: 'categoryList.html', reloadOnSearch: false});
});

//
// For this trivial demo we have just a unique MainController
// for everything
//
app.controller('MainController', function($rootScope, $scope) {

  $scope.swiped = function(direction) {
    alert('Swiped ' + direction);
  };

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;

  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.loading = false;
  });

});

app.controller('itemDetailController', function($routeParams, $rootScope, $scope,$http,$sce) {
  $scope.toTrustedHTML = function (html) {
    return $sce.trustAsHtml(html);
  };
  
  var url = "/algo/data/" + $routeParams.name + ".json";
  $http.get(url).then(function(response){
    debugger;
        $scope.model = response.data;
    });
});

app.controller('categoryController', function($routeParams, $rootScope, $scope,$http) {
  var url = "/algo/data/categories/" + $routeParams.name + ".json";
  $http.get(url).then(function(response){
        $scope.model = response.data;
    });
});