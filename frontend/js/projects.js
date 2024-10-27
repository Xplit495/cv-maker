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
    const submitButton = document.getElementById("submitButton");
    const modal = document.getElementById("modal");

    // Afficher la modale au clic sur le bouton "Ajouter un projet"
    buttonAddProject.addEventListener("click", () => {
        darkerOverlay.style.display = "flex";
        titleInput.focus();
    });

    // Fermer la modale au clic sur la croix de fermeture
    closeModalButton.addEventListener("click", () => {
        darkerOverlay.style.display = "none";
    });

    // Fermer la modale si l'utilisateur clique en dehors de celle-ci
    darkerOverlay.addEventListener("click", (event) => {
        if (event.target === darkerOverlay) {
            darkerOverlay.style.display = "none";
        }
    });

    // Afficher le champ de description quand l'utilisateur appuie sur Entrée dans le champ du titre
    titleInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Empêche la soumission du formulaire
            descriptionSection.style.display = "flex"; // Affiche la section description
            modal.style.height = "35vh"; // Augmente la hauteur de la modale
            descriptionInput.focus(); // Place le focus dans le champ description
        }
    });

    // Afficher le champ GitHub quand l'utilisateur appuie sur Entrée dans le champ description
    descriptionInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Empêche la soumission du formulaire
            githubSection.style.display = "flex"; // Affiche la section GitHub
            modal.style.height = "50vh"; // Augmente la hauteur de la modale
            githubInput.focus(); // Place le focus dans le champ GitHub
        }
    });

    // Afficher le champ image quand l'utilisateur appuie sur Entrée dans le champ GitHub
    githubInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Empêche la soumission du formulaire
            imageSection.style.display = "flex"; // Affiche la section image
            submitSection.style.display = "flex"; // Affiche la section de soumission
            modal.style.height = "70vh"; // Augmente la hauteur de la modale
            imageSection.querySelector("input").focus(); // Place le focus dans le champ image
        }
    });
});
