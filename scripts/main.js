/**
 * Enhanced portfolio website JavaScript
 * Author: Fang Liu
 * Version: 3.0 - Modern & Interactive
 */

// Initialize all functions when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initActiveNavLinks();
    initScrollAnimations();
    initProjectFilters();
    initHeaderScroll();
    initParallaxEffects();
    initTypingEffect();
    initSmoothScrolling();
    initLoadingAnimation();
    initCursorEffects();
    initCountUpAnimation();
    if (document.getElementById('date-time-button')) {
        initDateTime();
    }
});

/**
 * Enhanced Theme toggle with smooth transitions
 */
function initThemeToggle() {
    const themeButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeButton.textContent = '☀️ Light';
    } else {
        themeButton.textContent = '🌙 Dark';
    }

    // Toggle theme with animation
    themeButton.addEventListener('click', () => {
        body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        body.classList.toggle('dark-theme');
        
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeButton.textContent = isDark ? '☀️ Light' : '🌙 Dark';
        
        // Add ripple effect
        createRipple(themeButton, event);
    });

    // Check system preference
    if (!savedTheme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.add('dark-theme');
            themeButton.textContent = '☀️ Light';
            localStorage.setItem('theme', 'dark');
        }
    }
}

/**
 * Create ripple effect on buttons
 */
function createRipple(button, event) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

/**
 * Header scroll effects
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for styling
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Parallax scrolling effects
 */
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    const heroContent = hero?.querySelectorAll('h1, p, .hero-buttons');
    
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        hero.style.transform = `translateY(${rate}px)`;
        
        heroContent?.forEach((element, index) => {
            const elementRate = scrolled * -(0.3 + index * 0.1);
            element.style.transform = `translateY(${elementRate}px)`;
        });
    });
}

/**
 * Typing effect for hero title
 */
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);
}

/**
 * Enhanced scroll animations with intersection observer
 */
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.section, .skill-card, .project-card, .hobby-card, .timeline-item, .contact-method-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }, index * 50);
                
                // Count up animation for numbers
                const numbers = entry.target.querySelectorAll('[data-count]');
                numbers.forEach(num => countUp(num));
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => observer.observe(el));
}

/**
 * Count up animation for numbers
 */
function countUp(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Smooth scrolling for all anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 100;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Loading animation
 */
function initLoadingAnimation() {
    // Create loading screen
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">Loading amazing content...</div>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Remove loader when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
}

/**
 * Custom cursor effects
 */
function initCursorEffects() {
    // Only for desktop
    if (window.innerWidth < 768) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const distX = mouseX - cursorX;
        const distY = mouseY - cursorY;
        
        cursorX += distX * 0.1;
        cursorY += distY * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });
}

/**
 * Count up animation for statistics
 */
function initCountUpAnimation() {
    const stats = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                countUp(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

/**
 * Active navigation highlighting
 */
function initActiveNavLinks() {
    const currentPageUrl = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (currentPageUrl.endsWith(linkPath) || 
            (currentPageUrl.includes(linkPath) && linkPath !== 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Enhanced project filtering with animations
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Animate filtering
            projectCards.forEach((card, index) => {
                card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                
                if (filter === 'all') {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.style.display = 'block';
                    }, index * 50);
                } else {
                    const tags = Array.from(card.querySelectorAll('.project-tag')).map(tag => tag.textContent.toLowerCase());
                    
                    if (tags.includes(filter.toLowerCase())) {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                            card.style.display = 'block';
                        }, index * 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 500);
                    }
                }
            });
        });
    });
}

/**
 * Date/Time display functionality
 */
function initDateTime() {
    const dateRadio = document.getElementById('date-radio');
    const timeRadio = document.getElementById('time-radio');
    const button = document.getElementById('date-time-button');
    const output = document.getElementById('date-time-output');

    button.addEventListener('click', () => {
        updateDateTime();
        // Add pulse animation
        output.style.animation = 'pulse 0.5s ease';
        setTimeout(() => output.style.animation = '', 500);
    });

    dateRadio.addEventListener('change', () => {
        if (output.textContent) updateDateTime();
    });

    timeRadio.addEventListener('change', () => {
        if (output.textContent) updateDateTime();
    });

    function updateDateTime() {
        const now = new Date();
        
        if (dateRadio.checked) {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            output.textContent = now.toLocaleDateString('en-US', options);
        } else {
            output.textContent = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            
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
            }
        }
    }

    updateDateTime();
}

// Add CSS for new effects
const style = document.createElement('style');
style.textContent = `
    /* Page Loader */
    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .dark-theme .page-loader {
        background: #0f172a;
    }
    
    .loader-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(14, 165, 233, 0.1);
        border-top-color: #0ea5e9;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    .loader-text {
        margin-top: 20px;
        color: #64748b;
        font-weight: 500;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    /* Custom Cursor */
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid #0ea5e9;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
    }
    
    .cursor-dot {
        width: 6px;
        height: 6px;
        background: #0ea5e9;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
    }
    
    .cursor-hover {
        transform: scale(2);
    }
    
    /* Ripple Effect */
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Enhanced animations */
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    /* Hide cursor on mobile */
    @media (max-width: 768px) {
        .custom-cursor,
        .cursor-dot {
            display: none;
        }
    }
`;
document.head.appendChild(style);