// Contact Page - Enhanced JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all contact page features
    initScrollRevealAnimations();
    initFormValidation();
    initFormSubmission();
    initParallaxEffect();
    initSmoothScrolling();
    initHoverAnimations();
    initTypingEffect();
});

// Smooth scrolling for internal links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll reveal animations
function initScrollRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const elementsToAnimate = document.querySelectorAll(`
        .form-container,
        .info-container,
        .info-card,
        .quick-contact-card,
        .contact-header
    `);

    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(el);
    });
}

// Subtle parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.contact-hero');
    if (!hero) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        
        hero.style.transform = `translateY(${rate}px)`;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Enhanced hover animations
function initHoverAnimations() {
    // Info cards floating animation
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(255, 255, 255, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Social links animation
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });

    // Form inputs focus animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.contact-hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '3px solid rgba(255, 255, 255, 0.8)';
    
    let i = 0;
    const speed = 100;

    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    }

    // Start typing effect after a delay
    setTimeout(typeWriter, 500);
}

// Form validation
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');
        
        clearFieldError(field);

        if (isRequired && !value) {
            showFieldError(field, 'Este campo é obrigatório');
            return false;
        }

        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Por favor, insira um e-mail válido');
                return false;
            }
        }

        if (fieldType === 'tel' && value) {
            const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Por favor, insira um telefone válido');
                return false;
            }
        }

        showFieldSuccess(field);
        return true;
    }

    function showFieldError(field, message) {
        const formGroup = field.parentElement;
        const existingError = formGroup.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);

        field.style.borderColor = '#ff6b6b';
        field.style.background = 'rgba(255, 107, 107, 0.1)';
    }

    function showFieldSuccess(field) {
        field.style.borderColor = '#51cf66';
        field.style.background = 'rgba(81, 207, 102, 0.1)';
    }

    function clearFieldError(field) {
        const formGroup = field.parentElement;
        const existingError = formGroup.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }

        field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        field.style.background = 'rgba(255, 255, 255, 0.05)';
    }
}

// Form submission with loading animation
function initFormSubmission() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showNotification('Por favor, corrija os erros antes de enviar', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Hide loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Show success message
            showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            
            // Reset form
            form.reset();
            
            // Clear field styles
            inputs.forEach(input => {
                input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                input.style.background = 'rgba(255, 255, 255, 0.05)';
            });

        }, 2000);
    });

    // Helper function for field validation (reused from initFormValidation)
    function validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');
        
        clearFieldError(field);

        if (isRequired && !value) {
            showFieldError(field, 'Este campo é obrigatório');
            return false;
        }

        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Por favor, insira um e-mail válido');
                return false;
            }
        }

        if (fieldType === 'tel' && value) {
            const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Por favor, insira um telefone válido');
                return false;
            }
        }

        return true;
    }

    function showFieldError(field, message) {
        const formGroup = field.parentElement;
        const existingError = formGroup.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);

        field.style.borderColor = '#ff6b6b';
        field.style.background = 'rgba(255, 107, 107, 0.1)';
    }

    function clearFieldError(field) {
        const formGroup = field.parentElement;
        const existingError = formGroup.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }

        field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        field.style.background = 'rgba(255, 255, 255, 0.05)';
    }
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add enhanced CSS for animations and notifications
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .error-message {
        font-family: 'Inter', sans-serif;
        font-size: 0.8rem;
        color: #ff6b6b;
        margin-top: 5px;
        opacity: 0;
        animation: fadeInError 0.3s ease forwards;
    }

    @keyframes fadeInError {
        to {
            opacity: 1;
        }
    }

    .notification {
        position: fixed;
        top: 30px;
        right: 30px;
        background: rgba(81, 207, 102, 0.95);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        max-width: 350px;
    }

    .notification.error {
        background: rgba(255, 107, 107, 0.95);
    }

    .notification.show {
        transform: translateX(0);
    }

    /* Enhanced form styling */
    .form-group {
        transition: transform 0.2s ease;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        transform: scale(1.02);
    }

    /* Floating animation for contact cards */
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }

    .info-card:nth-child(odd) {
        animation: float 6s ease-in-out infinite;
    }

    .info-card:nth-child(even) {
        animation: float 6s ease-in-out infinite 1s;
    }

    /* Responsive: Disable complex animations on mobile */
    @media (max-width: 768px) {
        .info-card {
            animation: none !important;
        }
        
        .notification {
            top: 20px;
            right: 20px;
            left: 20px;
            transform: translateY(-100px);
            max-width: none;
        }
        
        .notification.show {
            transform: translateY(0);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        * {
            animation: none !important;
            transition: none !important;
        }
    }
`;

document.head.appendChild(style); 