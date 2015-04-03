var app = angular.module("adminApp", ['ui.bootstrap', 'ngAnimate', 'angularUUID2', 'ui.router', 'angularSpinner']);

// configure our routes
app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$urlRouterProvider.otherwise('/login');

	$stateProvider

	.state('login', {
    url:          '/login',
		templateUrl:  'login.html',
		controller: 	'loginCtrl'
	})

	// route for the dashboard page
	.state('dashboard', {
    url:          '/dashboard',
		templateUrl:  'dashboard.html',
		controller: 	'dashboardApp'
	})

	// route for the users page
	.state('users', {
    url:          '/users',    
		templateUrl: 	'users.html',
		controller: 	'usersApp'
	})

	// route for the boxes page
	.state('boxes', {
    url:          '/boxes',
		templateUrl: 	'boxes.html',
		controller: 	'boxesApp'
	})

  /*$locationProvider.html5Mode(true);*/
});
