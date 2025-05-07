/**
 * Enhanced portfolio website JavaScript
 * Author: Fang Liu
 * Version: 2.0
 */

// Initialize all functions when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    if (document.getElementById('date-time-button')) {
        initDateTime();
    }
    initActiveNavLinks();
    initScrollAnimations();
    initProjectFilters();
});

/**
 * Theme toggle function - handles dark/light mode switching
 */
function initThemeToggle() {
    const themeButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeButton.textContent = 'Light Mode';
    } else {
        themeButton.textContent = 'Dark Mode';
    }

    // Toggle theme on button click
    themeButton.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeButton.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    });

    // Also check for system preference if no saved preference
    if (!savedTheme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.add('dark-theme');
            themeButton.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        }
    }
}

/**
 * Date/Time display functionality
 */
function initDateTime() {
    const dateRadio = document.getElementById('date-radio');
    const timeRadio = document.getElementById('time-radio');
    const button = document.getElementById('date-time-button');
    const output = document.getElementById('date-time-output');

    // Show date/time on button click
    button.addEventListener('click', () => {
        updateDateTime();
    });

    // Also update when radio selection changes
    dateRadio.addEventListener('change', () => {
        if (output.textContent) {
            updateDateTime();
        }
    });

    timeRadio.addEventListener('change', () => {
        if (output.textContent) {
            updateDateTime();
        }
    });

    // Function to update date/time display
    function updateDateTime() {
        const now = new Date();
        if (dateRadio.checked) {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            output.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
        } else {
            output.textContent = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            
            // For time, update every second
            if (timeRadio.checked) {
                clearInterval(window.timeInterval);
                window.timeInterval = setInterval(() => {
                    const updatedTime = new Date();
                    output.textContent = updatedTime.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                    });
                }, 1000);
            } else {
                clearInterval(window.timeInterval);
            }
        }
    }

    // Show date by default on page load
    updateDateTime();
}

/**
 * Highlight active page in navigation
 */
function initActiveNavLinks() {
    const currentPageUrl = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if the current page matches this nav link
        if (currentPageUrl.endsWith(linkPath)) {
            link.classList.add('active');
        } else if (currentPageUrl.includes('/pages/') && linkPath === '../index.html' && currentPageUrl.endsWith('index.html')) {
            link.classList.add('active');
        } else if (!currentPageUrl.includes('/pages/') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
}

/**
 * Add scroll animations to elements
 */
function initScrollAnimations() {
    // Add animation classes to elements as they scroll into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section, .skill-card, .project-card, .hobby-card, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Add animation class when element is in viewport
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animation class to first elements on page load
    setTimeout(animateOnScroll, 100);
    
    // Add animation class on scroll
    window.addEventListener('scroll', animateOnScroll);
}

/**
 * Project filtering functionality (for projects page)
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filter = button.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const tags = card.querySelectorAll('.project-tag');
                        let hasTag = false;
                        
                        tags.forEach(tag => {
                            if (tag.textContent.toLowerCase() === filter.toLowerCase()) {
                                hasTag = true;
                            }
                        });
                        
                        if (hasTag) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});