document.addEventListener("DOMContentLoaded", () => {
    const buttonAddProject = document.getElementById("buttonAddProject");
    const darkerOverlay = document.getElementById("darker");
    const closeModalButton = document.getElementById("closeModal");
    const titleInput = document.getElementById("title");
    const descriptionSection = document.getElementById("descriptionSection");
    const descriptionInput = document.getElementById("description");
    const githubSection = document.getElementById("githubSection");
    const githubInput = document.getElementById("github");
    const imageSection = document.getElementById("imageSection");
    const submitSection = document.getElementById("submitSection");
    const modal = document.getElementById("modal");

    buttonAddProject.addEventListener("click", () => {
        darkerOverlay.style.display = "flex";
        titleInput.focus();
    });

    closeModalButton.addEventListener("click", () => {
        darkerOverlay.style.display = "none";
    });

    darkerOverlay.addEventListener("click", (event) => {
        if (event.target === darkerOverlay) {
            darkerOverlay.style.display = "none";
        }
    });

    titleInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && (modal.style.height !== "50vh" && modal.style.height !== "70vh")) {
            event.preventDefault();
            descriptionSection.style.display = "flex";
            modal.style.height = "35vh";
            descriptionInput.focus();
        }
    });

    descriptionInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && (modal.style.height !== "70vh")) {
            event.preventDefault();
            githubSection.style.display = "flex";
            modal.style.height = "50vh";
            githubInput.focus();
        }
    });

    githubInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            imageSection.style.display = "flex";
            submitSection.style.display = "flex";
            modal.style.height = "70vh";
            imageSection.querySelector("input").focus();
        }
    });

    document.getElementById('addProjectForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const errorMessageElement = document.getElementById('error-message');
        const successMessageElement = document.getElementById('success-message');

        if (!githubInput.value.includes("github.com")) {
            alert('Le lien GitHub doit être un lien vers un dépôt GitHub.');
            return;
        }

        const formData = new FormData(this)
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        fetch('/backend/php/services/projectInformations/addProject.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    modal.style.height = "75vh";
                    successMessageElement.textContent = data.message;
                    successMessageElement.style.display = 'block';
                    setTimeout(() => {location.reload()
                    }, 2000);
                } else {
                    console.error(data.message);
                    modal.style.height = "75vh";
                    errorMessageElement.textContent = data.message;
                    errorMessageElement.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi du projet :', error);
                modal.style.height = "75vh";
                errorMessageElement.textContent = "Une erreur inattendue s'est produite. Veuillez réessayer.";
                errorMessageElement.style.display = 'block';
            });
    });

});
