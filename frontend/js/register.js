document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    const formData = new FormData(this);
    const errorMessageElement = document.getElementById('error-message');

    fetch('/backend/php/services/registerService.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'error') {
                errorMessageElement.textContent = data.message;
                errorMessageElement.style.display = 'block';
            } else if (data.status === 'success') {
                sessionStorage.setItem('registerSuccess', 'true'); // Enregistre une variable dans le sessionStorage
                window.location.href = '/login';
            }
        })
        .catch(error => {
            console.error('Erreur :', error);
            errorMessageElement.textContent = "Une erreur inattendue s'est produite. Veuillez réessayer.";
            errorMessageElement.style.display = 'block';
        });
});
