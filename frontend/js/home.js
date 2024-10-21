const userName = document.getElementById('userName');

fetch('/backend/php/services/getUserInformations.php', {
    method: 'POST'
})
    .then(response => response.json())
    .then(data => {
        if (data.status === 'error') {
            userName.textContent = data.message;
        } else if (data.status === 'success') {
            userName.textContent = data.message.last_name + ' ' + data.message.first_name;
        }
    })
    .catch(error => {
        console.error('Erreur :', error);
        userName.textContent = "Une erreur inattendue s'est produite. Veuillez réessayer.";
        userName.style.display = 'block';
    });
