<?php
session_start();

$queryString = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);

if (isset($_SESSION['user_id']) || $queryString === 'session=no') {
    require __DIR__ . '/../../../frontend/html/contact.html';
    exit;
}

header("Location: /contact?session=no");
require __DIR__ . '/../../../frontend/html/contact.html';
exit;



