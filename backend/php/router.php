<?php

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($path) {
    case '/':
        require 'controllers/indexController.php';
        break;
    case '/login':
        require 'controllers/loginController.php';
        break;
    case '/register':
        require 'controllers/registerController.php';
        break;
    case '/logout':
        require 'controllers/logoutController.php';
        break;
    case '/home':
        require 'controllers/homeController.php';
        break;
    case '/cv':
        require 'controllers/cvController.php';
        break;
    case '/contact':
        require 'controllers/contactController.php';
        exit;
    case '/settings':
        require 'controllers/settingsController.php';
        break;
    case '/projects':
        require 'controllers/projectsController.php';
        break;

    default:
        require '../../frontend/html/404.html';
        break;
}
