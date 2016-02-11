// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var PokeApp = angular.module('PokeApp', ['ionic','ngRoute','ngSanitize']) //setting up the directive to work with them

.run(function($ionicPlatform, $rootScope, $location) {

  $rootScope.goHome = function() { //this is a function when clicked will send them to /list (basically a function for the home button)
    $location.path('/list');
  };

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

PokeApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/list',{ //when the url is list create an object
      controller: 'ListController', //say the controller we want to use
      templateUrl: 'partials/list.html'
    })
    .when('/details/:itemId',{
      controller: 'DetailsController',
      templateUrl: 'partials/details.html' //look at the partials folder for a page called details
    })
    .otherwise({redirectTo: '/list'});

}]);

PokeApp.controller('ListController',['$scope', '$http', '$ionicLoading', function($scope, $http, $ionicLoading) {
  $scope.loadPokedex = function(){
    $ionicLoading.show();
    $http.get("http://pokeapi.co/api/v1/pokedex/1/?format=json&offset=50&limit=10")
    .success(function(response) {
      // console.log(response);
      // for (var i=0; i<25; i++) {
      // // console.log(response.pokemon[i].resource_uri);
      // $scope.resource_uri =[];
      // $scope.resource_uri[i] = response.pokemon[i].resource_uri;
      // // $scope.pokemon.resource_uri = response.pokemon[$routeParams.itemId].resource_uri;
      // var currentStart = 0
      // $scope.pokemon = []
      $scope.pokemon = response.pokemon;
      // $scope.loadMore = function() {
      //   console.log('hey');
      //   var last = $scope.pokemon[$scope.pokemon.length - 1];
      //   for(var i=1; i <=8; i++) {
      //     $scope.pokemon.push(last + 1);
      //     console.log($scope.pokemon.length - 1);
      //   }
      // }

      console.log("http://pokeapi.co/api/v1/pokedex/1/?limit=10&format=json&offset=50");


      // $scope.addItems = function() {
      //   for (var i = currentStart; i < currentStart+20; i++) {
      //     $scope.pokemon.push(pokemon + i)
      //   }

      //   currentStart += 20
      //   $scope.$broadcast('scroll.infiniteScrollComplete')
      // }
      $ionicLoading.hide();

      // $http.get('http://pokeapi.co/'+$scope.resource_uri)
      // .success(function(response) {
      //   // console.log(response);
      //   // $scope.attack = response.attack;
      //   $scope.national_id = [];
      //   $scope.national_id = response.national_id;
      //   $scope.sprites = [];
      //   // console.log(response.sprites[0].resource_uri);
      //   $scope.sprites = response.sprites[0].resource_uri;

      //   $http.get('http://pokeapi.co/'+$scope.sprites)
      //   .success(function(response) {
      //     // console.log(response);
      //     $scope.pokemon.image = response.image;
      //     console.log($scope.pokemon.image);
      //   });
      // });
      // }

      console.log($scope.pokemon);
    })
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
  $scope.loadPokedex();
}]);

PokeApp.controller('DetailsController',['$scope', '$http', '$routeParams', '$ionicLoading', function($scope, $http, $routeParams, $ionicLoading) {
  $ionicLoading.show();
  $http.get("http://pokeapi.co/api/v1/pokedex/1/")
  .success(function(response) {
    $scope.resource_uri = response.pokemon[$routeParams.itemId].resource_uri;
    // $scope.hp = response.pokemon[$routeParams.itemId].hp;
    console.log($scope.resource_uri);
    $ionicLoading.hide();

    $http.get('http://pokeapi.co/'+$scope.resource_uri)
    .success(function(response) {
      console.log(response);

      // Details Info /////////////////////////////////////////////////////////////
      $scope.name = response.name;
      $scope.hp = response.hp;
      $scope.attack = response.attack;
      $scope.defense = response.defense;
      $scope.height = response.height;
      $scope.abilities = response.abilities;
      $scope.abilities.name = response.abilities.name;
      $scope.evolutions = response.evolutions;
      if(response.evolutions.length > 0) {
        var el = document.getElementById("dynamicHeading");
        el.classList.remove("evo");
      }


      $scope.sprites = [];
      console.log(response.sprites[0].resource_uri);
      $scope.sprites = response.sprites[0].resource_uri;

      $http.get('http://pokeapi.co/'+$scope.sprites)
      .success(function(response) {
      console.log(response);
      $scope.image = response.image;
      console.log(response.image);
    });

    });
  });
}]);






