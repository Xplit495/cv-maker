<?php

require '../../../vendor/autoload.php';
use Ramsey\Uuid\Uuid;

$pdo = require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    $email = trim($_POST['email']);
    $firstName = trim($_POST['first_name']);
    $lastName = trim($_POST['last_name']);
    $password = trim($_POST['password']);

    if (empty($email) || empty($firstName) || empty($lastName) || empty($password)) {
        die('Veuillez remplir tous les champs.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('Adresse mail invalide.');
    }

    $stmt = $pdo->prepare("SELECT * FROM user WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $user = $stmt->fetch();

    if ($user) {
        die('Cette adresse mail existe déjà.');
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $uuid = Uuid::uuid4();

    $stmt = $pdo->prepare("INSERT INTO user (id, email, first_name, last_name, password) VALUES (:uuid, :email, :firstName, :lastName, :hashedPassword)");
    $stmt->bindParam(':uuid', $uuid);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':firstName', $firstName);
    $stmt->bindParam(':lastName', $lastName);
    $stmt->bindParam(':hashedPassword', $hashedPassword);

    if ($stmt->execute()) {
        $_SESSION['success_message'] = 'Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.';

        header('Location: ../HTML/loginPage.php');
        exit;
    } else {
        die("Erreur lors de la création du compte. Veuillez réessayer plus tard.");
    }

} else {
    die("Méthod de requête non autorisée");
}
