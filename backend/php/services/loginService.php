<?php
header('Content-Type: application/json');
session_start();

$pdo = require_once '../dbConnect.php';
require_once '../utils.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: /404");
    exit;
}

$email = trim($_POST['email']);
$password = trim($_POST['password']);

// Validation des champs vides
if (empty($email) || empty($password)) {
    sendJsonResponse('error', 'Veuillez remplir tous les champs.');
}

// Validation de l'email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse('error', 'Adresse email invalide.');
}

try {
    // Vérifier si l'utilisateur existe
    $stmt = $pdo->prepare('SELECT id, email, password FROM user WHERE email = :email');
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        // L'utilisateur n'existe pas
        sendJsonResponse('error', 'Identifiants incorrects.');
    }

    // Vérifier le mot de passe
    if (password_verify($password, $user['password'])) {
        // Le mot de passe est correct, on crée la session
        $_SESSION['user_id'] = $user['id'];
        sendJsonResponse('success', 'Connexion réussie.');
    } else {
        // Mauvais mot de passe
        sendJsonResponse('error', 'Identifiants incorrects.');
    }

} catch (PDOException $e) {
    sendJsonResponse('error', 'Erreur lors de la connexion à la base de données : ' . $e->getMessage());
}
