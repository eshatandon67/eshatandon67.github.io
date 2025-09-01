// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add click handlers to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const sectionId = href.substring(1); // Remove the '#'
        scrollToSection(sectionId);
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .skill-category, .certification-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('scroll-animate', 'show');
        }
    });
}

// Initialize scroll animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Butterfly animation enhancement
function createFloatingButterflies() {
    const butterflyContainer = document.querySelector('.butterfly-animation');
    if (!butterflyContainer) return;

    // Add random movement to existing butterflies
    const butterflies = document.querySelectorAll('.butterfly');
    
    butterflies.forEach((butterfly, index) => {
        // Add random delays and durations
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 4;
        
        butterfly.style.animationDelay = `${randomDelay}s`;
        butterfly.style.animationDuration = `${randomDuration}s`;
        
        // Add hover effect
        butterfly.addEventListener('mouseenter', () => {
            butterfly.style.transform = 'scale(1.2)';
            butterfly.style.transition = 'transform 0.3s ease';
        });
        
        butterfly.addEventListener('mouseleave', () => {
            butterfly.style.transform = 'scale(1)';
        });
    });
}

// Initialize butterfly animations
document.addEventListener('DOMContentLoaded', createFloatingButterflies);

// Parallax effect for hero section
function parallaxEffect() {
    const hero = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

window.addEventListener('scroll', parallaxEffect);

// Typing effect for hero title
function typeWriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let i = 0;
    function typing() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typing, 100);
        }
    }
    
    // Start typing after a delay
    setTimeout(typing, 1000);
}

// Card hover effects
function initCardEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Button click effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .action-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Skill level animation
function animateSkillLevels() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevel = item.querySelector('.skill-level');
                    if (skillLevel) {
                        skillLevel.style.opacity = '0';
                        skillLevel.style.transform = 'translateX(20px)';
                        
                        setTimeout(() => {
                            skillLevel.style.transition = 'all 0.5s ease';
                            skillLevel.style.opacity = '1';
                            skillLevel.style.transform = 'translateX(0)';
                        }, 200);
                    }
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(item);
    });
}

// Contact form interactions (if adding a form later)
function initContactInteractions() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', () => {
            const icon = method.querySelector('.method-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        method.addEventListener('mouseleave', () => {
            const icon = method.querySelector('.method-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    initCardEffects();
    initButtonEffects();
    animateSkillLevels();
    initContactInteractions();
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(128, 19, 54, 0.6);
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
        
        .btn, .action-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});

// Lazy loading for images (if images are added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Throttle scroll events
function throttle(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(animateOnScroll, 100));
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// Add smooth reveal animations for sections
function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });
}

// Initialize section reveal on load
window.addEventListener('load', () => {
    initSectionReveal();
    // Remove typing effect and use fade-in instead for better performance
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
        heroTitle.style.animation = 'fadeInUp 1s ease forwards';
    }
});

// Add easter egg - konami code for butterfly explosion
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        createButterflyExplosion();
    }
});

function createButterflyExplosion() {
    const body = document.body;
    
    for (let i = 0; i < 20; i++) {
        const butterfly = document.createElement('div');
        butterfly.innerHTML = '<i class="fas fa-butterfly"></i>';
        butterfly.style.position = 'fixed';
        butterfly.style.color = '#801336';
        butterfly.style.fontSize = '2rem';
        butterfly.style.pointerEvents = 'none';
        butterfly.style.zIndex = '9999';
        butterfly.style.left = Math.random() * window.innerWidth + 'px';
        butterfly.style.top = Math.random() * window.innerHeight + 'px';
        butterfly.style.animation = `float 2s ease-in-out infinite, fadeOut 3s ease forwards`;
        
        body.appendChild(butterfly);
        
        setTimeout(() => {
            butterfly.remove();
        }, 3000);
    }
    
    // Add fadeOut animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; }
            70% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        style.remove();
    }, 3000);
}
