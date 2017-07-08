App.controller('UserCtrl', ['$scope', '$rootScope', 'IO', '$stateParams','$location','$modal',
    function ($scope, $rootScope, IO, $stateParams,$location,$modal) {

    	if($stateParams.u_id && $stateParams.u_name){
    		var userExists = $rootScope.findUser($stateParams.u_id);
    		console.log(userExists);
    		if(userExists){
    			$scope.user = userExists;
    		}else{
    			$location.url('/');
    		}
    	}

    	$scope.generateRandomNumber = function(){
			num = Math.floor(100000 + Math.random() * 900000);
			return num;
    	}

    	$scope.openSendMsgModal = function(){
    		$modal.open({
                templateUrl: "modules/sendMessage.html",
                controller: 'SendMsgCtrl',
                keyboard: true,
                resolve: {
                	otp: function(){
                		return $scope.generateRandomNumber();
                	},
                	user: function(){
                		return $scope.user;
                	}
                }
            });
    	}
	}
]);