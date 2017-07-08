<?php
	
	class dbConnection{ 
		public static $conn;

		function isConnectionOpen(){
			if(isset(self::$conn)){
				return self::$conn;
			}
			return FALSE;
		}
		
		function initConnection(){
			if($this->isConnectionOpen()){
				return TRUE;
			}else{
				$host     = "localhost";
				$user     = "root";
				$password = "password";
				$dbname   = "kisanNetwork";

				// Create connection
				self::$conn = mysqli_connect($host,$user,$password,$dbname);

				// Check connection
				if (mysqli_connect_errno()){
				    return FALSE;
			    }else{
			    	return TRUE;
				}
				return TRUE;
			}
		}

		function closeConnection(){
			mysql_close(self::$conn);
			self::$conn = NULL;
		}

		function excecute_query($query){
			if($query){
				return self::$conn->query($query);
			}
		}
	}

?>