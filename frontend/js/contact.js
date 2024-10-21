function initMap(lat, lng) {
    const map = L.map('map', {
        center: [lat, lng],
        zoom: 13,
        zoomAnimation: true,
        fadeAnimation: true,
        markerZoomAnimation: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

    const customIcon = L.icon({
        iconUrl: 'https://media.licdn.com/dms/image/v2/C4D03AQHR1aD3rjB8_w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1610632041398?e=1735171200&v=beta&t=YcLdEFa1LGc6ReAj8Y92DSCFO3XlDVp_tQNc3H7yYgg', // Remplace par ton URL
        iconSize: [50, 50],
        iconAnchor: [25, 38],
        popupAnchor: [0, -38]
    });

    L.marker([lat, lng], { icon: customIcon }).addTo(map)
        .bindPopup('Votre position.')
        .openPopup();
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

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

function checkIfUserIsLoggedIn() {
    const params = new URLSearchParams(window.location.search);

    if (params.get('session') === 'no') {
        const interactionButtons = document.getElementById('interactionButtons');

        while (interactionButtons.children.length > 1) {
            interactionButtons.removeChild(interactionButtons.lastChild);
        }

        const loginButton = document.createElement('a');
        loginButton.href = '/login';
        const loginBtnElement = document.createElement('button');
        loginBtnElement.classList.add('buttons');
        loginBtnElement.textContent = 'Connexion';
        loginButton.appendChild(loginBtnElement);

        const signupButton = document.createElement('a');
        signupButton.href = '/register';
        const signupBtnElement = document.createElement('button');
        signupBtnElement.classList.add('buttons');
        signupBtnElement.textContent = 'Inscription';
        signupButton.appendChild(signupBtnElement);

        interactionButtons.appendChild(loginButton);
        interactionButtons.appendChild(signupButton);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    checkIfUserIsLoggedIn();
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