const CHAT_API_URL = '/api/chat';

async function askGroq(message) {
  const response = await fetch(CHAT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Chat request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return {
    reply: data.reply || "I'm Ashik Raveendran's portfolio chatbot. I can help with his profile, education, experience, skills, and projects.",
    image: data.image
  };
}

function updateTerminalCursorPosition() {
  const value = terminalInput.value || '';
  const computedStyle = window.getComputedStyle(terminalInput);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    return;
  }

  context.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
  const textWidth = context.measureText(value).width;
  const paddingLeft = parseFloat(computedStyle.paddingLeft || '0');
  const paddingRight = parseFloat(computedStyle.paddingRight || '0');
  const caretOffset = textWidth + paddingLeft + paddingRight + 2;

  terminalCursor.style.left = `${caretOffset}px`;
}

function appendTerminalImage(src) {
  const line = document.createElement('div');
  line.className = 'terminal-line assistant';

  const meta = document.createElement('div');
  meta.className = 'terminal-meta';

  const name = document.createElement('span');
  name.className = 'terminal-name assistant';
  name.textContent = 'bot@ashik-dev';

  const prompt = document.createElement('span');
  prompt.className = 'terminal-prompt';
  prompt.textContent = '$';

  meta.append(name, prompt);

  const content = document.createElement('div');
  content.className = 'terminal-content terminal-image-wrap';

  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Chatbot status';
  img.className = 'terminal-image';

  content.appendChild(img);
  line.append(meta, content);
  terminalOutput.insertBefore(line, promptRow);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function isIdentityPrompt(message) {
  return /^(who are you|who r you|what are you|what is this chatbot|what's this chatbot)\??$/i.test(message.trim());
}

function clearTerminal() {
  terminalOutput.innerHTML = '';
  terminalOutput.appendChild(promptRow);
  terminalInput.value = '';
  terminalInput.disabled = false;
  terminalInput.focus();
  updateTerminalCursorPosition();
}

terminalInput.addEventListener('input', updateTerminalCursorPosition);
terminalInput.addEventListener('focus', updateTerminalCursorPosition);
terminalInput.addEventListener('keydown', async (event) => {
  if (event.key !== 'Enter') return;

  event.preventDefault();

  const message = terminalInput.value.trim();
  if (!message) return;

  // --- DEBUG LOGGING: remove once issue is confirmed fixed ---
  console.log('[debug] raw input:', JSON.stringify(message));
  console.log('[debug] identity match:', isIdentityPrompt(message));
  // --- end debug logging ---

  if (message.toLowerCase() === 'clear') {
    clearTerminal();
    return;
  }

  appendTerminalLine('user', `${message}`);
  terminalInput.value = '';
  terminalInput.disabled = true;
  updateTerminalCursorPosition();

  if (isIdentityPrompt(message)) {
    appendTerminalLine('assistant', "I'm Ashik Raveendran's portfolio chatbot. I can help with his profile, education, experience, skills, and projects.");
    terminalInput.disabled = false;
    terminalInput.focus();
    updateTerminalCursorPosition();
    return;
  }

  try {
    const result = await askGroq(message);
    console.log('[debug] askGroq raw response:', result); // remove once issue is confirmed fixed
    appendTerminalLine('assistant', result.reply);
    if (result.image) {
      appendTerminalImage(result.image);
    }
  } catch (error) {
    console.error('[debug] askGroq error:', error); // remove once issue is confirmed fixed
    appendTerminalLine('assistant', 'Sorry, under maintenance.');
  } finally {
    terminalInput.disabled = false;
    terminalInput.focus();
    updateTerminalCursorPosition();
  }
});

setTimeout(() => {
  terminalInput.focus();
  updateTerminalCursorPosition();
}, 50);