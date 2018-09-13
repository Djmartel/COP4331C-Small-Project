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

			echo"<table id ="contactList" style="display: none; visibility: hidden" class = "contactList">";
		  echo"<thead>";
				echo"<tr class = "contactListTop">";
				echo"<th>Firstname</th>";
				echo"<th>Lastname</th>";
				echo"<th>Phone</th>";
				echo"<th>Email</th>";
				echo"<th>Zip</th>";
				echo"</tr>";
		  	echo"</thead>";
		 	echo"<tbody>";
			while($row = $result->fetch_assoc())
			{
					echo "<tr>"
					echo "<td>{$row['firstName']}</td>";
					echo"<td>{$row['lastName']}</td>";
					echo"<td>{$row['phone']}</td>";
					echo"<td>{$row['email']}</td>";
					echo"<td>{$row['zip']}</td>";
					echo"</tr>\n";
			}
			echo"</tbody>";
			echo"</table>";

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
