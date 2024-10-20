<?php
require_once __DIR__ . '/../utils.php';

// Démarrer la session pour accéder aux variables de session
session_start();

if (!isset($_SESSION['user_id'])) { // Vérifier si l'utilisateur n'est pas connecté
    require __DIR__ . '/../../../frontend/html/index.html';
    exit;
}

header("Location: /dashboard");
require __DIR__ . '/../../../frontend/html/dashboard.html';
