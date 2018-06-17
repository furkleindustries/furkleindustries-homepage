<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$servername = "localhost";
$username = "intrigue_user";
$password = "i am spy intriguer";
$database = "spy_intrigue";

$dbh = null;
try {
	$dbh = new PDO('mysql:dbname=' . $database . ';host=', 
		$username, $password);
} catch (PDOException $e) {
	echo $e->getMessage();
}

$data = array('id' => $_POST['userId'], 'state' => $_POST['state']);
$statement = $dbh->prepare("SELECT * FROM state_tracking WHERE id=:id");
$statement->execute(array('id' => $_POST['userId']));
print_r($statement->rowCount());

if ($statement->rowCount() === 0) {
	$statement = $dbh->prepare("INSERT INTO state_tracking(id, state, time) VALUES(:id, :state, " . (string)time() . ")");
} else {
	$statement = $dbh->prepare("UPDATE state_tracking SET state=:state WHERE id=:id");
}
print_r($statement);
$statement->execute($data);

$dbh = null;

?>
