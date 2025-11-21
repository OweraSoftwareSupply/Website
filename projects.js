// Load and display projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('/projects.json');
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function displayProjects(projects) {
    const container = document.getElementById('projects-container');
    container.innerHTML = ''; // Clear existing content

    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        container.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    // Create main card container as a clickable link
    const card = document.createElement('a');
    card.href = `/Pages/Project.html?id=${project.id}`;
    card.className = 'flex flex-col gap-6 max-w-xs w-full bg-navy border border-light-navy py-6 px-6 rounded-lg hover:border-white hover:cursor-pointer transition-colors';

    // Create header section with service type and title
    const header = document.createElement('div');
    header.className = 'flex flex-col items-start justify-center gap-3';

    const serviceTypeBadge = document.createElement('div');
    serviceTypeBadge.className = 'flex justify-start items-center bg-sky text-white text-sm font-bold px-2 py-1 rounded-lg w-fit';
    const serviceTypeText = document.createElement('p');
    serviceTypeText.textContent = project.serviceType;
    serviceTypeBadge.appendChild(serviceTypeText);

    const title = document.createElement('h1');
    title.className = 'text-white text-lg sm:text-2xl font-bold';
    title.textContent = project.title;

    header.appendChild(serviceTypeBadge);
    header.appendChild(title);

    // Create content section with description and skills
    const content = document.createElement('div');
    content.className = 'flex flex-col items-start justify-center gap-3';

    const description = document.createElement('p');
    description.className = 'text-gray-300 text-md';
    description.textContent = project.description;

    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'flex justify-start items-center gap-4 flex-wrap';

    project.skills.forEach(skill => {
        const skillBadge = document.createElement('div');
        skillBadge.className = 'flex justify-start items-center bg-navy text-white text-sm font-bold px-2 py-1 border border-light-navy rounded-lg w-fit';
        const skillText = document.createElement('p');
        skillText.textContent = skill;
        skillBadge.appendChild(skillText);
        skillsContainer.appendChild(skillBadge);
    });

    content.appendChild(description);
    content.appendChild(skillsContainer);

    // Assemble the card
    card.appendChild(header);
    card.appendChild(content);

    return card;
}

// Load projects when page loads
document.addEventListener('DOMContentLoaded', loadProjects);
