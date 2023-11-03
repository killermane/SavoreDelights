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
    // It's generally a bad idea to output connection errors directly to the browser,
    // as it can reveal sensitive information. Consider logging this to a file instead.
    // For the purpose of this example, we'll return a JSON error message.
    echo json_encode(['error' => 'Connection failed']);
    exit; // Stop the script here if the connection failed
}

// SQL to get reviews
$sql = "SELECT name, review FROM reviews";
$result = $conn->query($sql);

$reviews = [];

if ($result && $result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $reviews[] = $row; // Corrected variable name here
    }
    echo json_encode($reviews);
} else {
    echo json_encode([]);
}

$conn->close();
?>
