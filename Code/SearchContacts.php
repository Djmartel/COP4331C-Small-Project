<?php

	$inData = getRequestInfo();

	$searchResults = "";
	$searchCount = 0;
	$search = $inData["search"];
	$id = $inData["userId"];

	$conn = new mysqli("localhost", "olmnnik08xzo", "SleepyPanda14!", "canisleepnow");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		if($search == "")
			$sql = "SELECT firstName, lastName, phone, email, zip FROM Contacts WHERE id = '$id' ORDER BY lastName ASC";
		else
			$sql = "SELECT firstName, lastName, phone, email, zip FROM Contacts WHERE firstName LIKE '$search' AND id = '$id' ORDER BY lastName ASC";
			
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				if( $searchCount > 0 )
				{
					$searchResults .= ",";
				}
				$searchCount++;
				$searchResults .= '"' . $row["lastName"] . ', ' . $row["firstName"] . '   |  ' . $row["phone"] . '   |  ' . $row["email"] . '   |  ' . $row["zip"] . '"';
			}
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}

	returnWithInfo( $searchResults );

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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
