// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Ждем загрузки компонентов
    setTimeout(() => {
        // Initialize all functionality
        initScrollAnimations();
        initNavbarEffects();
        initParticleAnimation();
        initCodeAnimation();
        initModuleCards();
        initCounters();
        initTypingEffect();
        initWhatsAppButtons();
        initFAQ();
    }, 100);
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
                
                // Special animation for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.animation = 'slideInFromBottom 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                }
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll('.module-card, .feature-card, .section-header');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Enhanced feature cards animations
    initFeatureCardsAnimations();
}

// Enhanced feature cards animations
function initFeatureCardsAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = `
                0 25px 50px rgba(0, 212, 255, 0.25),
                0 0 0 1px rgba(0, 212, 255, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `;
            
            // Animate icon
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.animation = 'iconPulse 0.6s ease-in-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            
            // Reset icon animation
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-10px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            }, 150);
        });
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

// Mobile menu toggle (удалено - теперь в components.js)

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
    const modules = document.querySelector('.modules');
    
    if (hero) {
        // Hero section moves slower than scroll, creating parallax effect
        // But it should go under modules section
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.zIndex = '1';
    }
    
    if (modules) {
        // Modules section stays in place but has glass effect
        modules.style.zIndex = '10';
    }
    
    particles.forEach((particle, index) => {
        const speed = 0.3 + (index * 0.05);
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
    
`;
document.head.appendChild(style);


// WhatsApp Button Enhancement
function initWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    
    whatsappButtons.forEach(button => {
        // Add click tracking
        button.addEventListener('click', function(e) {
            // Track the click event
            console.log('📱 WhatsApp button clicked');
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Check if it's mobile device
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                // For mobile, try to open WhatsApp app directly
                const phoneNumber = '37444343000';
                const message = encodeURIComponent('Բարև! Ցանկանում եմ գրանցվել AI Coding դասընթացի համար և սկսել սովորել ծրագրավորում AI-ի օգնությամբ 🚀');
                
                // Try WhatsApp app first, fallback to web
                const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
                const webUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                
                // Create a temporary link to test if WhatsApp app is available
                const tempLink = document.createElement('a');
                tempLink.href = whatsappUrl;
                tempLink.style.display = 'none';
                document.body.appendChild(tempLink);
                
                // Try to open WhatsApp app
                tempLink.click();
                
                // Fallback to web version after a short delay
                setTimeout(() => {
                    window.open(webUrl, '_blank');
                }, 1000);
                
                document.body.removeChild(tempLink);
            }
        });
        
        // Add hover effects specific to WhatsApp
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 15px 35px rgba(0, 212, 255, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.4)';
        });
    });
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Console log for debugging
console.log('🚀 AI Coding Landing Page loaded successfully!');
console.log('✨ All animations and interactions are ready!');
console.log('📱 WhatsApp buttons enhanced for mobile optimization!');
console.log('❓ FAQ functionality loaded!');
