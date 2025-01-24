(function () {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: none;
            width: 380px;
            height: 600px;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
            border: 1px solid rgba(133, 79, 255, 0.2);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
        }

        .n8n-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f8f9fa;
        }

        .n8n-chat-widget .chat-message {
            margin: 8px 0;
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: #ffffff;
            align-self: flex-end;
        }

        .n8n-chat-widget .chat-message.bot {
            background: #ffffff;
            border: 1px solid rgba(133, 79, 255, 0.2);
            color: #333;
            align-self: flex-start;
        }

        .n8n-chat-widget .chat-input {
            display: flex;
            padding: 16px;
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            background: #ffffff;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 8px;
            resize: none;
        }

        .n8n-chat-widget .chat-input button {
            padding: 0 20px;
            border: none;
            border-radius: 8px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            cursor: pointer;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';

    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';

    const chatInterfaceHTML = `
        <div class="brand-header">
            <span>LVA</span>
            <button class="close-button">×</button>
        </div>
        <div class="chat-messages"></div>
        <div class="chat-input">
            <textarea placeholder="Type your message here..." rows="1"></textarea>
            <button type="submit">Send</button>
        </div>
    `;
    chatContainer.innerHTML = chatInterfaceHTML;
    widgetContainer.appendChild(chatContainer);
    document.body.appendChild(widgetContainer);

    const toggleButton = document.createElement('button');
    toggleButton.className = 'chat-toggle';
    toggleButton.textContent = '💬';
    document.body.appendChild(toggleButton);

    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');

    function initializeChat() {
        messagesContainer.innerHTML = '';

        const initialMessageDiv = document.createElement('div');
        initialMessageDiv.className = 'chat-message bot';
        initialMessageDiv.textContent = 'Hello';
        messagesContainer.appendChild(initialMessageDiv);
    }

    sendButton.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message === '') return;

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        textarea.value = '';

        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chat-message bot';
        botMessageDiv.textContent = `You said: ${message}`;
        messagesContainer.appendChild(botMessageDiv);
    });

    toggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
        if (chatContainer.classList.contains('open')) {
            initializeChat();
        }
    });

    chatContainer.querySelector('.close-button').addEventListener('click', () => {
        chatContainer.classList.remove('open');
    });
})();
