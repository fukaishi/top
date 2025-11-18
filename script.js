// Load and display projects from JSON file
async function loadProjects() {
    const container = document.getElementById('projects-container');

    // Show loading state
    container.innerHTML = '<div class="loading">Loading projects</div>';

    try {
        const response = await fetch('sites.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projects = await response.json();

        // Clear loading state
        container.innerHTML = '';

        // Create project cards
        projects.forEach((project, index) => {
            const card = createProjectCard(project, index);
            container.appendChild(card);
        });

        // Add intersection observer for scroll animations
        observeCards();

    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = `
            <div class="loading" style="color: #ff6b6b;">
                Failed to load projects. Please check the console for details.
            </div>
        `;
    }
}

// Create a project card element
function createProjectCard(project, index) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;

    // Project name
    const name = document.createElement('h2');
    name.className = 'project-name';
    name.textContent = project.name;

    // Project description
    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.description;

    // Links container
    const linksContainer = document.createElement('div');
    linksContainer.className = 'project-links';

    // Website link
    if (project.url) {
        const siteLink = createLink(
            project.url,
            '🌐',
            'Visit Site',
            'site-link'
        );
        linksContainer.appendChild(siteLink);
    }

    // Repository link
    if (project.repository) {
        const repoLink = createLink(
            project.repository,
            '📦',
            'Repository',
            'repo-link'
        );
        linksContainer.appendChild(repoLink);
    }

    // Assemble card
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(linksContainer);

    // Add hover effect sound (optional - commented out)
    // card.addEventListener('mouseenter', () => playHoverSound());

    return card;
}

// Create a link element
function createLink(url, icon, text, className = '') {
    const link = document.createElement('a');
    link.href = url;
    link.className = `project-link ${className}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'link-icon';
    iconSpan.textContent = icon;

    const textSpan = document.createElement('span');
    textSpan.className = 'link-text';
    textSpan.textContent = text;

    link.appendChild(iconSpan);
    link.appendChild(textSpan);

    // Add ripple effect on click
    link.addEventListener('click', (e) => {
        createRipple(e, link);
    });

    return link;
}

// Create ripple effect on click
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple';

    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Observe cards for scroll animations
function observeCards() {
    const cards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    cards.forEach(card => {
        observer.observe(card);
    });
}

// Add parallax effect to background
function addParallaxEffect() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const stars1 = document.querySelector('.stars');
                const stars2 = document.querySelector('.stars2');
                const stars3 = document.querySelector('.stars3');

                if (stars1) stars1.style.transform = `translateY(${scrolled * 0.5}px)`;
                if (stars2) stars2.style.transform = `translateY(${scrolled * 0.3}px)`;
                if (stars3) stars3.style.transform = `translateY(${scrolled * 0.1}px)`;

                ticking = false;
            });

            ticking = true;
        }
    });
}

// Add mouse move effect for cards
function addMouseMoveEffect() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `
                translateY(-15px)
                scale(1.02)
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    addParallaxEffect();

    // Add mouse move effect after cards are loaded
    setTimeout(() => {
        addMouseMoveEffect();
    }, 1000);
});

// Optional: Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const cards = Array.from(document.querySelectorAll('.project-card'));
    const focused = document.activeElement;
    const currentIndex = cards.indexOf(focused);

    if (e.key === 'ArrowDown' && currentIndex < cards.length - 1) {
        e.preventDefault();
        cards[currentIndex + 1].focus();
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        cards[currentIndex - 1].focus();
    }
});
