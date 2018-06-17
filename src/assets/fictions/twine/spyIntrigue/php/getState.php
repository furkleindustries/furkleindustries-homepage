<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$servername = "localhost";
$username = "intrigue_user";
$password = "i am spy intriguer";
$database = "spy_intrigue";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get from table
$identity = mysqli_real_escape_string($conn, $_GET['userId']);
$sql = "SELECT state FROM state_tracking WHERE id = '" . $identity . "'";
if (!$result = $conn->query($sql)) {
    die("There was an error running the query [" . $conn->error . "]");
}

// Emit results
while ($row = $result->fetch_array()) {
	echo $row['state'];
}
$conn->close();

?>
