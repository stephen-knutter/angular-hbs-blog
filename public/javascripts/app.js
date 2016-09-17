var app = angular.module('blog', ['ng-showdown', 'ui.router']);

app.run(['$rootScope', '$state', '$stateParams',
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'blogCtrl',
        templateUrl: './templates/blog.hbs',
        data: {
          pageTitle: 'Stephe Knutter',
          navSelect: 'home'
        }
      })
      .state('login', {
        url: '/login',
        controller: 'logCtrl',
        templateUrl: './templates/login.hbs',
        data: {
          pageTitle: 'Login | Stephe Knutter',
          navSelect: false
        },
        onEnter: ['$state', 'auth', function($state, auth) {
          if (auth.isLoggedIn()) {
            $state.go('home');
          }
        }]
      })
      .state('dashboard', {
        url: '/dashboard',
        controller: 'articleCtrl',
        templateUrl: './templates/dashboard.hbs',
        data: {
          pageTitle: 'Dashboard | Stephe Knutter',
          navSelect: false
        },
        onEnter: ['$state', 'auth', function($state, auth) {
          if (!auth.isLoggedIn()) {
            $state.go('home');
          }
        }]
      });

    $urlRouterProvider.otherwise('home');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }]);

app.controller('footCtrl', ['$scope', 'auth', function($scope, auth) {
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.logOut = auth.logOut;
}]);

app.controller('blogCtrl', ['$scope', '$http', '$sce',
  function($scope, $http, $sce) {
    $http.get('/articles').success(function(data) {
      $scope.articles = data;
    });
  }]);

app.controller('logCtrl', ['$scope', '$state', 'auth',
  function($scope, $state, auth) {
    $scope.user = {};

    $scope.logIn = function() {
      auth.logIn($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go('home');
      });
    };
  }]);

app.controller('articleCtrl', ['$scope', '$state', 'article',
  function($scope, $state, article) {
    $scope.article = {};

    $scope.addArticle = function() {
      if (!$scope.article.title || !$scope.article.body) return false;

      article.create({
        title: $scope.article.title,
        body: $scope.article.body
      });
    };
  }]);

app.factory('article', ['$http', '$state', 'auth',
  function($http, $state, auth) {
    var article = {};

    article.create = function(newArticle) {
      $http.post('/articles', newArticle, {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      }).success(function(data) {
        $state.go('home');
      });
    };

    return article;
  }]);

app.factory('auth', ['$http', '$state', '$window',
  function($http, $state, $window) {
    var auth = {};

    auth.saveToken = function(token) {
      $window.localStorage['stephen-knutter'] = token;
    };

    auth.getToken = function() {
      return $window.localStorage['stephen-knutter'];
    };

    auth.isLoggedIn = function() {
      var token = auth.getToken();

      if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      }
      return false;
    };

    auth.currentUser = function() {
      if (auth.isLoggedIn()) {
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    };

    auth.logIn = function(user) {
      return $http.post('/login', user).success(function(data) {
        auth.saveToken(data.token);
        $state.go('home');
      });
    };

    auth.logOut = function() {
      $window.localStorage.removeItem('stephen-knutter');
    };

    return auth;
  }]);
