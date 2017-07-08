App.controller('SendMsgCtrl', ['$scope', '$rootScope', 'IO','otp','user',
    function ($scope, $rootScope, IO, otp, user) {
		$scope.otp = otp;
		$scope.message = 'Hi. Your OTP is: '+num;
		$scope.user = user;
		$scope.loader = false;

		$scope.sendMsg = function(){
			if($scope.message && $scope.message != ''){
				$scope.loader = true;
				IO.sendMessageToUser($scope.message, $scope.otp, $scope.user, function(res){
					if(res.success){
						toastr.success('Otp has been sent successfully','Success!');
						$scope.closeSendMsgModal();
					}else if(res.error){
						toastr.error(res.error, 'Error!');
					}
					$scope.loader = false;
				});
			}else{
				toastr.error('Message cannot be empty, please retry','Error!')
			}
		}

		$scope.closeSendMsgModal = function(){
			$scope.$close();
		}
	}
]);