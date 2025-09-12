// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarEffects();
    initMobileMenu();
    initParticleAnimation();
    initCodeAnimation();
    initModuleCards();
    initCounters();
    initTypingEffect();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll('.module-card, .feature-card, .section-header');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Navbar effects on scroll
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Enhanced particle animation
function initParticleAnimation() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 500);
    });
}

// Code animation in hero section
function initCodeAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    let currentLine = 0;

    function animateCode() {
        if (currentLine < codeLines.length) {
            codeLines[currentLine].style.opacity = '0';
            codeLines[currentLine].style.transform = 'translateX(-20px)';
            codeLines[currentLine].style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                codeLines[currentLine].style.opacity = '1';
                codeLines[currentLine].style.transform = 'translateX(0)';
                currentLine++;
                setTimeout(animateCode, 1000);
            }, 100);
        } else {
            // Restart animation after delay
            setTimeout(() => {
                currentLine = 0;
                codeLines.forEach(line => {
                    line.style.opacity = '0';
                    line.style.transform = 'translateX(-20px)';
                });
                setTimeout(animateCode, 500);
            }, 3000);
        }
    }

    // Start animation after page load
    setTimeout(animateCode, 1000);
}

// Module cards hover effects
function initModuleCards() {
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        });
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-title .gradient-text');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (i < originalText.length) {
            titleElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 500);
}

// Button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const particles = document.querySelectorAll('.particle');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    particles.forEach((particle, index) => {
        const speed = 0.5 + (index * 0.1);
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(26, 26, 26, 0.98);
        backdrop-filter: blur(20px);
        padding: 2rem;
        border-top: 1px solid rgba(0, 212, 255, 0.2);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Console log for debugging
console.log('🚀 AI Coding Landing Page loaded successfully!');
console.log('✨ All animations and interactions are ready!');
