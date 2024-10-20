<?php
$dbPath = __DIR__ . '/../data/database.sqlite'; # Car le fichier dbConnect.php est appelé depuis le dossier services et le chemin vers la base de données est relatif à ce fichier.

try {
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;

} catch (PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}
