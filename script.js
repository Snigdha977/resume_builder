document.addEventListener("DOMContentLoaded", function () {
    const formElements = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),
        skills: document.getElementById("skills"),
        experience: document.getElementById("experience"),
        projects: document.getElementById("projects") // New Projects input field
    };

    const previewElements = {
        name: document.getElementById("preview-name"),
        email: document.getElementById("preview-email"),
        phone: document.getElementById("preview-phone"),
        skills: document.getElementById("preview-skills"),
        experience: document.getElementById("preview-experience"),
        projects: document.getElementById("preview-projects") // New Projects preview section
    };

    function updatePreview() {
        previewElements.name.textContent = formElements.name.value;
        previewElements.email.textContent = formElements.email.value;
        previewElements.phone.textContent = formElements.phone.value;
        previewElements.skills.textContent = formElements.skills.value;
        previewElements.experience.textContent = formElements.experience.value;
        previewElements.projects.innerHTML = formElements.projects.value
            .split("\n")
            .map(project => {
                const match = project.match(/\[(.*?)\]\((.*?)\)/);
                if (match) {
                    return `<a href="${match[2]}" target="_blank" class="text-blue-500">${match[1]}</a>`;
                }
                return `<p>${project}</p>`;
            })
            .join("");
    }

    Object.values(formElements).forEach(input => {
        input.addEventListener("input", updatePreview);

    });
});
document.getElementById("download-btn").addEventListener("click", function () {
    const resume = document.querySelector(".border.p-4.rounded");
    html2canvas(resume).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10);
        pdf.save("resume.pdf");
    });
});

