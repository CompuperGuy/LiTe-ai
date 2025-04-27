document.addEventListener('DOMContentLoaded', () => {
  let loadingProgress = 0;
  const loadingBar = document.getElementById('loading-bar');

  const loadInterval = setInterval(() => {
    loadingProgress += 1;
    loadingBar.style.width = `${loadingProgress}%`;
    if (loadingProgress >= 100) {
      clearInterval(loadInterval);
      setTimeout(showChatScreen, 500);
    }
  }, 30);
});

function showChatScreen() {
  document.getElementById('boot-screen').style.display = 'none';
  document.getElementById('chat-screen').style.display = 'flex';
  document.getElementById('conversation').innerHTML = "LiTe ai v1.1 ready. Brain activated. Hello, friend!";
}
