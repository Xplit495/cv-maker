<?php
header('Content-Type: application/json');
session_start();

$pdo = require_once '../../dbConnect.php';

try {
    $stmt = $pdo->query("SELECT * FROM projects ORDER BY created_at DESC");
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 'success', 'projects' => $projects]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la récupération des projets : ' . $e->getMessage()]);
}
