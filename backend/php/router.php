<?php

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($path) {
    case '/':
        require '../../frontend/html/index.html';  // Page d'accueil
        break;
    case '/login':
        require '../../frontend/html/login.html';  // Page de connexion
        break;
    case '/register':
        require '../../frontend/html/register.html';  // Page d'inscription
        break;
    default:
        http_response_code(404);
        echo '404 - Page not found';
        break;
}
