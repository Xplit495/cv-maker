// Fonction pour initialiser la carte et afficher la position de l'utilisateur
function initMap(lat, lng) {
    // Créer une carte centrée sur la position de l'utilisateur
    const map = L.map('map').setView([lat, lng], 13);

    // Charger les tuiles de la carte à partir d'OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Ajouter un marqueur à la position de l'utilisateur
    L.marker([lat, lng]).addTo(map)
        .bindPopup('Vous êtes ici.')
        .openPopup();
}

// Fonction pour obtenir la position de l'utilisateur
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                // Initialiser la carte avec la position de l'utilisateur
                initMap(lat, lng);
            },
            (error) => {
                console.error('Erreur de géolocalisation :', error);
                alert("Impossible de récupérer votre position. Veuillez activer la géolocalisation.");
            }
        );
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
}

// Appeler la fonction de géolocalisation au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    getUserLocation();

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        window.location.href = `mailto:quentin19330@gmail.com
    ?subject=${encodeURIComponent(subject)}
    &body=${encodeURIComponent(
            'Nom : ' + name + '\n' +
            'Email : ' + email + '\n\n' +
            'Message : ' + message
        )}`;
    });
});


//Code for a future mail sending system
// document.getElementById('contactForm').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevents the page from reloading when the form is submitted
//
//     const formData = new FormData(this);
//     const errorMessageElement = document.getElementById('error-message');
//     const successMessageElement = document.getElementById('success-message');
//
//     fetch('/backend/php/services/contactService.php', {
//         method: 'POST',
//         body: formData
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data.status === 'error') {
//                 errorMessageElement.textContent = data.message;
//                 errorMessageElement.style.display = 'block';
//             } else if (data.status === 'success') {
//                 successMessageElement.textContent = 'Votre message a bien été envoyé.';
//                 successMessageElement.style.display = 'block';
//                 this.reset();
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             errorMessageElement.textContent = "An unexpected error occurred. Please try again.";
//             errorMessageElement.style.display = 'block';
//         })
// });