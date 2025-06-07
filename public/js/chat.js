// WebSocket connection
const ws = new WebSocket('ws://' + window.location.host + '/ws');

ws.onopen = function() {
    console.log('Connected to server');
    document.getElementById('status').textContent = 'Connected';
};

ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log('Received message:', data);
    
    if (data.type === 'message') {
        addMessage(data.from, data.text);
    } else if (data.type === 'session') {
        window.sessionId = data.sessionId;
        console.log('Session ID received:', data.sessionId);
    }
};

function addMessage(from, text) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    let messageClass = '';
    if (from === 'User') {
        messageClass = 'user';
    } else if (from === 'Admin') {
        messageClass = 'admin';
    } else if (from === 'System') {
        messageClass = 'bot'; // Using 'bot' style for system messages
    } else {
        messageClass = 'bot'; // Default to bot style for any other 'from' source
    }

    messageDiv.classList.add(messageClass);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.textContent = text;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    // Scroll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ... rest of the chat.js code ... 