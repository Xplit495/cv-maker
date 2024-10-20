const registerSuccess = sessionStorage.getItem('registerSuccess');

console.log('registerSuccess:', registerSuccess);

if (registerSuccess === 'true') {
    const successMessageElement = document.getElementById('success-message');
    successMessageElement.textContent = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
    successMessageElement.style.display = 'block';

    sessionStorage.removeItem('registerSuccess');
}
