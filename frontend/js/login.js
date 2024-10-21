// To check if the user just create an account and display a success message
const registerSuccess = sessionStorage.getItem('registerSuccess');

if (registerSuccess === 'true') {
    const successMessageElement = document.getElementById('success-message');
    successMessageElement.textContent = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
    successMessageElement.style.display = 'block';

    sessionStorage.removeItem('registerSuccess');
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    const formData = new FormData(this);
    const errorMessageElement = document.getElementById('error-message');
    const passwordField = document.getElementById('password');

    fetch('/backend/php/services/auth/loginService.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'error') {
                errorMessageElement.textContent = data.message;
                errorMessageElement.style.display = 'block';
                passwordField.value = '';
            } else if (data.status === 'success') {
                window.location.href = '/home';
            }
        })
        .catch(error => {
            console.error('Erreur :', error);
            errorMessageElement.textContent = "Une erreur inattendue s'est produite. Veuillez réessayer.";
            errorMessageElement.style.display = 'block';
        });
});