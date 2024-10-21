<?php
session_start();

if (!isset($_SESSION['user_id'])) { // Vérifier si l'utilisateur n'est pas connecté
    require __DIR__ . '/../../../frontend/html/index.html';
    exit;
}

header("Location: /home");
exit;
