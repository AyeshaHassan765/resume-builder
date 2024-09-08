"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Function to populate the resume page with data from localStorage
function populateResume() {
    // Retrieve the resume data from localStorage
    const resumeDataString = localStorage.getItem('resumeData');
    if (!resumeDataString) {
        // Handle case where there is no data
        console.error('No resume data found in localStorage.');
        return;
    }
    // Parse the resume data
    const resumeData = JSON.parse(resumeDataString);
    // Populate the resume elements with the data
    const nameElement = document.getElementById('resume-name');
    const emailElement = document.getElementById('resume-email');
    const phoneElement = document.getElementById('resume-phone');
    const educationElement = document.getElementById('resume-education');
    const workExperienceElement = document.getElementById('resume-work-experience');
    const skillsElement = document.getElementById('resume-skills');
    const imageElement = document.getElementById('resume-image');
    // Set the resume data
    nameElement.textContent = resumeData.name;
    emailElement.textContent = resumeData.email;
    phoneElement.textContent = resumeData.number;
    educationElement.textContent = resumeData.education;
    workExperienceElement.textContent = resumeData.workExperience;
    // Populate skills
    skillsElement.innerHTML = '';
    resumeData.skills.forEach(skill => {
        const skillItem = document.createElement('li');
        skillItem.textContent = skill;
        skillsElement.appendChild(skillItem);
    });
    // Set the profile image if available
    if (resumeData.image) {
        imageElement.src = resumeData.image;
    }
    else {
        imageElement.src = ''; // Set a default or placeholder image if necessary
    }
}
// Call the function to populate the resume when the page loads
window.onload = populateResume;
// Get HTML elements
const downloadButton = document.getElementById('download-resume');
const shareButton = document.getElementById('share-resume');
const editButton = document.getElementById('edit-resume');
// Download resume as PDF
downloadButton.addEventListener('click', () => {
    var _a;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const name = document.getElementById('resume-name').textContent || '';
    const email = document.getElementById('resume-email').textContent || '';
    const phone = document.getElementById('resume-phone').textContent || '';
    const education = document.getElementById('resume-education').textContent || '';
    const workExperience = document.getElementById('resume-work-experience').textContent || '';
    const skills = Array.from(((_a = document.getElementById('resume-skills')) === null || _a === void 0 ? void 0 : _a.children) || [])
        .map((li) => li.textContent || '')
        .join(', ');
    doc.text(`Name: ${name}`, 10, 10);
    doc.text(`Email: ${email}`, 10, 20);
    doc.text(`Phone: ${phone}`, 10, 30);
    doc.text(`Education: ${education}`, 10, 40);
    doc.text(`Work Experience: ${workExperience}`, 10, 50);
    doc.text(`Skills: ${skills}`, 10, 60);
    doc.save('resume.pdf');
});
// Share resume link
shareButton.addEventListener('click', () => {
    const username = 'john.doe'; // Example username
    const resumeLink = `https://example.com/resume/${username}`;
    alert(`Share this link: ${resumeLink}`);
});
// Make resume sections editable
editButton.addEventListener('click', () => {
    const editable = document.querySelectorAll('.resume-section p, .resume-section ul');
    editable.forEach(element => {
        if (element.isContentEditable) {
            element.contentEditable = 'false';
            element.style.border = 'none';
        }
        else {
            element.contentEditable = 'true';
            element.style.border = '1px solid #000';
        }
    });
});
