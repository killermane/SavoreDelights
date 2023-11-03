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

// Check if the 'id' GET parameter is set
if (isset($_GET['id'])) {
    $itemId = $_GET['id'];
    $stmt = $pdo->prepare("SELECT * FROM menu_items WHERE id = ?");
    $stmt->execute([$itemId]);
    $item = $stmt->fetch();
}

?>

    <link rel="stylesheet" href="styles.css"> 

<div class="item-details">
    <?php if (isset($item) && $item): // Check if $item is defined and not false ?>
        <h1><?php echo htmlspecialchars($item['name']); ?></h1>
        <p><?php echo htmlspecialchars($item['description']); ?></p>
        <!-- Add more details as needed -->
    <?php else: ?>
        <p>Item not found.</p> <!-- Fallback message if $item is not found -->
    <?php endif; ?>
</div>
