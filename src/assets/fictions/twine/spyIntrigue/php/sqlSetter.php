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

// Insert into table
$sql = "INSERT INTO endings (ending_text) VALUES ('" . $_POST['end'] . "')";

if (!$conn->query($sql)) {
	die("There was an error running the query [" . $conn->error . "]");
}

$conn->close();
?>
