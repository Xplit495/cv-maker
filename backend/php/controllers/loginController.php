<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    require __DIR__ . '/../../../frontend/html/login.html';
    exit;
}

header("Location: /home");
exit;
