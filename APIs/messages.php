<?php
	require 'connection.php';

	Class Messages{
		public $dbConnection;

		function fetchMessages(){
			$this->dbConnection = new dbConnection();
			$conn_status = $this->dbConnection->initConnection();
			if($conn_status){
				$msg_list = $this->fetch();
				$response = array('success'=>TRUE, 'messages'=>$msg_list);
			}else{
				$response['error'] = 'Some error occured while connecting to db.';
			}
			return $response;
		}

		private function fetch(){
			$msgs = [];
			if(isset($this->dbConnection)){
				$query = "select * from messages order by addedOn desc";
				$result = $this->dbConnection->excecute_query($query);
				$this->dbConnection->closeConnection();
				while($row = $result->fetch_assoc()) {
					$msgs[] = $row;
				}
			}
			return $msgs;
		}
	}

	$msg_obj = new Messages();
	$fetched_msgs = $msg_obj->fetchMessages();
	echo json_encode($fetched_msgs);

?>