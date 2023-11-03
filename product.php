<?php
$host = 'localhost'; // or "127.0.0.1"
$db   = 'savore';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>



<!-- Inside product.html -->
<div class="item-details">
    <h1><?php echo htmlspecialchars($item['name']); ?></h1>
    <p><?php echo htmlspecialchars($item['description']); ?></p>
    <!-- Add more details as needed -->
</div>
