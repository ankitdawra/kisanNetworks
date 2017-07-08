
var baseUrl = "http://localhost/kisanNetwork/APIs/";
App.service('IO', ['$http', '$rootScope', function ($http, $rootScope) {
	return{
		getContacts: function(callback){
			var data = [
				{"id":"1","fname":"Steve","lname":"Baisden","phone":"+91-9090909090","pic":"https://randomuser.me/api/portraits/women/55.jpg"},
	            {"id":"2","fname":"Michael","lname":"Mcmorran","phone":"+91-9090909090","pic":"https://randomuser.me/api/portraits/women/91.jpg"},
	            {"id":"3","fname":"Elli","lname":"Brainerd","phone":"+91-9090909090","pic":"https://randomuser.me/api/portraits/men/81.jpg"},
	            {"id":"4","fname":"Steve","lname":"Baisden","phone":"+91-9090909090","pic":"https://randomuser.me/api/portraits/men/53.jpg"},
	            {"id":"5","fname":"Carli","lname":"Plants","phone":"+91-9090909090","pic":"https://randomuser.me/api/portraits/women/55.jpg"},
	            {"id":"6","fname":"Grieb","lname":"Lucio","phone":"+91-9090909090","pic":"https://randomuser.me/api/portraits/men/78.jpg"},
	            {"id":"7","fname":"Nieves","lname":"Seay","phone":"+91-9090909090","pic":"https://randomuser.me/api/portraits/men/81.jpg"},
	            {"id":"8","fname":"Michael","lname":"Mcmorran","phone":"+91-9090909090","pic":"https://randomuser.me/api/portraits/women/91.jpg"},
	            {"id":"9","fname":"Elli","lname":"Brainerd","phone":"+91-9090909090","pic":"https://randomuser.me/api/portraits/men/78.jpg"},
	            {"id":"10","fname":"Carli","lname":"Plants","phone":"+91-9090909090","pic":"https://randomuser.me/api/portraits/women/55.jpg"},
	            {"id":"11","fname":"Michael","lname":"Mcmorran","phone":"+91-9090909090","pic":"https://randomuser.me/api/portraits/women/63.jpg"}
			]
			callback(data);
			// $http.get('http://localhost/kisanNetwork/APIs/getContacts.php').success(function (response) {
   //              callback(response);
   //          });;
		},

		sendMessageToUser: function(message, otp, userData, callback){
			return $http.post(baseUrl + 'sendOtpMessage.php',{msg:message, otp:otp, user: userData}).success(function(response){
				callback(response);
			});
		},

		getMessages: function(){
			return $http.get(baseUrl + 'messages.php');
		}
	}
}]);