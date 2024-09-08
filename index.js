"use strict";
const form = document.getElementById('personal-info-form');
function handleSubmit(event) {
    var _a;
    event.preventDefault();
    // Clear previous error messages
    clearErrors();
    // Collect values from form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const number = document.getElementById('number').value.trim();
    const education = document.getElementById('education').value.trim();
    const workExperience = document.getElementById('work-experience').value.trim();
    // Validate required fields
    let isValid = true;
    if (!name) {
        showError('name', 'Name is required.');
        isValid = false;
    }
    if (!email || !validateEmail(email)) {
        showError('email', 'A valid email is required.');
        isValid = false;
    }
    if (!number) {
        showError('number', 'Phone number is required.');
        isValid = false;
    }
    if (!education) {
        showError('education', 'Education information is required.');
        isValid = false;
    }
    if (!workExperience) {
        showError('work-experience', 'Work experience is required.');
        isValid = false;
    }
    if (!isValid)
        return; // Stop submission if any field is invalid
    // Collect skills
    const skills = Array.from(document.querySelectorAll('input[name="skills[]"]'))
        .map(input => input.value.trim())
        .filter(skill => skill); // Filter out empty skills
    // Collect image data if available
    const imageFile = (_a = document.getElementById('image-upload').files) === null || _a === void 0 ? void 0 : _a[0];
    let imageDataUrl = '';
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = () => {
            imageDataUrl = reader.result;
            saveDataAndRedirect(name, email, number, education, workExperience, skills, imageDataUrl);
        };
        reader.readAsDataURL(imageFile);
    }
    else {
        saveDataAndRedirect(name, email, number, education, workExperience, skills, imageDataUrl);
    }
}
function saveDataAndRedirect(name, email, number, education, workExperience, skills, imageDataUrl) {
    const resumeData = {
        name,
        email,
        number,
        education,
        workExperience,
        skills,
        image: imageDataUrl
    };
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    window.location.href = 'resume.html'; // Redirect to resume page
}
function toggleSkills() {
    const skillsSection = document.getElementById('skills-section');
    skillsSection.style.display = (skillsSection.style.display === 'none') ? 'block' : 'none';
}
function addSkill() {
    const skillsList = document.getElementById('skills-list');
    const newSkillDiv = document.createElement('div');
    newSkillDiv.classList.add('skill-row');
    newSkillDiv.innerHTML = `
        <input type="text" placeholder="Enter your skill" name="skills[]">
        <button type="button" class="remove-skill-btn" onclick="removeSkill(this)">Remove</button>
    `;
    skillsList.appendChild(newSkillDiv);
}
function removeSkill(button) {
    var _a;
    (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
}
form.addEventListener('submit', handleSubmit);
// Function to show error messages
function showError(inputId, message) {
    var _a;
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.textContent = message;
        (_a = inputElement.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(errorElement);
    }
}
// Helper function to clear error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((msg) => {
        msg.remove();
    });
}
// Email validation function
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
}
