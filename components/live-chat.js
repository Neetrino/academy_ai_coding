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
                        <a href="https://wa.me/37444343000" target="_blank" class="chat-option whatsapp" title="WhatsApp">
                            <div class="chat-option-icon">
                                <i class="fab fa-whatsapp"></i>
                            </div>
                        </a>
                        <a href="https://t.me/Neetrino" target="_blank" class="chat-option telegram" title="Telegram">
                            <div class="chat-option-icon">
                                <i class="fab fa-telegram"></i>
                            </div>
                        </a>
                        <a href="https://instagram.com/neetrino_it_academ" target="_blank" class="chat-option instagram" title="Instagram">
                            <div class="chat-option-icon">
                                <i class="fab fa-instagram"></i>
                            </div>
                        </a>
                        <a href="https://www.facebook.com/share/14HMevrDCXQ/" target="_blank" class="chat-option facebook" title="Facebook">
                            <div class="chat-option-icon">
                                <i class="fab fa-facebook"></i>
                            </div>
                        </a>
                        <a href="tel:+37444343000" class="chat-option phone" title="Զանգ">
                            <div class="chat-option-icon">
                                <i class="fas fa-phone"></i>
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
            chatToggle.addEventListener('click', () => {
                this.toggleChat();
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
     * Переключает состояние чата
     */
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
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
