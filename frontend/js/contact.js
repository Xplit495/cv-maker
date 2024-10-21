// Fonction pour initialiser la carte et afficher la position de l'utilisateur
function initMap(lat, lng) {
    // Créer une carte centrée sur la position de l'utilisateur avec des animations fluides
    const map = L.map('map', {
        center: [lat, lng],
        zoom: 13,
        zoomAnimation: true, // Animation fluide activée
        fadeAnimation: true, // Animation de fondu activée
        markerZoomAnimation: true // Animation fluide des marqueurs activée
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

    const customIcon = L.icon({
        iconUrl: 'https://media.licdn.com/dms/image/v2/C4D03AQHR1aD3rjB8_w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1610632041398?e=1735171200&v=beta&t=YcLdEFa1LGc6ReAj8Y92DSCFO3XlDVp_tQNc3H7yYgg', // Remplace par ton URL
        iconSize: [50, 50], // Taille de l'icône
        iconAnchor: [25, 38], // Point d'ancrage de l'icône
        popupAnchor: [0, -38] // Position du popup par rapport à l'icône
    });

    // Ajouter un marqueur personnalisé à la position de l'utilisateur
    L.marker([lat, lng], { icon: customIcon }).addTo(map)
        .bindPopup('Votre position.')
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
getUserLocation();

// Code for sending an email with the user's email client
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