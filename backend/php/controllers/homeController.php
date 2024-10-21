<?php
session_start();

if (!isset($_SESSION['user_id'])) { // Vérifier si l'utilisateur n'est connecté
    header("Location: /login");
    exit;
}

require __DIR__ . '/../../../frontend/html/home.html';
exit;
