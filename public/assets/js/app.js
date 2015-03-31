window.app = angular.module("adminApp", ['ui.bootstrap', 'ngAnimate', 'angularUUID2', 'ui.router', 'ngRoute']);

// configure our routes
app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('/', {
		templateUrl:  'login.html',
		controller: 	'loginCtrl'
	})

	$stateProvider

	// route for the dashboard page
	.when('/dashboard', {
		templateUrl:  'dashboard.html',
		controller: 	'dashboardApp'
	})

	// route for the users page
	.when('/users', {
		templateUrl: 	'users.html',
		controller: 	'usersApp'
	})

	// route for the boxes page
	.when('/boxes', {
		templateUrl: 	'boxes.html',
		controller: 	'boxesApp'
	})

	// use the HTML5 History API
  $locationProvider.html5Mode(true);
});

app.run(function ($rootScope, $location, AuthenticationService) {
	// enumerate routes that don't need authentication
  var routesThatDontRequireAuth = ['/'];

  // check if current location matches route  
  var routeClean = function (route) {
    return _.find(routesThatDontRequireAuth,
      function (noAuthRoute) {
        return _.str.startsWith(route, noAuthRoute);
      });
  };

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    // if route requires auth and user is not logged in
    if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
      // redirect back to login
      $location.path('/');
    }
  });
});

app.config(function ($httpProvider) {
	var logsOutUserOn401 = ['$q', '$location', function ($q, $location) {
    var success = function (response) {
      return response;
    };

    var error = function (response) {
      if (response.status === 401) {
        //redirect them back to login page
        $location.path('/	');

        return $q.reject(response);
      } 
      else {
        return $q.reject(response);
      }
    };

    return function (promise) {
      return promise.then(success, error);
    };
  }];

  $httpProvider.responseInterceptors.push(logsOutUserOn401);
});
