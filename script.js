// ====================================================
// ANIMAÇÕES OTIMIZADAS DO PORTFÓLIO
// ====================================================

// Variáveis globais para performance
let lastScrollY = 0;
let isScrolling = false;
let scrollTicking = false;

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

// Aguardar carregamento da página
window.addEventListener('load', function() {
    // Adicionar classe para identificar JS habilitado
    document.body.classList.add('js-enabled');
    
    // Inicializar todas as animações
    initNavigationAnimations();
    initButtonAnimations();
    initScrollAnimations();
    initHeroAnimations();
    initScrollReveal();
    initActiveNavigation();
    initScrollToTop();
    initPerformanceOptimizations();
});

// ====================================================
// ANIMAÇÕES DA NAVEGAÇÃO
// ====================================================
function initNavigationAnimations() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const logo = document.querySelector('.logo-wrapper');
    
    // Animações dos links de navegação
    navLinks.forEach((link) => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efeito de clique suave
        link.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            }, 100);
        });
    });
    
    // Animação do logo
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// ====================================================
// ANIMAÇÕES DOS BOTÕES
// ====================================================
function initButtonAnimations() {
    const portfolioBtn = document.querySelector('.portfolio-btn');
    const ctaBtn = document.querySelector('.cta-btn');
    const socialIcons = document.querySelectorAll('.social-link');
    
    // Botão portfolio
    if (portfolioBtn) {
        portfolioBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        portfolioBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    // Botão CTA
    if (ctaBtn) {
        ctaBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        ctaBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    // Ícones sociais
    socialIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', function() {
            const rotation = 5 + (index * 3);
            this.style.transform = `scale(1.1) rotate(${rotation}deg)`;
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ====================================================
// ANIMAÇÕES DE SCROLL OTIMIZADAS
// ====================================================
function initScrollAnimations() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    // Função otimizada para atualizações de scroll
    function updateScrollEffects() {
        const currentScrollY = window.scrollY;
        
        // Header scroll effect
        if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY) {
                // Scrolling down
                header.style.transform = 'translateY(-10px)';
                header.style.opacity = '0.9';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
                header.style.opacity = '1';
            }
        } else {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        }
        
        lastScrollY = currentScrollY;
        scrollTicking = false;
    }
    
    // Throttled scroll event listener
    const throttledScrollHandler = throttle(() => {
        if (!scrollTicking) {
            requestAnimationFrame(updateScrollEffects);
            scrollTicking = true;
        }
    }, 10);
    
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
}

// ====================================================
// ANIMAÇÃO DA HERO SECTION
// ====================================================
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Animação inicial mais suave
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
}

// ====================================================
// SCROLL REVEAL OTIMIZADO
// ====================================================
function initScrollReveal() {
    const elementsToReveal = document.querySelectorAll('.main-title, .main-description, .portfolio-btn, .footer-column');
    
    // Observer para animações de scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Remover observer após animação
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    elementsToReveal.forEach(el => {
        observer.observe(el);
    });
}

// ====================================================
// SCROLL TO TOP MELHORADO
// ====================================================
function initScrollToTop() {
    const scrollToTopBtn = document.querySelector('#scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    let isVisible = false;
    
    // Função otimizada para mostrar/esconder botão
    function toggleScrollButton() {
        const shouldShow = window.scrollY > 300;
        
        if (shouldShow && !isVisible) {
            scrollToTopBtn.classList.add('show');
            isVisible = true;
        } else if (!shouldShow && isVisible) {
            scrollToTopBtn.classList.remove('show');
            isVisible = false;
        }
    }
    
    // Throttled scroll event para o botão
    const throttledScrollToTop = throttle(toggleScrollButton, 100);
    window.addEventListener('scroll', throttledScrollToTop, { passive: true });
    
    // Click handler
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover animations
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(1)';
    });
}

// ====================================================
// NAVEGAÇÃO ATIVA
// ====================================================
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        
        if (
            (currentPage === 'index.html' && (href === 'index.html' || href === '#home')) ||
            (currentPage === 'aboutme.html' && href === 'aboutme.html') ||
            (currentPage === 'timeline.html' && href === 'timeline.html') ||
            (currentPage === 'contato.html' && href === 'contato.html') ||
            (currentPage === 'comece-agora.html' && href === 'comece-agora.html')
        ) {
            link.classList.add('active');
        }
    });
}

// ====================================================
// OTIMIZAÇÕES DE PERFORMANCE
// ====================================================
function initPerformanceOptimizations() {
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
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
    
    // Otimizar para mobile
    function optimizeForMobile() {
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-device');
            // Reduzir animações complexas em mobile
            const style = document.createElement('style');
            style.textContent = `
                .mobile-device * {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
            `;
            document.head.appendChild(style);
        } else {
            document.body.classList.remove('mobile-device');
        }
    }
    
    optimizeForMobile();
    
    // Debounced resize handler
    const debouncedResize = throttle(optimizeForMobile, 250);
    window.addEventListener('resize', debouncedResize);
    
    // Scroll suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// ====================================================
// ESTILOS CSS INJETADOS (OTIMIZADO)
// ====================================================
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#optimizedStyles')) {
        const style = document.createElement('style');
        style.id = 'optimizedStyles';
        style.textContent = `
            /* Scroll to top button optimizado */
            .scroll-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                color: white;
                cursor: pointer;
                z-index: 1000;
                backdrop-filter: blur(10px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
            }
            
            .scroll-to-top.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .scroll-to-top:hover {
                background: rgba(255, 255, 255, 0.2);
                border-color: rgba(255, 255, 255, 0.4);
                transform: translateY(-3px) scale(1.05);
            }
            
            .scroll-to-top svg {
                width: 20px;
                height: 20px;
                transition: transform 0.3s ease;
            }
            
            .scroll-to-top:hover svg {
                transform: translateY(-2px);
            }
            
            /* Navegação ativa */
            .nav-links a.active {
                color: #fff !important;
                background: rgba(255, 255, 255, 0.1) !important;
                border-radius: 25px !important;
            }
            
            /* Otimizações de performance */
            .js-enabled .hero-content {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* Responsivo melhorado */
            @media (max-width: 768px) {
                .scroll-to-top {
                    bottom: 20px;
                    right: 20px;
                    width: 45px;
                    height: 45px;
                }
                
                .scroll-to-top svg {
                    width: 18px;
                    height: 18px;
                }
                
                /* Reduzir animações em mobile */
                .mobile-device * {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
            }
            
            /* Reduzir movimento para acessibilidade */
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
            
            /* Performance otimizada para touch devices */
            @media (hover: none) and (pointer: coarse) {
                .nav-links a:hover,
                .portfolio-btn:hover,
                .cta-btn:hover,
                .social-link:hover {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
});


