<?php
header('Content-Type: application/json');

$pdo = require_once '../dbConnect.php';

// Fonction pour envoyer des réponses JSON
function sendJsonResponse($status, $message) {
    echo json_encode(['status' => $status, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse('error', 'Méthode de requête non autorisée');
}

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

// Fonction pour générer un UUID V4
function generateUuidV4(): string
{
    try {
        $data = random_bytes(16);
    } catch (Exception $e) {
        sendJsonResponse('error', 'Erreur lors de la génération d\'octets aléatoires : ' . $e->getMessage());
    }

    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

    return sprintf('%s-%s-%s-%s-%s',
        bin2hex(substr($data, 0, 4)),
        bin2hex(substr($data, 4, 2)),
        bin2hex(substr($data, 6, 2)),
        bin2hex(substr($data, 8, 2)),
        bin2hex(substr($data, 10, 6))
    );
}
