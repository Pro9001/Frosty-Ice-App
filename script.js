const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() !== '') {
        addMessageToChat('user', userMessage);
        userInput.value = '';
        getBotResponse(userMessage);
    }
}

function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(userMessage) {
    // Simple bot response logic (you can enhance this with more advanced logic or an API call)
    const botMessage = `DT ROBO says: You said "${userMessage}"`;
    setTimeout(() => {
        addMessageToChat('bot', botMessage);
    }, 1000);
}
