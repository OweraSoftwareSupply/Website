// Load and display individual project details
async function loadProject() {
    try {
        // Get project ID from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');
        
        if (!projectId) {
            showError('No project specified');
            return;
        }

        // Fetch projects data
        const response = await fetch('/projects.json');
        const projects = await response.json();
        
        // Find the specific project
        const project = projects.find(p => p.id === projectId);
        
        if (!project) {
            showError('Project not found');
            return;
        }

        // Display the project
        displayProject(project);
        
        // Update page title
        document.title = `${project.title} - Owera Software Supply`;
        
    } catch (error) {
        console.error('Error loading project:', error);
        showError('Failed to load project');
    }
}

function displayProject(project) {
    const container = document.getElementById('project-container');
    container.innerHTML = ''; // Clear loading message

    // Create title
    const title = document.createElement('h1');
    title.className = 'text-white font-semibold text-2xl sm:text-3xl md:text-4xl';
    title.textContent = project.title;

    // Create service type badge
    const serviceTypeBadge = document.createElement('div');
    serviceTypeBadge.className = 'flex justify-start items-center bg-sky text-white text-sm font-bold px-3 py-1 rounded-lg w-fit -mt-2';
    const serviceTypeText = document.createElement('p');
    serviceTypeText.textContent = project.serviceType;
    serviceTypeBadge.appendChild(serviceTypeText);

    // Create video container
    const videoContainer = document.createElement('div');
    videoContainer.className = 'w-full aspect-video rounded-lg overflow-hidden border border-light-navy bg-dark-navy';
    
    const iframe = document.createElement('iframe');
    
    // Convert YouTube watch URL to embed URL.
    let videoUrl = project.videoLink;
    if (videoUrl) {
        try {
            const url = new URL(videoUrl);
            // pathname will be like '/VIDEO_ID'
            const videoId = url.pathname.substring(1); 
            if (videoId) {
                videoUrl = `https://www.youtube.com/embed/${videoId}`;
            }
        } catch (e) {
            console.error('Error parsing youtu.be URL:', e);
        }
    }

    iframe.src = videoUrl;
    iframe.className = 'w-full h-full';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', 'true');
    videoContainer.appendChild(iframe);

    // Create skills container
    const skillsLabel = document.createElement('h2');
    skillsLabel.className = 'text-white font-semibold text-xl sm:text-2xl mt-2';
    skillsLabel.textContent = 'Catagories';

    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'flex justify-start items-center gap-4 flex-wrap -mt-4';

    project.skills.forEach(skill => {
        const skillBadge = document.createElement('div');
        skillBadge.className = 'flex justify-start items-center bg-navy text-white text-sm font-bold px-3 py-2 border border-light-navy rounded-lg w-fit';
        const skillText = document.createElement('p');
        skillText.textContent = skill;
        skillBadge.appendChild(skillText);
        skillsContainer.appendChild(skillBadge);
    });

    // Create description
    const descriptionLabel = document.createElement('h2');
    descriptionLabel.className = 'text-white font-semibold text-xl sm:text-2xl mt-2';
    descriptionLabel.textContent = 'About This Project';

    const description = document.createElement('p');
    description.className = 'text-gray-300 text-base sm:text-lg leading-relaxed -mt-4';
    description.textContent = project.description;

    // Assemble the content
    container.appendChild(title);
    container.appendChild(serviceTypeBadge);
    container.appendChild(videoContainer);
    container.appendChild(descriptionLabel);
    container.appendChild(description);
    container.appendChild(skillsLabel);
    container.appendChild(skillsContainer);
}

function showError(message) {
    const container = document.getElementById('project-container');
    container.innerHTML = `
        <div class="flex flex-col items-center justify-center w-full py-12 gap-4">
            <i class="fas fa-exclamation-triangle text-sky text-4xl"></i>
            <p class="text-white text-xl">${message}</p>
            <a href="/Pages/Projects.html" class="text-sky hover:underline">Return to Projects</a>
        </div>
    `;
}

// Load project when page loads
document.addEventListener('DOMContentLoaded', loadProject);
