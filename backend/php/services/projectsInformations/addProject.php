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

if (!$title || !$description || !$githubLink) {
    echo json_encode(['status' => 'error', 'message' => 'Tous les champs sont obligatoires.']);
    exit;
}

$uploadDir = __DIR__ . '/../../data/uploads/';
$imagePaths = [];

if (isset($_FILES['image'])) {
    foreach ($_FILES['image']['tmp_name'] as $key => $tmpName) {
        $extension = pathinfo($_FILES['image']['name'][$key], PATHINFO_EXTENSION);

        $uniqueName = $userId . '_' . time() . '_' . uniqid() . '.' . $extension;

        $targetPath = $uploadDir . $uniqueName;

        if (move_uploaded_file($tmpName, $targetPath)) {
            $imagePaths[] = $targetPath;
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Échec du téléchargement d\'une ou plusieurs images.']);
            exit;
        }
    }
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO projects (user_id, title, description, github_link, images)
        VALUES (:user_id, :title, :description, :github_link, :images)
    ");
    $stmt->bindParam(':user_id', $userId);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':github_link', $githubLink);
    $imageString = implode(',', $imagePaths);
    $stmt->bindParam(':images', $imageString);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Projet ajouté avec succès !']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'ajout du projet.']);
    }

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur de base de données : ' . $e->getMessage()]);
}
