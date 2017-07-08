App.controller('MsgCtrl', ['$scope', '$rootScope', 'messagesData',
    function ($scope, $rootScope, messagesData) {
		$scope.users = [];
		
		$scope.buildData = function(){
			if($scope.messages.length){
				contactsArray = $rootScope.contacts;
				for(i=0; i<$scope.messages.length; i++){
					user_id = $scope.messages[i].u_id;

					if(!angular.isUndefined(user_id)){
						for(j=0; j<contactsArray.length; j++){
							if(user_id == contactsArray[j].id){
								$scope.messages[i].u_data = contactsArray[j];
							}
						}
					}
				}
			}
		}

		console.log(messagesData);
		if(messagesData.data.success){
			$scope.messages = messagesData.data.messages;
			console.log($scope.messages);
			$scope.buildData();
			console.log($scope.messages);
		}

	}
]);