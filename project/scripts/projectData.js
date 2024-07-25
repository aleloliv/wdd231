export async function fetchProjects() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        localStorage.setItem('projects', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        const storedProjects = localStorage.getItem('projects');
        return storedProjects ? JSON.parse(storedProjects) : [];
    }
}
