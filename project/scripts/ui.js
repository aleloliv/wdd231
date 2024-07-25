export function displayProjects(projects) {
    const projectShowcase = document.getElementById('project-showcase');
    projectShowcase.innerHTML = '';

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        
        const imagesHTML = project.images
            .map(image => `<img src="images/${image}" alt="${project.name}">`)
            .join('');

        const projectInfoHTML = `
            <div class="project-info">
                <h3>${project.name}</h3>
                <p><strong>Category:</strong> ${project.category}</p>
                <p><strong>Location:</strong> ${project.location}</p>
                <p>${project.description}</p>
                <button class="show-modal" data-index="${index}">More Info</button>
            </div>
        `;

        projectCard.innerHTML = imagesHTML + projectInfoHTML;
        projectShowcase.appendChild(projectCard);
    });

    addModalEventListeners(projects);
}

function addModalEventListeners(projects) {
    const modalButtons = document.querySelectorAll('.show-modal');
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            showModal(projects[index]);
        });
    });
}

function showModal(project) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h3>${project.name}</h3>
            <p><strong>Category:</strong> ${project.category}</p>
            <p><strong>Location:</strong> ${project.location}</p>
            <p>${project.description}</p>
            ${project.images.map(image => `<img src="images/${image}" alt="${project.name}">`).join('')}
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-button').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}
