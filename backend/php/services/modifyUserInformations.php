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
$field = filter_input(INPUT_POST, 'field', FILTER_SANITIZE_SPECIAL_CHARS);
$value = filter_input(INPUT_POST, 'value', FILTER_SANITIZE_SPECIAL_CHARS);

$allowedFields = ['email', 'first_name', 'last_name', 'password'];

if (!in_array($field, $allowedFields)) {
    sendJsonResponse('error', 'Champ non autorisé.');
    exit;
}

if ($field === 'password') {
    $value = password_hash($value, PASSWORD_BCRYPT);
}

try {
    $stmt = $pdo->prepare("UPDATE user SET $field = :value WHERE id = :id");
    $stmt->bindParam(':value', $value);
    $stmt->bindParam(':id', $userId);

    if ($stmt->execute()) {
        sendJsonResponse('success', 'Le champ a été mis à jour avec succès.');
    } else {
        sendJsonResponse('error', 'Erreur lors de la mise à jour.');
    }

} catch (PDOException $e) {
    sendJsonResponse('error', 'Erreur de base de données : ' . $e->getMessage());
}

