<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: /login");
    exit;
}

require __DIR__ . '/../../../frontend/html/projects.html';
exit;
