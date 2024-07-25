const currentyear = document.querySelector("#currentyear");

const today = new Date();

currentyear.textContent = today.getFullYear();

let oLastModif = new Date(document.lastModified);

const lastModified = document.querySelector("#lastModified");

function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
}

// Define project data directly in JavaScript
const projects = [
    {
        name: "Project 1",
        category: "Electrical Engineering",
        location: "São Paulo, Brazil",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        images: ["plan-engineering-1440-900.webp", "electric-engineering-3481-2500.webp"]
    },
    {
        name: "Project 2",
        category: "Structural Engineering",
        location: "New York, USA",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        images: ["plan-engineering-1440-900.webp", "electric-engineering-3481-2500.webp"]
    },
    {
        name: "Project 3",
        category: "Structural Engineering",
        location: "London, UK",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        images: ["plan-engineering-1440-900.webp", "electric-engineering-3481-2500.webp"]
    },
    {
        name: "Project 4",
        category: "Civil Engineering",
        location: "Paris, France",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        images: ["plan-engineering-1440-900.webp", "electric-engineering-3481-2500.webp"]
    },
    {
        name: "Project 5",
        category: "Mechanical Engineering",
        location: "Berlin, Germany",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        images: ["plan-engineering-1440-900.webp", "electric-engineering-3481-2500.webp"]
    },
    {
        name: "Project 6",
        category: "Environmental Engineering",
        location: "Tokyo, Japan",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        images: ["plan-engineering-1440-900.webp", "electric-engineering-3481-2500.webp"]
    },
    {
        name: "Project 7",
        category: "Aerospace Engineering",
        location: "Moscow, Russia",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        images: ["plan-engineering-1440-900.webp", "electric-engineering-3481-2500.webp"]
    },
    {
        name: "Project 8",
        category: "Software Engineering",
        location: "San Francisco, USA",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        images: ["plan-engineering-1440-900.webp", "electric-engineering-3481-2500.webp"]
    }
];

// Check if projects data exists in localStorage
const storedProjects = localStorage.getItem("projects");

// If not, store projects data in localStorage
if (!storedProjects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

document.addEventListener("DOMContentLoaded", function () {
    const projectsFromLocalStorage = JSON.parse(localStorage.getItem("projects"));
    if (projectsFromLocalStorage) {
        displayProjects(projectsFromLocalStorage);
    } else {
        console.error("No projects found in localStorage.");
    }
});

function displayProjects(projects) {
    const projectShowcase = document.getElementById("project-showcase");
    projectShowcase.innerHTML = "";

    projects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        const imagesHTML = project.images
            .map((image) => `<img src="images/${image}" alt="${project.name}">`)
            .join("");

        const projectInfoHTML = `
            <div class="project-info">
                <h3>${project.name}</h3>
                <p><strong>Category:</strong> ${project.category}</p>
                <p><strong>Location:</strong> ${project.location}</p>
                <p>${project.description}</p>
            </div>
        `;

        projectCard.innerHTML = imagesHTML + projectInfoHTML;
        projectShowcase.appendChild(projectCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.navigation');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show-navigation');
    });
});