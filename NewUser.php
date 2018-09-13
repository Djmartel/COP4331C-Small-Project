<?php
	$inData = getRequestInfo();

  $firstName = $inData["firstName"];
  $lastName = $inData["lastName"];
  $Username = $inData["Username"];
  $Password = md5($inData["Password"]);
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "olmnnik08xzo", "SleepyPanda14!", "canisleepnow");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "insert into Users (FirstName,LastName,Login,Password) VALUES ('" . $firstName . "','" . $lastName . "','" . $Username . "','" . $Password . "')";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}

	returnWithError("");

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
