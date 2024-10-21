document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Construire l'URL mailto avec les données
    // Rediriger l'utilisateur vers le lien mailto
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