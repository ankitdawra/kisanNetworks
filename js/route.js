App.config(['$stateProvider', '$urlRouterProvider', '$locationProvider','$routeProvider', function($stateProvider, $urlRouterProvider, $locationProvider,$routeProvider) {
	$urlRouterProvider.otherwise('/contacts');

	$stateProvider.state('contacts', {
		url:'/contacts',
		templateUrl:'modules/contacts.html'
	});

	$stateProvider.state('user', {
		url:'/user/:u_name/:u_id',
		templateUrl:'modules/user.html',
		controller:'UserCtrl'
	});

	$stateProvider.state('messages', {
		url:'/messages',
		templateUrl: 'modules/messages.html',
		controller:'MsgCtrl',
		resolve:{
			messagesData: function(IO){
				// data = [
				// 	{"u_id":"1","otp":"90","msg":"hey"},
				// 	{"u_id":"2","otp":"90","msg":"hey"},
				// 	{"u_id":"3","otp":"90","msg":"hey"}
				// ];
				return IO.getMessages();
			}
		}
	});
}]);