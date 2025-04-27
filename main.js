let currentMode = 'chat';

function sendMessage() {
  const inputField = document.getElementById('user-input');
  const userMessage = inputField.value.trim();
  if (userMessage !== '') {
    displayMessage(userMessage, 'user');
    inputField.value = '';
    processUserMessage(userMessage);
  }
}

function displayMessage(message, sender) {
  const conversation = document.getElementById('conversation');
  const messageElement = document.createElement('div');
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  conversation.appendChild(messageElement);
  conversation.scrollTop = conversation.scrollHeight;
}

function processUserMessage(message) {
  // Here, you can integrate your logic for intelligent responses, training, or image generation.
  // For now, let's just simulate a response.
  setTimeout(() => {
    const response = "I'm still learning, but thank you for your question!";
    displayMessage(response, 'ai');
  }, 1000);
}

function toggleImageMode() {
  if (currentMode === 'chat') {
    currentMode = 'image';
    document.getElementById('image-toggle').textContent = "Switch to Chat Mode";
    displayMessage("Switching to Image Mode. Type to generate images!", 'ai');
  } else {
    currentMode = 'chat';
    document.getElementById('image-toggle').textContent = "Switch to Image Mode";
    displayMessage("Back to Chat Mode.", 'ai');
  }
}
