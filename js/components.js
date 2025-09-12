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
                    <div class="nav-logo">
                        <i class="fas fa-brain"></i>
                        <span>AI Coding</span>
                    </div>
                    <div class="nav-menu">
                        <a href="index.html" class="nav-link" data-page="home">Գլխավոր</a>
                        <a href="index.html#modules" class="nav-link" data-page="modules">Մոդուլներ</a>
                        <a href="module1.html" class="nav-link" data-page="module1">AI Explorer</a>
                        <a href="module2.html" class="nav-link" data-page="module2">AI Developer</a>
                        <a href="module3.html" class="nav-link" data-page="module3">AI Product Engineer</a>
                        <a href="contact.html" class="nav-link" data-page="contact">Կապ</a>
                    </div>
                    <div class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        `;

        // Footer компонент
        const footerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-logo">
                            <i class="fas fa-brain"></i>
                            <span>AI Coding</span>
                        </div>
                        <div class="footer-links">
                            <a href="index.html">Գլխավոր</a>
                            <a href="index.html#modules">Մոդուլներ</a>
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
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Закрываем меню при клике на ссылку
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
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
