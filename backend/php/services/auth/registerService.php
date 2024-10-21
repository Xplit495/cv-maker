<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: /404");
    exit;
}

$pdo = require_once '../../dbConnect.php';
require_once '../../utils.php';

$email = trim($_POST['email']);
$firstName = trim($_POST['first_name']);
$lastName = trim($_POST['last_name']);
$password = trim($_POST['password']);

// Validation des champs vides
if (empty($email) || empty($firstName) || empty($lastName) || empty($password)) {
    sendJsonResponse('error', 'Veuillez remplir tous les champs.');

}

// Validation de l'email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse('error', 'Adresse mail invalide.');
}

try{
    // Vérifier si l'utilisateur existe déjà
    $stmt = $pdo->prepare("SELECT * FROM user WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $user = $stmt->fetch();

    if ($user) {
        sendJsonResponse('error', 'Cette adresse mail existe déjà.');
    }

    // Hachage du mot de passe et génération d'UUID
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $uuid = generateUuidV4();

    // Insertion de l'utilisateur dans la base de données
    $stmt = $pdo->prepare("INSERT INTO user (id, email, first_name, last_name, password) 
                           VALUES (:uuid, :email, :firstName, :lastName, :hashedPassword)");
    $stmt->bindParam(':uuid', $uuid);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':firstName', $firstName);
    $stmt->bindParam(':lastName', $lastName);
    $stmt->bindParam(':hashedPassword', $hashedPassword);

    if ($stmt->execute()) {
        sendJsonResponse('success', 'Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.');
    } else {
        sendJsonResponse('error', 'Erreur lors de la création du compte. Veuillez réessayer plus tard.');
    }
} catch (PDOException $e) {
    sendJsonResponse('error', 'Erreur lors de la connexion à la base de données : ' . $e->getMessage());
    }
