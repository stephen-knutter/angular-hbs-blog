var app = angular.module('blog',
  ['ng-showdown',
  'ui.router',
  'ui.select',
  'ngSanitize']);

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
          pageTitle: 'Dashboard | Stephen Knutter',
          navSelect: false
        },
        onEnter: ['$state', 'auth', function($state, auth) {
          if (!auth.isLoggedIn()) {
            $state.go('home');
          }
        }]
      })
      .state('edit', {
        url: '/dashboard/{id}/edit',
        controller: 'editCtrl',
        templateUrl: '/templates/edit.hbs',
        data: {
          pageTitle: 'Edit | Stephen Knutter',
          navSelect: false
        },
        resolve: {
          post: ['$stateParams', 'article', function($stateParams, article) {
            return article.setArticleId($stateParams.id);
          }]
        },
        onEnter: ['$state', 'auth', function($state, auth) {
          if (!auth.isLoggedIn()) {
            $state.go('home');
          }
        }]
      })
      .state('archive', {
        url: '/archive',
        controller: 'blogCtrl',
        templateUrl: './templates/archive.hbs',
        data: {
          pageTitle: 'Archive | Stephen Knutter',
          navSelect: 'archive'
        }
      });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }]);

app.controller('footCtrl', ['$scope', 'auth', function($scope, auth) {
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.logOut = auth.logOut;
}]);

app.controller('blogCtrl', ['$scope', '$http', 'article', 'auth',
  function($scope, $http, article, auth) {
    article.getAllArticles(function(data) {
      $scope.articles = data.rows;
    });

    $scope.formatTime = function(time) {
      return new Date(time).toDateString();
    };

    $scope.isLoggedIn = auth.isLoggedIn;

    $scope.removeArticle = function(id, i) {
      if (confirm('Are you sure?')) {
        id = parseInt(id);
        article.removeArticle(id, function(deleted) {
          if (deleted) $scope.articles.splice(i, 1);
          return false;
        });
      }
    };
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

app.controller('editCtrl', ['$scope', 'article', function($scope, article) {
  $scope.itemArray = [];
  $scope.article = {};
  $scope.msg = false;

  article.findArticleById(article.articleId, function(data) {
    var dataRows = data.rows[0];
    $scope.article.id = dataRows.id;
    $scope.article.title = dataRows.title;
    $scope.article.body = dataRows.body;

    article.getArticleTagsList(function(data) {
      var selected = [];
      for (var i = 0; i < dataRows.tags.length; i++) {
        var tagId = dataRows.tags[i].f1;
        var tag = dataRows.tags[i].f2;
        if (tag) {
          selected.push({id: tagId, tag: tag});
        }
      }
      $scope.article.selected = selected;
      $scope.itemArray = data;
    });
  });

  $scope.editArticle = function(articleId) {
    if (!$scope.article.title || !$scope.article.body) return false;

    var articleAttributes = {
      title: $scope.article.title,
      body: $scope.article.body,
      tags: $scope.article.selected
    };

    article.updateArticle(articleId, articleAttributes, function(msg) {
      if (msg) {
        $scope.msg = true;
      } else {
        $scope.msg = true;
      }
    });
  };
}]);

app.controller('articleCtrl', ['$scope', '$state', 'article',
  function($scope, $state, article) {
    $scope.article = {};

    $scope.itemArray = [];
    article.getArticleTagsList(function(data) {
      $scope.itemArray = data;
    });

    $scope.addArticle = function() {
      if (!$scope.article.title || !$scope.article.body) return false;

      article.create({
        title: $scope.article.title,
        body: $scope.article.body,
        tags: $scope.article.tags
      });
    };
  }]);

app.factory('article', ['$http', '$state', 'auth',
  function($http, $state, auth) {
    var article = {
      articleId: null
    };

    article.getAllArticles = function(cb) {
      $http.get('/articles').success(function(data) {
        cb(data);
      });
    };

    article.setArticleId = function(id) {
      article.articleId = id;
    };

    article.findArticleById = function(articleId, cb) {
      $http.get('/articles/' + articleId).success(function(data) {
        cb(data);
      });
    };

    article.create = function(newArticle) {
      $http.post('/articles', newArticle, {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      }).success(function(data) {
        $state.go('home');
      });
    };

    article.getArticleTagsList = function(cb) {
      $http.get('/articles/tags').success(function(data) {
        cb(data);
      });
    };

    article.removeArticle = function(articleId, cb) {
      $http.delete('/articles/' + articleId, {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      }).success(function(data) {
        cb(true);
      });
    };

    article.updateArticle = function(articleId, article, cb) {
      $http.put('/articles/' + articleId + '/edit', article, {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      }).success(function(data) {
        cb(true);
      }).error(function() {
        cb(false);
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
