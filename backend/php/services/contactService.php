<?php
//Code for a future mail sending system

//header('Content-Type: application/json');
//
//if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
//    header("Location: /404");
//    exit;
//}
//
//require_once '../utils.php';
//
//$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS );
//$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
//$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_SPECIAL_CHARS);
//$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);
//
//if (empty($name) || empty($email) || empty($message)) {
//    sendJsonResponse('error', 'Veuillez remplir tous les champs.');
//}
//
//if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//    sendJsonResponse('error', 'Adresse mail invalide.');
//}
//
//try {
//    $to = 'quentin19330@gmail.com';
//
//    $email_message = "Nom: $name\n";
//    $email_message .= "Email: $email\n";
//    $email_message .= "Message:\n$message\n";
//
//// En-têtes de l'email
//    $headers = "From: $email\r\n" .
//        "Reply-To: $email\r\n" .
//        "X-Mailer: PHP/" . phpversion().
//        "Content-Type: text/plain; charset=utf-8\r\n".
//        "X-Priority: 1\r\n";
//
//    if (mail($to, $subject, $email_message, $headers)) {
//        sendJsonResponse('success', 'Votre message a bien été envoyé !');
//    } else {
//        sendJsonResponse('error', 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.');
//    }
//} catch (Exception $e) {
//    sendJsonResponse('error', 'Erreur lors de l\'envoi du message : ' . $e->getMessage());
//}