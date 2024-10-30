<?php
header('Content-Type: application/json');
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: /404");
    exit;
}

$pdo = require_once '../../dbConnect.php';
require_once '../../utils.php';

$userId = $_SESSION['user_id'];
$title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_SPECIAL_CHARS);
$description = filter_input(INPUT_POST, 'description', FILTER_SANITIZE_SPECIAL_CHARS);
$githubLink = filter_input(INPUT_POST, 'github', FILTER_VALIDATE_URL);

if (!$title || !$description || !$githubLink || !isset($_FILES['image'])) {
    echo json_encode(['status' => 'error', 'message' => 'Tous les champs sont obligatoires.']);
    exit;
}

if (strlen($title) > 25) {
    echo json_encode(['status' => 'error', 'message' => 'Le titre ne doit pas dépasser 25 caractères.']);
    exit;
}

if (strlen($description) > 90){
    echo json_encode(['status' => 'error', 'message' => 'La description ne doit pas dépasser 90 caractères.']);
    exit;
}

$headers = @get_headers($githubLink);
if (!($headers && strpos($headers[0], '200'))) {
    echo json_encode(['status' => 'error', 'message' => "Le lien GitHub n'existe pas."]);
    exit;
}

$tmpName = $_FILES['image']['tmp_name'];
$extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
$uniqueName = $userId . '_' . time() . '_' . uniqid() . '.' . $extension;
$targetPath = __DIR__ . '/../../../data/uploads/' . $uniqueName;

if (move_uploaded_file($tmpName, $targetPath)) {
    $imagePath = 'uploads/' . $uniqueName;
} else {
    echo json_encode(['status' => 'error', 'message' => 'Échec du téléchargement de l\'image.']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO projects (user_id, title, description, github_link, image)
        VALUES (:user_id, :title, :description, :github_link, :image)
    ");
    $stmt->bindParam(':user_id', $userId);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':github_link', $githubLink);
    $stmt->bindParam(':image', $imagePath);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Projet ajouté avec succès !']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'ajout du projet.']);
    }

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur de base de données : ' . $e->getMessage()]);
}
