///////////////////////////////////////////////////////// Dynamic form /////////////////////////////////////////////////////////
const darkerOverlay = document.getElementById("darker");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const githubInput = document.getElementById("github");
const imageSection = document.getElementById("imageSection");
const modal = document.getElementById("modal");
const errorMessageElement = document.getElementById('error-message');
const successMessageElement = document.getElementById('success-message');

document.getElementById("buttonAddProject").addEventListener("click", () => {
    darkerOverlay.style.display = "flex";
    titleInput.focus();
});

document.getElementById("closeModal").addEventListener("click", () => {
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
        document.getElementById("descriptionSection").style.display = "flex";
        modal.style.height = "35vh";
        descriptionInput.focus();
    }
});

descriptionInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && (modal.style.height !== "70vh")) {
        event.preventDefault();
        document.getElementById("githubSection").style.display = "flex";
        modal.style.height = "50vh";
        githubInput.focus();
    }
});

githubInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        imageSection.style.display = "flex";
        document.getElementById("submitSection").style.display = "flex";
        modal.style.height = "70vh";
        imageSection.querySelector("input").focus();
    }
});
///////////////////////////////////////////////////////// Dynamic form /////////////////////////////////////////////////////////

/////////////////////////////////////////////////////// Add project form ///////////////////////////////////////////////////////
document.getElementById('addProjectForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!githubInput.value.includes("github.com")) {
        displayErrorMessage("Le lien GitHub doit être valide.");
        return;
    }

    const formData = new FormData(this);

    fetch('/backend/php/services/projectsInformations/addProject.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                displaySuccessMessage(data.message);
                setTimeout(() => {location.reload()}, 2000);
            } else {
                console.error(data.message);
                displayErrorMessage(data.message);
            }
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi du projet :', error);
            displayErrorMessage("Une erreur s'est survenue. Veuillez réessayer plus tard.");
        });
});
/////////////////////////////////////////////////////// Add project form ///////////////////////////////////////////////////////

/////////////////////////////////////////////////////// Display projects ///////////////////////////////////////////////////////
function fetchProjects() {
    fetch('/backend/php/services/projectsInformations/getProjects.php')  // Assurez-vous que le chemin est correct
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                displayProjects(data.projects);
            } else {
                console.error(data.message);
                displayErrorMessage(data.message);
            }
        })
        .catch(error => {
            console.error('Erreur de connexion au serveur :', error);
        });
}

function displayProjects(projects) {
    const projectContainer = document.getElementById('projectContainer');

    projectContainer.innerHTML = '';

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');

        // Affiche les informations du projet
        projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.github_link}" target="_blank">Voir le projet sur GitHub</a>
            ${displayImages(project.images)}
        `;

        projectContainer.appendChild(projectElement);
    });
}

function displayImages(imageString) {
    if (!imageString) return '';

    const images = imageString.split(',');  // Suppose que les images sont séparées par des virgules
    console.log(images);
    return images.map(image => `<img src="${image}" alt="Project Image" class="project-image">`).join('');
}

function displayErrorMessage(message) {

    modal.style.height = "75vh";
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
}

function displaySuccessMessage(message) {
    modal.style.height = "75vh";
    successMessageElement.textContent = message;
    successMessageElement.style.display = 'block';
}

fetchProjects();
/////////////////////////////////////////////////////// Display projects ///////////////////////////////////////////////////////
