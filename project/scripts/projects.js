import { fetchProjects } from './projectData.js';
import { displayProjects } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
    const projects = await fetchProjects();
    if (projects.length > 0) {
        displayProjects(projects);
    } else {
        console.error('No projects found.');
    }

    const currentyear = document.querySelector("#currentyear");
    const today = new Date();
    currentyear.textContent = today.getFullYear();

    const lastModified = document.querySelector("#lastModified");
    lastModified.textContent = `Last Modified: ${new Date(document.lastModified).toLocaleDateString()}`;
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.navigation');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show-navigation');
    });
});

