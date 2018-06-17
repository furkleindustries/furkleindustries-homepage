<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

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
$sql = "SELECT * FROM endings ORDER BY id DESC LIMIT 100";

if (!$result = $conn->query($sql)) {
	die("There was an error running the query [" . $conn->error . "]");
}

// Emit results
while ($row = $result->fetch_array()) {
	echo $row['ending_text'] . '杳';
}
$conn->close();
?>
