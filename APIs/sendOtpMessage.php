<?php

	require 'connection.php';
    include('way2sms-api.php');

	Class sendOtpMessage{
		function readAndSendOtpParams(){
			$data = file_get_contents('php://input');
			$postData = json_decode($data, true);

			$msg = $postData['msg'];
			$user = $postData['user'];
			$otp = $postData['otp'];

			$response = [];

			if(isset($msg) && isset($otp) && isset($user)){
				try{
					$u_id = $user['id'];
					$smsSent = $this->sendSms($msg) || TRUE;
					if($smsSent){
						$db_res = $this->registerMsgTodb($u_id, $msg, $otp);

						if(!$db_res){
							$response['error'] = 'Some error occured while connecting to db.';
						}else{
							$response['success'] = TRUE;
						}
					}else{
						$response['error'] = 'Sms not sent properly, Retry after 24hrs.';	
					}
				}catch(Exception $e){
					$response['error'] = 'Some error occured while processing request.';
				}
			}else{
				$response['error'] = 'Manadatary parameters are missing.';
			}

			return $response;

		}



		private function sendSms($msg){
			if($msg){
				$msgLength = strlen($msg);
				// ways2sms service supports 140 characters in a msg free
				if($msgLength < 140){
					$success = TRUE;
				    $res = sendWay2SMS ( '9716807666' , 'way2sms' , '9716807666' , $msg);

				    // $res = sendWay2SMS ( '7982132775' , 'way2sms' , '9716807666,9971792703' , $msg);
				    if($res && count($res)){
				    	foreach ($res as $recipt) {
				    		if(!$recipt['result']){
					    		$success = FALSE;
				    		}
				    	}
				    }
				}else{
					$success = FALSE;
				}
			}
		    return $success;

			// $url = 'https://rest.nexmo.com/sms/json?' . http_build_query(array(
	  //       'api_key' => '68534845',
	  //       'api_secret' => '20b2ffd93ee69e5',
	  //       'from' => 'ankit',
	  //       'to' => '919716807666',
	  //       'text' => 'Your verification code is: 1010'
		 //    ));

		
			// $ch = curl_init($url);
			// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			// $result = curl_exec($ch);
			// curl_close($ch);
		}




		private function registerMsgTodb($u_id, $msg, $otp){
			if(isset($msg) && isset($otp) && isset($u_id)){
				$dbConnection = new dbConnection();
				$conn_status = $dbConnection->initConnection();
				if($conn_status){
				  	$query = "insert into messages(`u_id`,`message`,`otp`) values('".$u_id."','".$msg."','".$otp."')";
					$result = $dbConnection->excecute_query($query);
					$dbConnection->closeConnection();
					return TRUE;
				}else{
					return FALSE;
				}
			}
		}
	}

	$sendSms = new sendOtpMessage();
	$res = $sendSms->readAndSendOtpParams();
	echo json_encode($res);

?>