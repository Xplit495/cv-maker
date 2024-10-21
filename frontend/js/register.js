document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const errorMessageElement = document.getElementById('error-message');
    const passwordField = document.getElementById('password');

    fetch('/backend/php/services/auth/registerService.php', {
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
                sessionStorage.setItem('registerSuccess', 'true');
                window.location.href = '/login';
            }
        })
        .catch(error => {
            console.error('Erreur :', error);
            errorMessageElement.textContent = "Une erreur inattendue s'est produite. Veuillez réessayer.";
            errorMessageElement.style.display = 'block';
        });
});
