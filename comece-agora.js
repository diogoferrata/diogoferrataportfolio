// ====================================================
// PÁGINA COMECE AGORA - DIOGO FERRATA
// ====================================================

// Aguardar carregamento da página
window.addEventListener('load', function() {
    // Inicializar todas as funcionalidades da página
    initScrollRevealAnimations();
    initHoverAnimations();
    initParallaxEffect();
    initSmoothScrolling();
    initScrollHeaderEffect();
    // initServiceCardAnimations(); // Removido - sem animação
    initTimelineAnimations();
    initCTAAnimations();
});

// ====================================================
// 1. ANIMAÇÕES DE SCROLL REVEAL
// ====================================================
function initScrollRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos para animação de reveal
    const elementsToReveal = document.querySelectorAll(`
        .start-why-choose-header,
        .why-choose-card,
        .start-timeline-header,
        .timeline-content,
        .start-cta-content
    `);

    elementsToReveal.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// ====================================================
// 2. ANIMAÇÕES DE HOVER ELEGANTES
// ====================================================
function initHoverAnimations() {
    // Animações dos cards de serviço - REMOVIDAS conforme solicitado
    // const serviceCards = document.querySelectorAll('.service-card');
    // serviceCards.forEach(card => { ... });

    // Animações dos cards de diferenciais
    const whyChooseCards = document.querySelectorAll('.why-choose-card');
    whyChooseCards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.03)';
            this.style.background = 'rgba(255, 255, 255, 0.06)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            
            // Animar badges/features
            const badges = this.querySelectorAll('.experience-badges span, .tech-stack span, .support-features span');
            badges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.style.transform = 'translateY(-2px)';
                    badge.style.background = 'rgba(255, 255, 255, 0.15)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.02)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            
            const badges = this.querySelectorAll('.experience-badges span, .tech-stack span, .support-features span');
            badges.forEach(badge => {
                badge.style.transform = 'translateY(0)';
                badge.style.background = 'rgba(255, 255, 255, 0.1)';
            });
        });
    });

    // Animações dos botões CTA
    const ctaButtons = document.querySelectorAll('.hero-cta-btn, .cta-main-btn');
    ctaButtons.forEach(btn => {
        btn.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(255, 255, 255, 0.3)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = this.classList.contains('primary') ? 
                '0 8px 25px rgba(255, 255, 255, 0.2)' : 'none';
        });
        
        // Efeito de clique
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            }, 150);
        });
    });
}

// ====================================================
// 3. EFEITO PARALLAX SUAVE
// ====================================================
function initParallaxEffect() {
    const hero = document.querySelector('.start-hero');
    if (!hero) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.15;
        
        if (window.innerWidth > 768) { // Apenas em desktop
            hero.style.transform = `translateY(${rate}px)`;
        }
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

// ====================================================
// 4. SCROLL SUAVE PARA ÂNCORAS
// ====================================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = 100; // Altura do header fixo
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====================================================
// 5. EFEITO DE SCROLL NO HEADER
// ====================================================
function initScrollHeaderEffect() {
    let lastScrollY = 0;
    const header = document.querySelector('.header');
    
    if (header) {
        header.style.transition = 'all 0.4s ease';
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
                
                if (currentScrollY > lastScrollY) {
                    // Scrolling down
                    header.style.transform = 'translateY(-20px)';
                    header.style.opacity = '0.9';
                } else {
                    // Scrolling up
                    header.style.transform = 'translateY(0)';
                    header.style.opacity = '1';
                }
            } else {
                header.classList.remove('scrolled');
                header.style.transform = 'translateY(0)';
                header.style.opacity = '1';
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }
}

// ====================================================
// 6. ANIMAÇÕES DOS CARDS DE PROCESSO - REMOVIDAS
// ====================================================
// function initServiceCardAnimations() {
//     // Animações removidas conforme solicitado
//     // const processSteps = document.querySelectorAll('.process-step');
//     // processSteps.forEach((step, index) => { ... });
// }

// ====================================================
// 7. ANIMAÇÕES DA TIMELINE
// ====================================================
function initTimelineAnimations() {
    const timelineBtn = document.querySelector('.timeline-btn');
    
    if (timelineBtn) {
        timelineBtn.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        timelineBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(255, 255, 255, 0.3)';
            
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'translateX(8px)';
            }
        });
        
        timelineBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
            
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'translateX(0)';
            }
        });
        
        // Efeito de clique
        timelineBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            }, 150);
        });
    }
}

// ====================================================
// 8. ANIMAÇÕES DA SEÇÃO CTA
// ====================================================
function initCTAAnimations() {
    const contactOptions = document.querySelectorAll('.contact-option');
    
    contactOptions.forEach(option => {
        option.style.transition = 'all 0.3s ease';
        
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-3px)';
            
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.background = 'rgba(255, 255, 255, 0.15)';
                icon.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
            
            const link = this.querySelector('.contact-link');
            if (link) {
                link.style.color = '#ffffff';
                link.style.transform = 'translateX(5px)';
            }
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.background = 'rgba(255, 255, 255, 0.1)';
                icon.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
            
            const link = this.querySelector('.contact-link');
            if (link) {
                link.style.color = 'rgba(255, 255, 255, 0.9)';
                link.style.transform = 'translateX(0)';
            }
        });
    });
    
    // Animação da garantia
    const guarantee = document.querySelector('.cta-guarantee');
    if (guarantee) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        guarantee.style.opacity = '0';
        guarantee.style.transform = 'translateY(20px)';
        guarantee.style.transition = 'all 0.6s ease 0.3s';
        observer.observe(guarantee);
    }
}

// ====================================================
// 9. ANIMAÇÃO DA HERO SECTION
// ====================================================
document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.start-hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        heroContent.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 600);
    }
});

// ====================================================
// 10. PERFORMANCE OPTIMIZATION
// ====================================================

// Throttle function para otimizar performance
function throttle(func, limit) {
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

// Aplicar throttle nos eventos de scroll
window.addEventListener('scroll', throttle(function() {
    // Scroll events já otimizados nas funções acima
}, 16), { passive: true }); // 60fps

// ====================================================
// 11. ACESSIBILIDADE E RESPONSIVE
// ====================================================

// Detectar preferência por animações reduzidas
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Desabilitar animações complexas
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Otimizações para mobile
if (window.innerWidth <= 768) {
    // Desabilitar parallax em mobile
    const hero = document.querySelector('.start-hero');
    if (hero) {
        hero.style.backgroundAttachment = 'scroll';
    }
    
    // Simplificar animações em mobile
    const cards = document.querySelectorAll('.service-card, .why-choose-card');
    cards.forEach(card => {
        card.style.backdropFilter = 'none';
    });
}

// ====================================================
// 12. SCROLL TO TOP FUNCTIONALITY
// ====================================================
// function initScrollToTop() {
//     let scrollToTopBtn = document.createElement('button');
//     scrollToTopBtn.innerHTML = '↑';
//     scrollToTopBtn.className = 'scroll-to-top';
//     scrollToTopBtn.style.cssText = `
//         position: fixed;
//         bottom: 30px;
//         right: 30px;
//         width: 50px;
//         height: 50px;
//         background: rgba(255, 255, 255, 0.1);
//         border: 1px solid rgba(255, 255, 255, 0.2);
//         border-radius: 50%;
//         color: #fff;
//         font-size: 1.2rem;
//         cursor: pointer;
//         opacity: 0;
//         visibility: hidden;
//         transition: all 0.3s ease;
//         z-index: 1000;
//         backdrop-filter: blur(10px);
//     `;
//     
//     document.body.appendChild(scrollToTopBtn);
//     
//     // Mostrar/esconder botão baseado no scroll
//     window.addEventListener('scroll', function() {
//         if (window.scrollY > 500) {
//             scrollToTopBtn.style.opacity = '1';
//             scrollToTopBtn.style.visibility = 'visible';
//         } else {
//             scrollToTopBtn.style.opacity = '0';
//             scrollToTopBtn.style.visibility = 'hidden';
//         }
//     });
//     
//     // Funcionalidade do clique
//     scrollToTopBtn.addEventListener('click', function() {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     });
//     
//     // Hover effect
//     scrollToTopBtn.addEventListener('mouseenter', function() {
//         this.style.background = 'rgba(255, 255, 255, 0.2)';
//         this.style.transform = 'scale(1.1) translateY(-3px)';
//     });
//     
//     scrollToTopBtn.addEventListener('mouseleave', function() {
//         this.style.background = 'rgba(255, 255, 255, 0.1)';
//         this.style.transform = 'scale(1) translateY(0)';
//     });
// } 