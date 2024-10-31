let fullName

fetch('/backend/php/services/usersInformations/getUserInformations.php', {
    method: 'POST'
})
    .then(response => response.json())
    .then(data => {
        if (data.status === 'error') {
            console.log(data.message)
        } else if (data.status === 'success') {
            fullName = data.message.last_name + '_' + data.message.first_name
            document.getElementById('full-name').textContent = data.message.last_name + ' ' + data.message.first_name
            document.getElementById('emailText').textContent = data.message.email
        }
    })
    .catch(error => {
        console.error('Erreur :', error);
    });

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

document.getElementById("downloadButton").addEventListener("click", function() {
    const cvContainer = document.querySelector(".cv-container");

    html2canvas(cvContainer, {
        scale: 5,
        useCORS: true,
    }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        pdf.save(fullName + "_CV.pdf");
    });
});
