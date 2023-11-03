<?php
// Replace these with your actual database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "savore";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow from any origin

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT name, description, price, image, id FROM menu_items";
$result = $conn->query($sql);

$menuItems = [];

if ($result && $result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $menuItems[] = $row;
    }
    echo json_encode($menuItems);
} else {
    echo json_encode([]);
}

$conn->close();
?>
