<?php
declare(strict_types=1);

$host = 'localhost';
$db   = 'user_auth_db';
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
} catch (PDOException $e) {
    // Μην εμφανίζετε λεπτομέρειες σύνδεσης στον τελικό χρήστη
    exit('Σφάλμα σύνδεσης με τη βάση δεδομένων.');
}
