<?php
session_start();

if (!isset($_SESSION['user_id'])) { // Vérifier si l'utilisateur n'est connecté
    require __DIR__ . '/../../../frontend/html/register.html';
    exit;
}

header("Location: /home");
exit;
