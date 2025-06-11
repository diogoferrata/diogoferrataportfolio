// ====================================================
// TIMELINE PAGE FUNCTIONALITY
// ====================================================

// Variáveis globais
let currentFilter = 'all';
let currentView = 'timeline';
let timelineItems = [];
let isAnimating = false;

// Aguardar carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    initTimeline();
    initFilters();
    initViewToggle();
    initScrollAnimations();
    initActiveNavigation();
    addScrollToTopFunctionality();
    initProjectClicks();
    initYearNavigation();
});

// ====================================================
// INICIALIZAÇÃO DA TIMELINE
// ====================================================
function initTimeline() {
    timelineItems = document.querySelectorAll('.timeline-item');
    
    // Configurar categorias dos items
    timelineItems.forEach((item) => {
        const year = item.dataset.year;
        const categories = item.dataset.category.split(' ');
        
        // Mapear categorias para filtros
        item.dataset.mappedCategories = mapCategories(categories).join(' ');
    });
    
    // Mostrar todos os items inicialmente
    showAllItems();
    
    // Inicializar animações de scroll
    setTimeout(() => {
        animateVisibleItems();
    }, 300);
}

function mapCategories(categories) {
    const categoryMap = {
        'education': ['education'],
        'health': ['health'],
        'iot': ['iot'],
        'web': ['web'],
        'design': ['design'],
        'social': ['education', 'health'],
        'logistics': ['iot'],
        'security': ['iot'],
        'communication': ['design'],
        'innovation': ['web']
    };
    
    let mappedCategories = [];
    categories.forEach(cat => {
        if (categoryMap[cat]) {
            mappedCategories = mappedCategories.concat(categoryMap[cat]);
        } else {
            mappedCategories.push(cat);
        }
    });
    
    return [...new Set(mappedCategories)]; // Remove duplicatas
}

// ====================================================
// SISTEMA DE FILTROS
// ====================================================
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (isAnimating) return;
            
            const filter = this.dataset.filter;
            
            // Atualizar botão ativo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Aplicar filtro
            applyFilter(filter);
        });
    });
}

function applyFilter(filter) {
    if (isAnimating) return;
    
    isAnimating = true;
    currentFilter = filter;
    
    // Fade out todos os items
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
    });
    
    setTimeout(() => {
        // Mostrar/esconder items baseado no filtro
        timelineItems.forEach(item => {
            const categories = item.dataset.mappedCategories;
            const shouldShow = filter === 'all' || categories.includes(filter);
            
            if (shouldShow) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
        
        // Fade in items visíveis
        setTimeout(() => {
            animateVisibleItems();
            isAnimating = false;
        }, 100);
        
    }, 300);
}

function showAllItems() {
    timelineItems.forEach(item => {
        item.classList.remove('hidden');
    });
}

function animateVisibleItems() {
    const visibleItems = document.querySelectorAll('.timeline-item:not(.hidden)');
    
    visibleItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.classList.add('animate');
        }, index * 150);
    });
}

// ====================================================
// ALTERNÂNCIA DE VISUALIZAÇÃO
// ====================================================
function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const timelineWrapper = document.getElementById('timelineContainer');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (isAnimating) return;
            
            const view = this.dataset.view;
            
            // Atualizar botão ativo
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Aplicar visualização
            applyView(view, timelineWrapper);
        });
    });
}

function applyView(view, wrapper) {
    if (isAnimating) return;
    
    isAnimating = true;
    currentView = view;
    
    // Fade out
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        if (view === 'grid') {
            wrapper.classList.add('grid-view');
        } else {
            wrapper.classList.remove('grid-view');
        }
        
        // Fade in
        setTimeout(() => {
            wrapper.style.opacity = '1';
            wrapper.style.transform = 'scale(1)';
            isAnimating = false;
            
            // Re-animar items se necessário
            if (view === 'timeline') {
                setTimeout(() => {
                    animateVisibleItems();
                }, 200);
            }
        }, 100);
        
    }, 300);
}

// ====================================================
// ANIMAÇÕES DE SCROLL
// ====================================================
function initScrollAnimations() {
    // Observer para items da timeline
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && currentView === 'timeline') {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });
    
    // Observer para estatísticas
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observar items da timeline
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Observar estatísticas
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        statsObserver.observe(item);
    });
}

function animateStats(container) {
    const statNumbers = container.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const start = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOut);
            
            // Atualizar o número mantendo o formato original
            const originalText = stat.textContent;
            if (originalText.includes('+')) {
                stat.textContent = current + '+';
            } else {
                stat.textContent = current;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    });
}

// ====================================================
// NAVEGAÇÃO ATIVA
// ====================================================
function initActiveNavigation() {
    const currentPage = 'timeline.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        
        if (href === currentPage || href.includes('timeline')) {
            link.classList.add('active');
        }
    });
}

// ====================================================
// PROJECT CLICK FUNCTIONALITY
// ====================================================
function initProjectClicks() {
    const clickableProjects = document.querySelectorAll('.clickable-project');
    
    clickableProjects.forEach(project => {
        project.addEventListener('click', function(e) {
            const timelineItem = this.closest('.timeline-item');
            const isWeb2025 = timelineItem && timelineItem.dataset.year === '2025' && timelineItem.dataset.category.includes('web');

            // Se for subprojeto de desenvolvimento web e clicou em um link interno, deixa o link funcionar normalmente
            if (isWeb2025 && e.target.closest('a.project-link')) {
                // Não faz nada, deixa o link seguir
                return;
            }

            e.preventDefault();
            const projectUrl = timelineItem.dataset.projectUrl;
            const projectTitle = this.querySelector('.project-title').textContent;
            // Track click event
            trackTimelineInteraction('project_click', 'timeline', projectTitle);
            // Verificar se há URL definida
            if (projectUrl && projectUrl !== '#') {
                // Adicionar efeito visual de clique
                this.style.transform = 'translateY(-3px) scale(0.98)';
                setTimeout(() => {
                    // Abrir em nova aba
                    window.open(projectUrl, '_blank', 'noopener,noreferrer');
                    // Resetar transform
                    this.style.transform = '';
                }, 150);
            } else {
                // Mostrar mensagem informativa se não há link
                showProjectMessage(projectTitle);
            }
        });
        
        // Adicionar indicador visual
        project.addEventListener('mouseenter', function() {
            const timelineItem = this.closest('.timeline-item');
            const projectUrl = timelineItem.dataset.projectUrl;
            
            if (projectUrl && projectUrl !== '#') {
                this.style.cursor = 'pointer';
                this.title = 'Clique para ver o projeto';
            } else {
                this.style.cursor = 'default';
                this.title = 'Link do projeto será adicionado em breve';
            }
        });
    });
}

function showProjectMessage(projectTitle) {
    // Criar e mostrar notificação temporária
    const notification = document.createElement('div');
    notification.className = 'project-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">•</span>
            <span class="notification-text">Link para "${projectTitle}" será adicionado em breve!</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ====================================================
// SCROLL TO TOP
// ====================================================
function addScrollToTopFunctionality() {
    const scrollToTopBtn = document.querySelector('#scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    let isVisible = false;
    
    function toggleScrollButton() {
        const shouldShow = window.scrollY > 300;
        
        if (shouldShow && !isVisible) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
            scrollToTopBtn.style.transform = 'translateY(0)';
            isVisible = true;
        } else if (!shouldShow && isVisible) {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
            scrollToTopBtn.style.transform = 'translateY(20px)';
            isVisible = false;
        }
    }
    
    // Throttle scroll event
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(toggleScrollButton, 100);
    });
    
    // Click handler
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ====================================================
// FUNCIONALIDADES ADICIONAIS
// ====================================================

// Pesquisa por texto (funcionalidade extra)
function initSearch() {
    const searchInput = document.querySelector('#timelineSearch');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm === '') {
            showAllItems();
            animateVisibleItems();
            return;
        }
        
        timelineItems.forEach(item => {
            const title = item.querySelector('.project-title').textContent.toLowerCase();
            const description = item.querySelector('.project-description').textContent.toLowerCase();
            const details = item.querySelector('.project-details').textContent.toLowerCase();
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          details.includes(searchTerm);
            
            if (matches) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
        
        animateVisibleItems();
    });
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Esc para resetar filtros
        if (e.key === 'Escape') {
            document.querySelector('.filter-btn[data-filter="all"]').click();
        }
        
        // Números 1-6 para filtros
        const filterMap = {
            '1': 'all',
            '2': 'education',
            '3': 'web',
            '4': 'iot',
            '5': 'design',
            '6': 'health'
        };
        
        if (filterMap[e.key]) {
            const filterBtn = document.querySelector(`[data-filter="${filterMap[e.key]}"]`);
            if (filterBtn) filterBtn.click();
        }
        
        // T para timeline, G para grid
        if (e.key.toLowerCase() === 't') {
            document.querySelector('[data-view="timeline"]').click();
        }
        if (e.key.toLowerCase() === 'g') {
            document.querySelector('[data-view="grid"]').click();
        }
    });
}

// Parallax effect para hero section
function initParallax() {
    const hero = document.querySelector('.timeline-hero');
    
    if (!hero) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// ====================================================
// URL HASH MANAGEMENT
// ====================================================
function initHashManagement() {
    // Ler hash da URL na inicialização
    const hash = window.location.hash.substring(1);
    if (hash) {
        const [filterType, filterValue] = hash.split('-');
        
        if (filterType === 'filter' && filterValue) {
            const filterBtn = document.querySelector(`[data-filter="${filterValue}"]`);
            if (filterBtn) {
                setTimeout(() => filterBtn.click(), 500);
            }
        }
        
        if (filterType === 'year' && filterValue) {
            const yearItem = document.querySelector(`[data-year="${filterValue}"]`);
            if (yearItem) {
                setTimeout(() => {
                    yearItem.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 800);
            }
        }
    }
    
    // Atualizar hash quando filtro mudar
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            if (filter !== 'all') {
                window.history.replaceState(null, null, `#filter-${filter}`);
            } else {
                window.history.replaceState(null, null, window.location.pathname);
            }
        });
    });
}

// ====================================================
// PERFORMANCE OPTIMIZATIONS
// ====================================================
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Reduzir animações em mobile
        document.body.classList.add('mobile-optimized');
        
        // Desabilitar parallax em mobile
        const hero = document.querySelector('.timeline-hero');
        if (hero) {
            hero.style.backgroundAttachment = 'scroll';
        }
    }
}

// ====================================================
// INICIALIZAÇÃO COMPLETA
// ====================================================
function initializeAllFeatures() {
    initSearch();
    initKeyboardNavigation();
    initParallax();
    initHashManagement();
    optimizeForMobile();
}

// Inicializar funcionalidades extras após carregamento
window.addEventListener('load', initializeAllFeatures);

// Otimizar em resize
window.addEventListener('resize', function() {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(optimizeForMobile, 250);
});

// ====================================================
// ESTILOS CSS INJETADOS DINAMICAMENTE
// ====================================================
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animações suaves para transições */
        .timeline-wrapper {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Otimizações mobile */
        .mobile-optimized .timeline-item {
            transition-duration: 0.3s !important;
        }
        
        .mobile-optimized .project-card {
            transition-duration: 0.2s !important;
        }
        
        /* Estados de loading */
        .timeline-item {
            will-change: transform, opacity;
        }
        
        /* Smooth scrolling para toda a página */
        html {
            scroll-behavior: smooth;
        }
        
        /* Focus states melhorados */
        .timeline-item:focus-within .project-card {
            outline: 2px solid rgba(255, 255, 255, 0.3);
            outline-offset: 4px;
        }
        
        /* Hover effects aprimorados */
        @media (hover: hover) {
            .project-card:hover {
                cursor: pointer;
            }
            
            .filter-btn:hover {
                cursor: pointer;
            }
            
            .view-btn:hover {
                cursor: pointer;
            }
        }
    `;
    document.head.appendChild(style);
});

// ====================================================
// YEAR NAVIGATION
// ====================================================
function initYearNavigation() {
    const yearButtons = document.querySelectorAll('.year-btn');
    
    yearButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetYear = this.dataset.year;
            
            // Encontrar o primeiro item da timeline do ano
            const targetItem = document.querySelector(`.timeline-item[data-year="${targetYear}"]`);
            
            if (targetItem) {
                // Calcular offset para posicionar melhor
                const headerHeight = 120; // Altura do header fixo
                const elementPosition = targetItem.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight;
                
                // Smooth scroll para o item
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Adicionar destaque temporário
                targetItem.classList.add('highlighted');
                setTimeout(() => {
                    targetItem.classList.remove('highlighted');
                }, 3000);
                
                // Track interaction
                trackTimelineInteraction('year_navigation', 'timeline', targetYear);
            } else {
                console.log(`Projeto do ano ${targetYear} não encontrado`);
                // Mostrar mensagem se não encontrar
                showProjectMessage(`Projeto de ${targetYear}`);
            }
        });
    });
}

// ====================================================
// ANALYTICS E TRACKING
// ====================================================
function trackTimelineInteraction(action, category, label) {
    // Placeholder para analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: 1
        });
    }
    
    console.log(`Timeline Interaction: ${action} - ${category} - ${label}`);
}

// Adicionar tracking aos botões
document.addEventListener('DOMContentLoaded', function() {
    // Track filter clicks
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            trackTimelineInteraction('filter_click', 'timeline', this.dataset.filter);
        });
    });
    
    // Track view toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            trackTimelineInteraction('view_change', 'timeline', this.dataset.view);
        });
    });
    
    // Track project card interactions
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.project-title').textContent;
            trackTimelineInteraction('project_view', 'timeline', title);
        });
    });
    
    // Track year navigation clicks
    document.querySelectorAll('.year-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            trackTimelineInteraction('year_click', 'navigation', this.dataset.year);
        });
    });
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initTimeline,
        applyFilter,
        applyView,
        mapCategories,
        initProjectClicks
    };
} 