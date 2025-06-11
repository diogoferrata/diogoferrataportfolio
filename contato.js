// Contact Page - Enhanced JavaScript - Optimized Version

// Utilities object to hold reusable functions
const ContactUtils = {
    // Form validation utilities
    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');
        
        this.clearFieldError(field);

        if (isRequired && !value) {
            this.showFieldError(field, 'Este campo é obrigatório');
            return false;
        }

        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Por favor, insira um e-mail válido');
                return false;
            }
        }

        if (fieldType === 'tel' && value) {
            const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
            if (!phoneRegex.test(value)) {
                this.showFieldError(field, 'Por favor, insira um telefone válido');
                return false;
            }
        }

        this.showFieldSuccess(field);
        return true;
    },

    showFieldError(field, message) {
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
    },

    showFieldSuccess(field) {
        field.style.borderColor = '#51cf66';
        field.style.background = 'rgba(81, 207, 102, 0.1)';
    },

    clearFieldError(field) {
        const formGroup = field.parentElement;
        const existingError = formGroup.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }

        field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        field.style.background = 'rgba(255, 255, 255, 0.05)';
    },

    // Throttle function for performance
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all contact page features
    initScrollRevealAnimations();
    initFormValidation();
    initFormSubmission();
    initParallaxEffect();
    initSmoothScrolling();
    initHoverAnimations();
    initTypingEffect();
    initMobileOptimizations();
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

// Optimized scroll reveal animations
function initScrollRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Remove observer after animation
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
        el.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Optimized parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.contact-hero');
    if (!hero) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.15; // Reduced for better performance
        
        hero.style.transform = `translate3d(0, ${rate}px, 0)`; // Use translate3d for hardware acceleration
        ticking = false;
    }

    const throttledParallax = ContactUtils.throttle(() => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, 16); // ~60fps

    window.addEventListener('scroll', throttledParallax, { passive: true });
}

// Enhanced hover animations with performance optimization
function initHoverAnimations() {
    // Only apply hover effects on non-touch devices
    if (!window.matchMedia('(hover: none)').matches) {
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
        socialLinks.forEach((link, index) => {
            link.addEventListener('mouseenter', function() {
                const rotation = 5 + (index * 2);
                this.style.transform = `translateY(-3px) scale(1.1) rotate(${rotation}deg)`;
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            });
        });
    }

    // Form inputs focus animation (works on all devices)
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

// Optimized typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.contact-hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '3px solid rgba(255, 255, 255, 0.8)';
    
    let i = 0;
    const speed = 80; // Slightly faster

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

// Optimized form validation using utilities
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            ContactUtils.validateField(this);
        });

        input.addEventListener('input', ContactUtils.throttle(function() {
            ContactUtils.clearFieldError(this);
        }, 300)); // Throttle input events
    });
}

// Optimized form submission using utilities
function initFormSubmission() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields using utility function
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!ContactUtils.validateField(input)) {
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
                ContactUtils.clearFieldError(input);
            });

        }, 2000);
    });
}

// Mobile-specific optimizations
function initMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Disable complex animations on mobile
        document.body.classList.add('mobile-device');
        
        // Reduce parallax intensity on mobile
        const hero = document.querySelector('.contact-hero');
        if (hero) {
            hero.style.backgroundAttachment = 'scroll';
        }
        
        // Optimize form for mobile
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            // Prevent zoom on iOS when focusing inputs
            input.style.fontSize = '16px';
        });
    }
}

// Enhanced notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-text">${message}</span>
        </div>
    `;

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

// Enhanced CSS with mobile optimizations
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
        to { opacity: 1; }
    }

    /* Enhanced notification system */
    .notification {
        position: fixed;
        top: 30px;
        right: 30px;
        background: rgba(81, 207, 102, 0.95);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 500;
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

    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .notification-icon {
        font-size: 1.1rem;
        font-weight: bold;
    }

    /* Enhanced form styling */
    .form-group {
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        transform: scale(1.01);
    }

    /* Optimized floating animation */
    @keyframes floatSubtle {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3px); }
    }

    .info-card:nth-child(odd) {
        animation: floatSubtle 4s ease-in-out infinite;
    }

    .info-card:nth-child(even) {
        animation: floatSubtle 4s ease-in-out infinite 1s;
    }

    /* Loading button animation */
    .submit-btn.loading {
        pointer-events: none;
        opacity: 0.7;
    }

    .submit-btn.loading::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-left: 10px;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    /* Mobile optimizations */
    @media (max-width: 768px) {
        .mobile-device .info-card {
            animation: none !important;
        }
        
        .notification {
            top: 20px;
            right: 20px;
            left: 20px;
            transform: translateY(-100px);
            max-width: none;
            font-size: 0.85rem;
            padding: 12px 16px;
        }
        
        .notification.show {
            transform: translateY(0);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            transform: none; /* Disable scale on mobile */
        }
    }

    @media (max-width: 480px) {
        .notification {
            top: 15px;
            right: 15px;
            left: 15px;
            font-size: 0.8rem;
            padding: 10px 14px;
        }
    }

    /* Accessibility and performance */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation: none !important;
            transition: none !important;
        }
        
        .notification {
            transition: none !important;
        }
    }

    /* Touch device optimizations */
    @media (hover: none) and (pointer: coarse) {
        .info-card:hover,
        .social-link:hover {
            transform: none !important;
        }
    }
`;

document.head.appendChild(style); 