const lastName = document.getElementById('nom-display')
const firstName = document.getElementById('prenom-display')
const email = document.getElementById('email-display')

fetch('/backend/php/services/usersInformations/getUserInformations.php', {
    method: 'POST'
})
    .then(response => response.json())
    .then(data => {
        if (data.status === 'error') {
            console.log(data.message)
        } else if (data.status === 'success') {
            lastName.textContent = data.message.last_name
            firstName.textContent = data.message.first_name
            email.textContent = data.message.email
        }
    })
    .catch(error => {
        console.error('Erreur :', error);
    });


function activateEditMode(field, displayElementId) {
    const errorMessage = document.getElementById('error-message');

    const displayElement = document.getElementById(displayElementId);
    const oldValue = displayElement.textContent;

    const editButton = document.querySelector(`#edit-${field}`);
    editButton.style.display = 'none';

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = oldValue;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Enregistrer';
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Annuler';

    displayElement.replaceWith(inputElement);
    inputElement.after(saveButton);
    saveButton.after(cancelButton);

    cancelButton.addEventListener('click', function() {
        inputElement.replaceWith(displayElement);
        saveButton.remove();
        cancelButton.remove();
        editButton.style.display = 'inline';
    });

    saveButton.addEventListener('click', function() {
        const newValue = inputElement.value;

        const formData = new FormData();
        formData.append('field', field);
        formData.append('value', newValue);

        fetch('/backend/php/services/usersInformations/modifyUserInformations.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    location.reload();
                } else {
                    console.log('Erreur : ' + data.message);
                    errorMessage.textContent = data.message;
                    errorMessage.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Erreur :', error);
                errorMessage.textContent = 'Une erreur est survenue lors de la modification.';
                errorMessage.style.display = 'block';
            });
    });
}

document.getElementById('edit-last_name').addEventListener('click', function() {
    activateEditMode('last_name', 'nom-display');
});

document.getElementById('edit-first_name').addEventListener('click', function() {
    activateEditMode('first_name', 'prenom-display');
});

document.getElementById('edit-email').addEventListener('click', function() {
    activateEditMode('email', 'email-display');
});

document.getElementById('edit-password').addEventListener('click', function() {
    activateEditMode('password', 'password-display');
});
