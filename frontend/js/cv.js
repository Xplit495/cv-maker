// JavaScript pour la mise à jour dynamique

// Mise à jour du prénom
document.getElementById('first-name-input').addEventListener('input', function() {
    document.getElementById('first-name').textContent = this.value;
});

// Mise à jour du nom
document.getElementById('last-name-input').addEventListener('input', function() {
    document.getElementById('last-name').textContent = this.value;
});

// Mise à jour de l'email
document.getElementById('email-input').addEventListener('input', function() {
    document.getElementById('email').textContent = this.value;
});

// Mise à jour de la photo de profil
document.getElementById('profile-pic-input').addEventListener('change', function() {
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('profile-pic').src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
});