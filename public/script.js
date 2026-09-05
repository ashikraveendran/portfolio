const fileData = [
  { name: 'about.md', tab: 'about', active: true },
  { name: 'education.md', tab: 'education' },
  { name: 'experience.md', tab: 'experience' },
  { name: 'projects.md', tab: 'projects' },
  { name: 'skills.md', tab: 'skills' },
];

const tabContent = {
  home: `
    <div class="resume-layout">
      <div class="resume-header">
        <div>
          <span class="eyebrow">Portfolio / Profile</span>
          <h1>Ashik Raveendran</h1>
        </div>
        <div class="resume-meta">
          <span>📍 Bengaluru, Karnataka</span>
          <span>✉️ ashikraveendran@gmail.com</span>
        </div>
      </div>

      <section class="resume-section">
        <h2>Education</h2>
        <div class="resume-item">
          <div class="item-title-row">
            <strong>Indian Institute of Science, Bengaluru</strong>
            <span>2024 – 2026</span>
          </div>
          <div class="item-detail">M.Tech - Signal Processing</div>
          <div class="item-place">Bengaluru, Karnataka</div>
        </div>
        <div class="resume-item">
          <div class="item-title-row">
            <strong>Government College of Engineering, Kannur</strong>
            <span>2018 - 2022</span>
          </div>
          <div class="item-detail">B.Tech - Mechanical Engineering</div>
          <div class="item-place">Kannur, Kerala</div>
        </div>
      </section>

      <section class="resume-section">
        <h2>Experience</h2>
        <div class="resume-item">
          <div class="item-title-row">
            <strong>Data Scientist</strong>
            <span>Netradyne</span>
          </div>
          <div class="item-detail">AI Intern</div>
          <div class="item-place">Aug 2025 – Present</div>
        </div>
        <div class="resume-item">
          <div class="item-title-row">
            <strong>L2M Rail</strong>
            <span>Bengaluru, Karnataka</span>
          </div>
          <div class="item-detail">AI Intern</div>
        </div>
      </section>

      <section class="resume-section">
        <h2>Projects</h2>
        <div class="project-card">
          <div class="item-title-row">
            <strong>AI for Railways</strong>
            <span>PyTorch, ViT, CNN</span>
          </div>
          <p>Anomaly detection in image data using a ViT–CNN model.</p>
          <ul>
            <li>Implemented a Vision Transformer-CNN encoder-decoder model for anomaly detection on the MVTech dataset, identifying anomalies via reconstruction errors.</li>
            <li>Evaluated model performance using AUROC.</li>
          </ul>
        </div>
        <div class="project-card">
          <div class="item-title-row">
            <strong>Anomaly detection in time series data using VAE-LSTM</strong>
            <span>Tensorflow, VAE, LSTM</span>
          </div>
          <p>Developed a VAE-LSTM model for anomaly detection in time series data.</p>
          <ul>
            <li>Evaluated using F1 Score, Recall, Precision, and Accuracy.</li>
          </ul>
        </div>
      </section>

      <section class="resume-section">
        <h2>Technical Skills</h2>
        <div class="skills-grid">
          <span class="tag">Python</span>
          <span class="tag">C++</span>
          <span class="tag">PyTorch</span>
          <span class="tag">TensorFlow</span>
          <span class="tag">MATLAB</span>
          <span class="tag">LaTeX</span>
          <span class="tag">Figma</span>
        </div>
      </section>
    </div>
  `,
  about: `
    <div class="resume-layout single-page">
      <div class="resume-header">
        <div>
          <span class="eyebrow">About</span>
          <h1>Ashik Raveendran</h1>
        </div>
      </div>
      <section class="resume-section">
        <p class="about-copy">I am currently working as a Data Scientist, with a strong focus on machine learning, computer vision, and NLP. I have completed my M.Tech in Signal Processing from IISc Bengaluru and have worked on projects related to AI on railway systems, anomaly detection, and Gen-AI.</p>
      </section>
    </div>
  `,
  education: `
    <div class="resume-layout single-page">
      <div class="resume-header">
        <div>
          <span class="eyebrow">Education</span>
          <h1>Academic Background</h1>
        </div>
      </div>
      <section class="resume-section">
        <div class="resume-item">
          <div class="item-title-row">
            <strong>Indian Institute of Science, Bengaluru</strong>
            <span>2024 – 2026</span>
          </div>
          <div class="item-detail">M.Tech - Signal Processing</div>
          <div class="item-place">Bengaluru, Karnataka</div>
        </div>
        <div class="resume-item">
          <div class="item-title-row">
            <strong>Government College of Engineering, Kannur</strong>
            <span>2018 - 2022</span>
          </div>
          <div class="item-detail">B.Tech - Mechanical Engineering</div>
          <div class="item-place">Kannur, Kerala</div>
        </div>
      </section>
    </div>
  `,
  experience: `
    <div class="resume-layout single-page">
      <div class="resume-header">
        <div>
          <span class="eyebrow">Experience</span>
          <h1>Professional Journey</h1>
        </div>
      </div>
      <section class="resume-section">
        <div class="resume-item">
          <div class="item-title-row">
            <strong>Data Scientist</strong>
            <span>Netradyne</span>
          </div>
          <div class="item-place">Bengaluru, Karnataka</div>
          <div class="item-place">July 2026 – Present</div>
        </div>
        <div class="resume-item">
          <div class="item-title-row">
            <strong>AI Intern</strong>
            <span>L2M Rail</span>
          </div>
          <div class="item-place">Bengaluru, Karnataka</div>
          <div class="item-place">June 2025 – June 2026</div>
        </div>
      </section>
    </div>
  `,
  projects: `
    <div class="resume-layout single-page">
      <div class="resume-header">
        <div>
          <span class="eyebrow">Projects</span>
          <h1>Selected Work</h1>
        </div>
      </div>
      <section class="resume-section">
        <div class="project-card">
          <p>Updating soon.</p>
        </div>
      </section>
    </div>
  `,
  skills: `
    <div class="resume-layout single-page">
      <div class="resume-header">
        <div>
          <span class="eyebrow">Skills</span>
          <h1>Technical Toolkit</h1>
        </div>
      </div>
      <section class="resume-section">
        <div class="skills-grid">
          <span class="tag">Python</span>
          <span class="tag">C++</span>
          <span class="tag">PyTorch</span>
          <span class="tag">TensorFlow</span>
          <span class="tag">MATLAB</span>
          <span class="tag">Latex</span>
          <span class="tag">MS Office</span>
          <span class="tag">Photoshop</span>
          <span class="tag">Figma</span>
        </div>
      </section>
    </div>
  `,
};

const codeLines = [
  { type: 'comment', value: '// personal portfolio / 2026' },
  { type: 'key', value: 'const' },
  { type: 'var', value: 'developer' },
  { type: 'bracket', value: ':' },
  { type: 'key', value: 'Portfolio' },
  { type: 'bracket', value: ' = ' },
  { type: 'bracket', value: '{' },
  { type: 'key', value: 'name' },
  { type: 'bracket', value: ': ' },
  { type: 'string', value: '"Ashik"' },
  { type: 'bracket', value: ',' },
  { type: 'key', value: 'role' },
  { type: 'bracket', value: ': ' },
  { type: 'string', value: '"Full Stack Developer"' },
  { type: 'bracket', value: ',' },
  { type: 'key', value: 'location' },
  { type: 'bracket', value: ': ' },
  { type: 'string', value: '"Remote / Worldwide"' },
  { type: 'bracket', value: ',' },
  { type: 'key', value: 'focus' },
  { type: 'bracket', value: ': ' },
  { type: 'string', value: '"Product Design & Web Experiences"' },
  { type: 'bracket', value: '' },
  { type: 'comment', value: '// building polished interfaces and meaningful products' },
  { type: 'var', value: 'console' },
  { type: 'bracket', value: '.log(' },
  { type: 'string', value: '"Available for collaboration"' },
  { type: 'bracket', value: ');' },
];

const fileList = document.getElementById('fileList');
const codeBlock = document.getElementById('codeBlock');
const terminalOutput = document.getElementById('terminalOutput');

const promptRow = document.createElement('div');
promptRow.className = 'terminal-line prompt-row';

const promptMeta = document.createElement('div');
promptMeta.className = 'terminal-meta';

const promptUser = document.createElement('span');
promptUser.className = 'terminal-name user';
promptUser.textContent = 'guest@ashik-dev';

const promptSymbol = document.createElement('span');
promptSymbol.className = 'terminal-prompt';
promptSymbol.textContent = '$';

const terminalInputShell = document.createElement('div');
terminalInputShell.className = 'terminal-input-shell';

const terminalInput = document.createElement('input');
terminalInput.id = 'terminalInput';
terminalInput.type = 'text';
terminalInput.autocomplete = 'off';
terminalInput.placeholder = '';
terminalInput.className = 'terminal-input';
terminalInput.setAttribute('aria-label', 'Terminal input');

const terminalCursor = document.createElement('span');
terminalCursor.className = 'terminal-cursor';

terminalInputShell.appendChild(terminalInput);
terminalInputShell.appendChild(terminalCursor);

promptMeta.appendChild(promptUser);
promptMeta.appendChild(promptSymbol);
promptRow.appendChild(promptMeta);
promptRow.appendChild(terminalInputShell);
terminalOutput.appendChild(promptRow);

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const themeLabel = themeToggle.querySelector('.theme-label');
const THEME_KEY = 'portfolio-theme';

function getStoredTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
}

function setTheme(theme) {
  const isLight = theme === 'light';
  document.body.classList.toggle('light-theme', isLight);
  localStorage.setItem(THEME_KEY, theme);
  themeIcon.textContent = isLight ? '☀' : '☾';
  themeLabel.textContent = isLight ? 'Light' : 'Dark';
  themeToggle.setAttribute('aria-pressed', String(isLight));
}

function renderFiles() {
  fileList.innerHTML = fileData
    .map(
      (file) => `
        <li class="file-item ${file.active ? 'active' : ''}" data-tab="${file.tab}" tabindex="0" role="button" aria-label="Open ${file.name}">
          <span class="file-icon">📄</span>
          <span>${file.name}</span>
        </li>
      `
    )
    .join('');
}

function setActiveFile(tabName) {
  fileData.forEach((file) => {
    file.active = file.tab === tabName;
  });
  renderFiles();
}

function renderCode(tab = 'about') {
  codeBlock.innerHTML = tabContent[tab] || tabContent.about;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));
}

function renderMarkdown(text) {
  const escaped = escapeHtml(text);
  const withInline = escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');

  return withInline
    .split(/\n\s*\n/)
    .filter((block) => block.trim())
    .map((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
      if (lines.length === 1 && /^[-*+]\s+/.test(lines[0])) {
        const items = lines.map((item) => `<li>${item.replace(/^[-*+]\s+/, '')}</li>`).join('');
        return `<ul>${items}</ul>`;
      }
      if (lines.some((line) => /^[-*+]\s+/.test(line))) {
        const items = lines.map((item) => `<li>${item.replace(/^[-*+]\s+/, '')}</li>`).join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${block.replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
}

function appendTerminalLine(type, text) {
  const line = document.createElement('div');
  line.className = `terminal-line ${type}`;

  const meta = document.createElement('div');
  meta.className = 'terminal-meta';

  const name = document.createElement('span');
  name.className = `terminal-name ${type}`;
  name.textContent = type === 'assistant' ? 'bot@ashik-dev' : 'guest@ashik-dev';

  const prompt = document.createElement('span');
  prompt.className = 'terminal-prompt';
  prompt.textContent = '$';

  meta.appendChild(name);
  meta.appendChild(prompt);

  const content = document.createElement('div');
  content.className = 'terminal-content';
  content.innerHTML = renderMarkdown(String(text));

  line.appendChild(meta);
  line.appendChild(content);
  terminalOutput.insertBefore(line, promptRow);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
  setTheme(nextTheme);
});

function activateTab(tabName) {
  document.querySelectorAll('.tab').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tabName);
  });
  setActiveFile(tabName);
  renderCode(tabName);
}

document.querySelectorAll('.tab').forEach((tabButton) => {
  tabButton.addEventListener('click', () => {
    activateTab(tabButton.dataset.tab);
  });
});

fileList.addEventListener('click', (event) => {
  const item = event.target.closest('.file-item');
  if (!item) return;
  activateTab(item.dataset.tab);
});

fileList.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const item = event.target.closest('.file-item');
  if (!item) return;
  event.preventDefault();
  activateTab(item.dataset.tab);
});

renderFiles();
activateTab('about');
setTheme(getStoredTheme());
terminalOutput.appendChild(promptRow);
appendTerminalLine('assistant', 'Welcome! Ask me anything.');

