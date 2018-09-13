<?php
	$inData = getRequestInfo();

  $firstName = $inData["firstName"];
  $lastName = $inData["lastName"];
  $phone = $inData["phone"];
  $zip = $inData["zip"];
  $email = $inData["email"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "olmnnik08xzo", "SleepyPanda14!", "canisleepnow");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{


		$sql = "insert into Contacts(lastName,firstName,phone,zip,email,ID) VALUES ('" . $lastName . "','" . $firstName . "','" . $phone . "','" . $zip . "','" . $email . "','" . $userId . "')";
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
