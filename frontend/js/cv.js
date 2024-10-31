document.getElementById("profile-photo").addEventListener("click", function() {
    document.getElementById("photo-upload").click();
});

document.getElementById("photo-upload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profile-photo").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

const aboutText = document.querySelector(".about p");
const maxLength = 568;

aboutText.addEventListener("input", function () {
    if (aboutText.innerText.length > maxLength) {
        aboutText.innerText = aboutText.innerText.substring(0, maxLength);
        placeCaretAtEnd(aboutText);
    }
});

function placeCaretAtEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}