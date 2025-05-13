document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Marketing-related responses
    const marketingResponses = {
        greeting: [
            "Hello! I'm your marketing assistant. How can I help you with your marketing strategy today?",
            "Welcome! I'm here to help you with your marketing needs. What would you like to know?",
            "Hi there! Ready to boost your marketing efforts? How can I assist you?"
        ],
        socialMedia: [
            "For social media marketing, I recommend focusing on platforms where your target audience is most active. Would you like specific platform recommendations?",
            "Social media is a powerful tool for engagement. What platforms are you currently using?",
            "Let's optimize your social media presence. Which platforms would you like to focus on?"
        ],
        content: [
            "Content marketing is crucial for building brand authority. What type of content are you interested in creating?",
            "Great choice! Let's discuss your content strategy. What are your main goals?",
            "Content marketing can help you reach your target audience effectively. What topics interest your audience?"
        ],
        email: [
            "Email marketing is still one of the most effective channels. Would you like to discuss email campaign strategies?",
            "Let's create an engaging email marketing strategy. What's your current email list size?",
            "Email marketing can provide great ROI. What type of email campaigns are you interested in?"
        ],
        analytics: [
            "Analytics are essential for measuring success. What metrics are you currently tracking?",
            "Let's analyze your marketing performance. What specific data would you like to focus on?",
            "Understanding your analytics can help optimize your strategy. What are your key performance indicators?"
        ],
        default: [
            "I understand you're interested in marketing. Could you please provide more specific details about what you'd like to know?",
            "That's an interesting topic. Let me help you with that. Could you elaborate more?",
            "I'd be happy to help you with your marketing needs. What specific aspect would you like to discuss?"
        ]
    };

    // Keywords for response matching
    const keywords = {
        socialMedia: ['social media', 'facebook', 'instagram', 'twitter', 'linkedin', 'social'],
        content: ['content', 'blog', 'article', 'video', 'infographic', 'content marketing'],
        email: ['email', 'newsletter', 'campaign', 'mailing list', 'email marketing'],
        analytics: ['analytics', 'data', 'metrics', 'kpi', 'performance', 'tracking', 'measure']
    };

    function getRandomResponse(category) {
        const responses = marketingResponses[category] || marketingResponses.default;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function detectCategory(message) {
        message = message.toLowerCase();
        for (const [category, words] of Object.entries(keywords)) {
            if (words.some(word => message.includes(word))) {
                return category;
            }
        }
        return 'default';
    }

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserMessage(message) {
        if (!message.trim()) return;
        
        // Add user message
        addMessage(message, true);
        
        // Simulate typing delay
        setTimeout(() => {
            const category = detectCategory(message);
            const response = getRandomResponse(category);
            addMessage(response);
        }, 1000);
    }

    // Event listeners
    sendButton.addEventListener('click', () => {
        handleUserMessage(userInput.value);
        userInput.value = '';
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage(userInput.value);
            userInput.value = '';
        }
    });

    // Focus input on load
    userInput.focus();
}); 