document.getElementById('sendButton').addEventListener('click', function() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (message !== '') {
        const chatMessages = document.getElementById('chatMessages');
        const newMessage = document.createElement('div');
        newMessage.textContent = message;
        newMessage.className = 'chat-message';
        chatMessages.appendChild(newMessage);
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('sendButton').click();
    }
});
