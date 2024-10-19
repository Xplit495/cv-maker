<?php
$dbPath = '/data/database.sqlite';
echo $dbPath;

try {
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;

} catch (PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}
