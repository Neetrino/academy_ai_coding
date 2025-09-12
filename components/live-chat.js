/**
 * Live Chat Component
 * Компонент для отображения живого чата на всех страницах
 */

class LiveChatComponent {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    /**
     * Инициализирует компонент Live Chat
     */
    init() {
        this.createHTML();
        this.attachEventListeners();
        console.log('💬 Live Chat компонент инициализирован');
    }

    /**
     * Создает HTML структуру компонента
     */
    createHTML() {
        const liveChatHTML = `
            <div class="live-chat-widget">
                <div class="chat-toggle" id="chatToggle">
                    <i class="fas fa-comments"></i>
                </div>
                <div class="chat-label">Live Chat</div>
                <div class="chat-menu" id="chatMenu">
                    <div class="chat-options">
                        <a href="https://wa.me/37444343000?text=Բարև%21%20Ցանկանում%20եմ%20գրանցվել%20AI%20Coding%20դասընթացի%20համար%20և%20սկսել%20սովորել%20ծրագրավորում%20AI-ի%20օգնությամբ%20🚀" target="_blank" class="chat-option whatsapp" title="WhatsApp">
                            <div class="chat-option-icon">
                                <i class="fab fa-whatsapp"></i>
                            </div>
                            <div class="chat-option-text">
                                <span class="chat-option-title">Սկսել հիմա</span>
                                <span class="chat-option-subtitle">WhatsApp</span>
                            </div>
                        </a>
                        <a href="https://t.me/Neetrino" target="_blank" class="chat-option telegram" title="Telegram">
                            <div class="chat-option-icon">
                                <i class="fab fa-telegram"></i>
                            </div>
                            <div class="chat-option-text">
                                <span class="chat-option-title">Telegram</span>
                                <span class="chat-option-subtitle">Արագ հաղորդակցություն</span>
                            </div>
                        </a>
                        <a href="tel:+37444343000" class="chat-option phone" title="Զանգ">
                            <div class="chat-option-icon">
                                <i class="fas fa-phone"></i>
                            </div>
                            <div class="chat-option-text">
                                <span class="chat-option-title">Զանգ</span>
                                <span class="chat-option-subtitle">+374 44 343 000</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Добавляем компонент в body
        document.body.insertAdjacentHTML('beforeend', liveChatHTML);
    }

    /**
     * Привязывает обработчики событий
     */
    attachEventListeners() {
        const chatToggle = document.getElementById('chatToggle');
        const chatMenu = document.getElementById('chatMenu');

        if (chatToggle) {
            // Обычный клик
            chatToggle.addEventListener('click', () => {
                this.toggleChat();
            });

            // Долгое нажатие для мобильных устройств
            let longPressTimer;
            chatToggle.addEventListener('touchstart', (e) => {
                longPressTimer = setTimeout(() => {
                    this.showMobileMenu();
                }, 500);
            });

            chatToggle.addEventListener('touchend', () => {
                clearTimeout(longPressTimer);
            });

            chatToggle.addEventListener('touchmove', () => {
                clearTimeout(longPressTimer);
            });
        }

        // Закрываем чат при клике вне его
        document.addEventListener('click', (e) => {
            if (this.isOpen && !e.target.closest('.live-chat-widget')) {
                this.closeChat();
            }
        });

        // Закрываем чат при нажатии Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChat();
            }
        });
    }

    /**
     * Переключает состояние чата или открывает WhatsApp
     */
    toggleChat() {
        // Проверяем, если это мобильное устройство, сразу открываем WhatsApp
        if (this.isMobileDevice()) {
            window.open('https://wa.me/37444343000', '_blank');
            return;
        }
        
        // На десктопе показываем меню
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    /**
     * Проверяет, является ли устройство мобильным
     */
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 768;
    }

    /**
     * Показывает мобильное меню с выбором способа связи
     */
    showMobileMenu() {
        // Создаем простое мобильное меню
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-chat-menu';
        mobileMenu.innerHTML = `
            <div class="mobile-menu-content">
                <h3>Սկսել հիմա</h3>
                <div class="mobile-options">
                    <button onclick="window.open('https://wa.me/37444343000?text=Բարև%21%20Ցանկանում%20եմ%20գրանցվել%20AI%20Coding%20դասընթացի%20համար%20և%20սկսել%20սովորել%20ծրագրավորում%20AI-ի%20օգնությամբ%20🚀', '_blank')" class="mobile-option whatsapp">
                        <i class="fab fa-whatsapp"></i>
                        <span>Սկսել հիմա</span>
                    </button>
                    <button onclick="window.open('https://t.me/Neetrino', '_blank')" class="mobile-option telegram">
                        <i class="fab fa-telegram"></i>
                        <span>Telegram</span>
                    </button>
                    <button onclick="window.location.href='tel:+37444343000'" class="mobile-option phone">
                        <i class="fas fa-phone"></i>
                        <span>Զանգ</span>
                    </button>
                </div>
                <button class="close-mobile-menu" onclick="this.parentElement.parentElement.remove()">Փակել</button>
            </div>
        `;

        // Добавляем стили для мобильного меню
        const style = document.createElement('style');
        style.textContent = `
            .mobile-chat-menu {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            .mobile-menu-content {
                background: var(--dark-card);
                border-radius: 16px;
                padding: 2rem;
                text-align: center;
                max-width: 300px;
                width: 100%;
                border: 1px solid var(--primary-color);
            }
            .mobile-menu-content h3 {
                color: var(--text-primary);
                margin-bottom: 1.5rem;
                font-size: 1.2rem;
            }
            .mobile-options {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-bottom: 1.5rem;
            }
            .mobile-option {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                border: none;
                border-radius: 12px;
                background: var(--dark-surface);
                color: var(--text-primary);
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: left;
            }
            .mobile-option:hover {
                background: var(--primary-color);
                transform: translateY(-2px);
            }
            .mobile-option i {
                font-size: 1.5rem;
                width: 30px;
            }
            .mobile-option.whatsapp i { color: #25d366; }
            .mobile-option.telegram i { color: #0088cc; }
            .mobile-option.phone i { color: var(--accent-color); }
            .close-mobile-menu {
                background: transparent;
                border: 1px solid var(--text-muted);
                color: var(--text-secondary);
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .close-mobile-menu:hover {
                border-color: var(--primary-color);
                color: var(--primary-color);
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(mobileMenu);

        // Закрываем меню при клике вне его
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.remove();
                style.remove();
            }
        });
    }

    /**
     * Открывает чат
     */
    openChat() {
        const chatMenu = document.getElementById('chatMenu');
        if (chatMenu) {
            chatMenu.classList.add('active');
            this.isOpen = true;
            console.log('💬 Live Chat открыт');
        }
    }

    /**
     * Закрывает чат
     */
    closeChat() {
        const chatMenu = document.getElementById('chatMenu');
        if (chatMenu) {
            chatMenu.classList.remove('active');
            this.isOpen = false;
            console.log('💬 Live Chat закрыт');
        }
    }

    /**
     * Уничтожает компонент
     */
    destroy() {
        const liveChatWidget = document.querySelector('.live-chat-widget');
        if (liveChatWidget) {
            liveChatWidget.remove();
            console.log('💬 Live Chat компонент удален');
        }
    }
}

// Экспортируем класс для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LiveChatComponent;
} else {
    window.LiveChatComponent = LiveChatComponent;
}
