<?php
session_start();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Curriculum Vitae Maker | Login</title>
    <link rel="stylesheet" href="../CSS/loginPage.css">
    <link rel="stylesheet" href="../CSS/main.css">
</head>

<body>

<div id="wrapper">
    <div class="container">
        <div class="heading">Connexion</div>

        <?php if (isset($_SESSION['success_message'])): ?>
            <div class="success-notification">
                <?= $_SESSION['success_message']; ?>
            </div>
            <?php unset($_SESSION['success_message']);?>
        <?php endif; ?>

        <form action="../PHP/login.php" method="POST" class="form">
            <label for="email">
                <input required autofocus class="input" type="email" name="email" id="email" placeholder="E-mail">
            </label>
            <label for="password">
                <input required class="input" type="password" name="password" id="password" placeholder="Mot de passe">
            </label>
            <input class="login-button" type="submit" value="Se connecter">
        </form>
    </div>
</div>

</body>
</html>
