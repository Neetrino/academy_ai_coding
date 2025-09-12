/**
 * Live Chat Widget JavaScript
 * Управляет функциональностью живого чата на всех страницах
 */

class LiveChatWidget {
    constructor() {
        this.isOpen = false;
        this.badgeCount = 1;
        this.init();
    }

    /**
     * Инициализация чата
     */
    init() {
        this.createWidget();
        this.bindEvents();
        this.showWelcomeMessage();
    }

    /**
     * Создание HTML структуры чата
     */
    createWidget() {
        const chatHTML = `
            <div class="live-chat-widget">
                <button class="chat-toggle" id="chatToggle">
                    <i class="fas fa-comments"></i>
                    <span class="chat-badge" id="chatBadge">${this.badgeCount}</span>
                </button>

                <div class="chat-menu" id="chatMenu">
                    <div class="chat-menu-header">
                        <h4>Կապ մեզ հետ</h4>
                        <button class="chat-close" id="chatClose">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="chat-options">
                        <a href="https://wa.me/37444343000" target="_blank" class="chat-option whatsapp">
                            <div class="chat-option-icon">
                                <i class="fab fa-whatsapp"></i>
                            </div>
                            <div class="chat-option-content">
                                <h5>WhatsApp</h5>
                                <p>Արագ պատասխան</p>
                            </div>
                        </a>

                        <a href="https://t.me/neetrino_it_academ" target="_blank" class="chat-option telegram">
                            <div class="chat-option-icon">
                                <i class="fab fa-telegram"></i>
                            </div>
                            <div class="chat-option-content">
                                <h5>Telegram</h5>
                                <p>Անմիջական հաղորդակցություն</p>
                            </div>
                        </a>

                        <a href="https://instagram.com/neetrino_it_academ" target="_blank" class="chat-option instagram">
                            <div class="chat-option-icon">
                                <i class="fab fa-instagram"></i>
                            </div>
                            <div class="chat-option-content">
                                <h5>Instagram</h5>
                                <p>Նորություններ և թարմացումներ</p>
                            </div>
                        </a>

                        <a href="https://www.facebook.com/share/14HMevrDCXQ/" target="_blank" class="chat-option facebook">
                            <div class="chat-option-icon">
                                <i class="fab fa-facebook"></i>
                            </div>
                            <div class="chat-option-content">
                                <h5>Facebook</h5>
                                <p>Համայնք և աջակցություն</p>
                            </div>
                        </a>

                        <a href="tel:+37444343000" class="chat-option phone">
                            <div class="chat-option-icon">
                                <i class="fas fa-phone"></i>
                            </div>
                            <div class="chat-option-content">
                                <h5>Զանգահարել</h5>
                                <p>+374 44 343 000</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Добавляем чат в body
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    /**
     * Привязка событий
     */
    bindEvents() {
        const chatToggle = document.getElementById('chatToggle');
        const chatClose = document.getElementById('chatClose');
        const chatMenu = document.getElementById('chatMenu');

        // Открытие/закрытие чата
        chatToggle.addEventListener('click', () => {
            this.toggleChat();
        });

        // Закрытие чата
        chatClose.addEventListener('click', () => {
            this.closeChat();
        });

        // Закрытие при клике вне чата
        document.addEventListener('click', (e) => {
            if (this.isOpen && !chatMenu.contains(e.target) && !chatToggle.contains(e.target)) {
                this.closeChat();
            }
        });

        // Закрытие при нажатии Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChat();
            }
        });

        // Отслеживание кликов по опциям чата
        const chatOptions = document.querySelectorAll('.chat-option');
        chatOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                this.trackChatInteraction(option);
            });
        });
    }

    /**
     * Переключение состояния чата
     */
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    /**
     * Открытие чата
     */
    openChat() {
        const chatMenu = document.getElementById('chatMenu');
        const chatToggle = document.getElementById('chatToggle');
        
        chatMenu.classList.add('active');
        chatToggle.style.transform = 'scale(1.1)';
        this.isOpen = true;

        // Убираем бейдж при открытии
        this.hideBadge();

        // Анимация появления
        setTimeout(() => {
            chatMenu.style.transform = 'translateY(0) scale(1)';
        }, 10);
    }

    /**
     * Закрытие чата
     */
    closeChat() {
        const chatMenu = document.getElementById('chatMenu');
        const chatToggle = document.getElementById('chatToggle');
        
        chatMenu.classList.remove('active');
        chatToggle.style.transform = 'scale(1)';
        this.isOpen = false;
    }

    /**
     * Показать бейдж с уведомлением
     */
    showBadge() {
        const badge = document.getElementById('chatBadge');
        if (badge) {
            badge.style.display = 'flex';
            badge.textContent = this.badgeCount;
        }
    }

    /**
     * Скрыть бейдж
     */
    hideBadge() {
        const badge = document.getElementById('chatBadge');
        if (badge) {
            badge.style.display = 'none';
        }
    }

    /**
     * Показать приветственное сообщение
     */
    showWelcomeMessage() {
        // Показываем бейдж через 3 секунды после загрузки страницы
        setTimeout(() => {
            this.showBadge();
        }, 3000);
    }

    /**
     * Отслеживание взаимодействий с чатом
     */
    trackChatInteraction(option) {
        const platform = option.classList[1]; // whatsapp, telegram, etc.
        
        // Логируем взаимодействие
        console.log(`Chat interaction: ${platform}`);
        
        // Можно добавить аналитику здесь
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_interaction', {
                'platform': platform,
                'page': window.location.pathname
            });
        }
    }

    /**
     * Обновление счетчика бейджа
     */
    updateBadgeCount(count) {
        this.badgeCount = count;
        if (this.isOpen) {
            this.hideBadge();
        } else {
            this.showBadge();
        }
    }
}

// Инициализация чата при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, что чат еще не инициализирован
    if (!document.querySelector('.live-chat-widget')) {
        window.liveChat = new LiveChatWidget();
    }
});

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LiveChatWidget;
}
