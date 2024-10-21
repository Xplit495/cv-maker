<?php

header('Content-Type: application/json');
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: /404");
    exit;
}

$pdo = require_once '../dbConnect.php';
require_once '../utils.php';

$userId = $_SESSION['user_id'];

try{
    $stmt = $pdo->prepare("SELECT * FROM user WHERE id = :id");
    $stmt->bindParam(':id', $userId);
    $stmt->execute();
    $user = $stmt->fetch();
    if ($user) {
        sendJsonResponse('success', $user);
    } else {
        sendJsonResponse('error', 'Utilisateur introuvable');
    }

} catch (PDOException $e) {
    sendJsonResponse('error', 'Erreur lors de la connexion à la base de données : ' . $e->getMessage());
}
