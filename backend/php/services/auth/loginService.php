<?php
header('Content-Type: application/json');
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: /404");
    exit;
}

$pdo = require_once '../../dbConnect.php';
require_once '../../utils.php';


$email = trim($_POST['email']);
$password = trim($_POST['password']);

if (empty($email) || empty($password)) {
    sendJsonResponse('error', 'Veuillez remplir tous les champs.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse('error', 'Adresse email invalide.');
}

try {
    $stmt = $pdo->prepare('SELECT id, email, password FROM user WHERE email = :email');
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        sendJsonResponse('error', 'Identifiants incorrects.');
    }

    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        sendJsonResponse('success', 'Connexion réussie.');
    } else {
        sendJsonResponse('error', 'Identifiants incorrects.');
    }

} catch (PDOException $e) {
    sendJsonResponse('error', 'Erreur lors de la connexion à la base de données : ' . $e->getMessage());
}
