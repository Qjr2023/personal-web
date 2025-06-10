/**
 * Streamlined Portfolio JavaScript
 * Focus on essential functionality for job search portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initActiveNavigation();
    initAnimations();
    initDynamicBackground();
    initParallaxEffects();
});

/**
 * Smooth scrolling for anchor links
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
 * Highlight active navigation link
 */
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

/**
 * Simple fade-in animations on scroll
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Animate sections
    const elementsToAnimate = document.querySelectorAll('.section, .skill-category, .project-card, .timeline-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add header shadow on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

/**
 * Initialize dynamic background effects
 */
function initDynamicBackground() {
    // Create tech particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'tech-particles';
    
    // Create floating tech particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'tech-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
    
    // Create matrix rain effect for sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            const matrixBg = document.createElement('div');
            matrixBg.className = 'tech-bg';
            matrixBg.style.zIndex = '0';
            section.style.position = 'relative';
            section.appendChild(matrixBg);
        }
    });
    
    // Add cyber grid animation
    const cyberGrid = document.createElement('canvas');
    cyberGrid.id = 'cyber-grid';
    cyberGrid.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.03;
    `;
    document.body.appendChild(cyberGrid);
    
    // Initialize cyber grid animation
    initCyberGrid(cyberGrid);
}

/**
 * Cyber grid animation
 */
function initCyberGrid(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const gridSize = 50;
    const nodes = [];
    
    // Create grid nodes
    for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
            if (Math.random() > 0.8) {
                nodes.push({
                    x: x,
                    y: y,
                    radius: Math.random() * 3 + 1,
                    pulse: Math.random() * Math.PI * 2
                });
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.2)';
        ctx.lineWidth = 1;
        
        nodes.forEach((node, i) => {
            // Find nearby nodes
            nodes.forEach((otherNode, j) => {
                if (i !== j) {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < gridSize * 2) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.stroke();
                    }
                }
            });
            
            // Draw nodes
            node.pulse += 0.02;
            const radius = node.radius + Math.sin(node.pulse) * 0.5;
            
            ctx.fillStyle = 'rgba(14, 165, 233, 0.5)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

/**
 * Parallax effects for sections
 */
function initParallaxEffects() {
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        sections.forEach((section, index) => {
            const rate = scrolled * -0.5;
            const yPos = -(scrolled * 0.01 * (index + 1));
            
            // Apply subtle parallax to alternating sections
            if (index % 2 === 0) {
                section.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
    
    // Mouse move gradient effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.body.style.setProperty('--mouse-x', x);
        document.body.style.setProperty('--mouse-y', y);
    });
}