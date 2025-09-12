/**
 * Компоненты для загрузки общих элементов страницы
 * Встроенные компоненты header и footer
 */

class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.initBuiltInComponents();
    }

    /**
     * Инициализирует встроенные компоненты
     */
    initBuiltInComponents() {
        // Header компонент
        const headerHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <a href="index.html" class="nav-logo">
                        <i class="fas fa-brain"></i>
                        <span>AI Coding</span>
                    </a>
                    <div class="nav-menu">
                        <a href="index.html" class="nav-link" data-page="home">Գլխավոր</a>
                        <a href="module1.html" class="nav-link" data-page="module1">AI Explorer</a>
                        <a href="module2.html" class="nav-link" data-page="module2">AI Developer</a>
                        <a href="module3.html" class="nav-link" data-page="module3">AI Product Engineer</a>
                        <a href="contact.html" class="nav-link" data-page="contact">Կապ</a>
                    </div>
                    <div class="hamburger" id="mobile-menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
            
            <!-- Mobile Menu Overlay -->
            <div class="mobile-menu-overlay" id="mobile-menu-overlay">
                <div class="mobile-menu-content">
                    <div class="mobile-menu-header">
                        <div class="mobile-menu-logo">
                            <i class="fas fa-brain"></i>
                            <span>AI Coding</span>
                        </div>
                        <button class="mobile-menu-close" id="mobile-menu-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <nav class="mobile-menu-nav">
                        <a href="index.html" class="mobile-menu-link" data-page="home">
                            <i class="fas fa-home"></i>
                            <span>Գլխավոր</span>
                        </a>
                        <a href="module1.html" class="mobile-menu-link" data-page="module1">
                            <i class="fas fa-search"></i>
                            <span>AI Explorer</span>
                        </a>
                        <a href="module2.html" class="mobile-menu-link" data-page="module2">
                            <i class="fas fa-code"></i>
                            <span>AI Developer</span>
                        </a>
                        <a href="module3.html" class="mobile-menu-link" data-page="module3">
                            <i class="fas fa-rocket"></i>
                            <span>AI Product Engineer</span>
                        </a>
                        <a href="contact.html" class="mobile-menu-link" data-page="contact">
                            <i class="fas fa-envelope"></i>
                            <span>Կապ</span>
                        </a>
                    </nav>
                    
                    <div class="mobile-menu-footer">
                        <a href="https://wa.me/37444343000?text=Բարև%21%20Ցանկանում%20եմ%20գրանցվել%20AI%20Coding%20դասընթացի%20համար%20և%20սկսել%20սովորել%20ծրագրավորում%20AI-ի%20օգնությամբ%20🚀" target="_blank" class="mobile-menu-cta">
                            <i class="fab fa-whatsapp"></i>
                            <span>Սկսել հիմա</span>
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Footer компонент
        const footerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <a href="index.html" class="footer-logo">
                            <i class="fas fa-brain"></i>
                            <span>AI Coding</span>
                        </a>
                        <div class="footer-links">
                            <a href="index.html">Գլխավոր</a>
                            <a href="module1.html">AI Explorer</a>
                            <a href="module2.html">AI Developer</a>
                            <a href="module3.html">AI Product Engineer</a>
                        </div>
                        <div class="footer-social">
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                            <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2024 AI Coding. Բոլոր իրավունքները պաշտպանված են:</p>
                    </div>
                </div>
            </footer>
        `;

        this.components.set('header', headerHTML);
        this.components.set('footer', footerHTML);
    }

    /**
     * Вставляет компонент в указанный элемент
     * @param {string} componentName - Имя компонента
     * @param {string} selector - CSS селектор элемента
     */
    insertComponent(componentName, selector) {
        const element = document.querySelector(selector);
        if (element && this.components.has(componentName)) {
            element.innerHTML = this.components.get(componentName);
        }
    }

    /**
     * Инициализирует все компоненты страницы
     */
    initComponents() {
        console.log('🔄 Инициализация компонентов...');
        
        // Вставляем компоненты в страницу
        this.insertComponent('header', '#header-container');
        this.insertComponent('footer', '#footer-container');

        console.log('✅ Компоненты инициализированы успешно');
        
        // Инициализируем навигацию после загрузки
        this.initNavigation();
    }

    /**
     * Инициализирует навигацию и активные ссылки
     */
    initNavigation() {
        // Определяем текущую страницу
        const currentPage = this.getCurrentPage();
        
        // Устанавливаем активную ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (page === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Инициализируем мобильное меню
        this.initMobileMenu();
        
        // Инициализируем плавную прокрутку
        this.initSmoothScrolling();
    }

    /**
     * Определяет текущую страницу по URL
     * @returns {string} Имя текущей страницы
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        switch (filename) {
            case 'module1.html':
                return 'module1';
            case 'module2.html':
                return 'module2';
            case 'module3.html':
                return 'module3';
            case 'contact.html':
                return 'contact';
            case 'index.html':
            case '':
                return 'home';
            default:
                return 'home';
        }
    }

    /**
     * Инициализирует мобильное меню
     */
    initMobileMenu() {
        const hamburger = document.getElementById('mobile-menu-toggle');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

        if (hamburger && mobileMenuOverlay) {
            // Открытие меню
            hamburger.addEventListener('click', () => {
                this.openMobileMenu();
            });

            // Закрытие меню
            mobileMenuClose.addEventListener('click', () => {
                this.closeMobileMenu();
            });

            // Закрытие при клике на оверлей
            mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === mobileMenuOverlay) {
                    this.closeMobileMenu();
                }
            });

            // Закрытие при клике на ссылку
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });

            // Закрытие при нажатии Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    /**
     * Открывает мобильное меню
     */
    openMobileMenu() {
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const hamburger = document.getElementById('mobile-menu-toggle');
        
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('active');
            hamburger.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Анимация появления ссылок
            const links = document.querySelectorAll('.mobile-menu-link');
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateX(0)';
                }, index * 100);
            });
        }
    }

    /**
     * Закрывает мобильное меню
     */
    closeMobileMenu() {
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const hamburger = document.getElementById('mobile-menu-toggle');
        
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
            
            // Сброс анимации ссылок
            const links = document.querySelectorAll('.mobile-menu-link');
            links.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateX(30px)';
            });
        }
    }

    /**
     * Инициализирует плавную прокрутку для якорных ссылок
     */
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Учитываем фиксированную навигацию
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Создаем глобальный экземпляр загрузчика компонентов
window.componentLoader = new ComponentLoader();

// Инициализируем компоненты при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.componentLoader.initComponents();
});

// Экспортируем для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentLoader;
}
