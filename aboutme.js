// About Me - Enhanced JavaScript with Elegant Animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initScrollRevealAnimations();
    initCounterAnimations();
    initParallaxEffect();
    initGalleryLightbox();
    initSmoothScrolling();
    initHoverAnimations();
    initTimelineAnimations();
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
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const elementsToAnimate = document.querySelectorAll(`
        .intro-card,
        .journey-card,
        .timeline-item,
        .skills-card,
        .pillar,
        .manifesto-card,
        .stat-item,
        .gallery-item
    `);

    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Counter animation for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const countUp = (element, target) => {
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (number) {
                    element.textContent = '0' + (text.includes('+') ? '+' : '');
                    countUp(element, number);
                    counterObserver.unobserve(element);
                }
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Subtle parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.about-hero');
    if (!hero) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
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
    // Timeline badges floating animation
    const timelineBadges = document.querySelectorAll('.timeline-badge');
    timelineBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.2)';
        });

        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        });
    });

    // Skills icons subtle animation
    const skillIcons = document.querySelectorAll('.skill-icon');
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.filter = 'brightness(1.2)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.filter = 'brightness(1)';
        });
    });

    // Card tilt effect
    const cards = document.querySelectorAll('.intro-card, .journey-card, .pillar');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

// Timeline progressive reveal
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                
                // Animate achievement highlights within the timeline item
                const highlights = entry.target.querySelectorAll('.achievement-highlight');
                highlights.forEach((highlight, index) => {
                    setTimeout(() => {
                        highlight.style.opacity = '1';
                        highlight.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Set initial state for achievement highlights
        const highlights = item.querySelectorAll('.achievement-highlight');
        highlights.forEach(highlight => {
            highlight.style.opacity = '0';
            highlight.style.transform = 'translateY(20px)';
            highlight.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        timelineObserver.observe(item);
    });
}

// Gallery lightbox with enhanced animations
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox-overlay';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                cursor: pointer;
                backdrop-filter: blur(10px);
            `;

            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 15px;
                box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
                transform: scale(0.7) rotate(5deg);
                transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            `;

            // Close button
            const closeBtn = document.createElement('div');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = `
                position: absolute;
                top: 30px;
                right: 30px;
                color: white;
                font-size: 40px;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.3s ease;
                user-select: none;
            `;

            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.opacity = '1';
            });

            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.opacity = '0.7';
            });

            lightbox.appendChild(lightboxImg);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);

            // Animate in
            setTimeout(() => {
                lightbox.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1) rotate(0deg)';
            }, 10);

            // Close handlers
            const closeLightbox = () => {
                lightbox.style.opacity = '0';
                lightboxImg.style.transform = 'scale(0.7) rotate(-5deg)';
                setTimeout(() => {
                    if (document.body.contains(lightbox)) {
                        document.body.removeChild(lightbox);
                    }
                    document.body.style.overflow = 'auto';
                }, 400);
            };

            lightbox.addEventListener('click', closeLightbox);
            closeBtn.addEventListener('click', closeLightbox);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';

            // Close on escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        });
    });
}

// Add enhanced CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .gallery-item {
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .gallery-item:hover {
        transform: translateY(-5px);
    }

    .skill-icon {
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .timeline-badge {
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .intro-card,
    .journey-card,
    .pillar {
        transition: transform 0.3s ease;
        transform-style: preserve-3d;
    }

    /* Floating animation for special elements */
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }

    .pillar-number {
        animation: float 6s ease-in-out infinite;
    }

    /* Responsive: Disable complex animations on mobile */
    @media (max-width: 768px) {
        .intro-card,
        .journey-card,
        .pillar {
            transform: none !important;
        }
        
        .pillar-number {
            animation: none;
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