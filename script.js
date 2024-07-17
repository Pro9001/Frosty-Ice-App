// app.js

const socket = io();

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if (message) {
        displayMessage('sent', message);
        socket.emit('sendMessage', message);
        input.value = '';
    }
}

socket.on('receiveMessage', (message) => {
    displayMessage('received', message);
});

function displayMessage(type, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = message;
    document.getElementById('messages').appendChild(messageElement);
    messageElement.scrollIntoView();
}
