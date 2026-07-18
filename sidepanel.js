document.addEventListener('DOMContentLoaded', async () => {
  const setupView = document.getElementById('setup-view');
  const mainView = document.getElementById('main-view');
  const apiKeyInput = document.getElementById('api-key-input');
  const saveKeyBtn = document.getElementById('save-key-btn');
  // const clearKeyBtn = document.getElementById('clear-key-btn');

  // Check if API Key is already stored in local storage
  const data = await chrome.storage.local.get(['gemini_api_key']);
  
  if (data.gemini_api_key) {
    showMainView();
  } else {
    showSetupView();
  }

  // Handle Save button click
  saveKeyBtn.addEventListener('click', async () => {
    const key = apiKeyInput.value.trim();
    if (key) {
      await chrome.storage.local.set({ 'gemini_api_key': key });
      apiKeyInput.value = ''; // clear input field
      showMainView();
    } else {
      alert('Please enter a valid Gemini API key!');
    }
  });

  // Handle Clear/Reset button click
  clearKeyBtn.addEventListener('click', async () => {
    await chrome.storage.local.remove('gemini_api_key');
    showSetupView();
  });

  function showMainView() {
    setupView.classList.add('hidden');
    mainView.classList.remove('hidden');
  }

  function showSetupView() {
    mainView.classList.add('hidden');
    setupView.classList.remove('hidden');
  }
});