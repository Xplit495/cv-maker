<?php

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($path) {
    case '/':
        require 'controllers/indexController.php';  // Page d'accueil
        break;
    case '/login':
        require 'controllers/loginController.php';  // Page de connexion
        break;
    case '/register':
        require 'controllers/registerController.php';  // Page d'inscription
        break;
    case '/dashboard':
        require 'controllers/dashboardController.php';  // Page du dashboard
        break;

    default:
        require '../../frontend/html/404.html';  // Page 404
        break;
}
