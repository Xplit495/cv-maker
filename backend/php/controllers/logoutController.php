<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: /login");
    exit;
}

require __DIR__ . '/../services/auth/logoutService.php';
require __DIR__ . '/../../../frontend/html/logoutSuccess.html';
exit;
