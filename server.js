const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const initialPort = Number(process.env.PORT) || 3001;

app.use(express.json());
app.use(express.static(__dirname));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') {
      console.warn('[chat] Missing or invalid message body');
      return res.status(400).json({ error: 'Message is required.' });
    }

    console.log('[chat] Incoming request:', message.slice(0, 120));

    const contextText = await fs.readFile(path.join(__dirname, 'portfolio-context.json'), 'utf8');
    const context = JSON.parse(contextText);

    const systemText = [
      `You are ${context.assistant}.`,
      '',
      ...context.instructions,
      '',
      'Profile:',
      `- Name: ${context.profile.name}`,
      `- Role: ${context.profile.role}`,
      `- Current education: ${context.profile.currentEducation}`,
      `- Previous education: ${context.profile.previousEducation}`,
      `- Location: ${context.profile.location}`,
      `- Email: ${context.profile.email}`,
      `- Research focus: ${context.profile.researchFocus.join(', ')}`,
      `- Experience: ${context.profile.experience.join('; ')}`,
      `- Technical skills: ${context.profile.technicalSkills.join(', ')}`,
      `- Projects: ${context.profile.projects.join(', ')}`,
    ].join('\n');

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: systemText },
          { role: 'user', content: message },
        ],
        temperature: 0.6,
        max_tokens: 220,
        top_p: 1,
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error('[chat] Groq API error:', groqResponse.status, errorText);
      return res.status(502).json({ error: errorText || 'Groq request failed.' });
    }

    const data = await groqResponse.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "I'm Ashik Raveendran's portfolio chatbot. I can help with his profile, education, experience, skills, and projects.";

    console.log('[chat] Groq reply preview:', reply.slice(0, 120));
    return res.json({ reply });
  } catch (error) {
    console.error('[chat] Unhandled error:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Portfolio server running on http://localhost:${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.warn(`Port ${port} is busy. Retrying on ${nextPort}...`);
      startServer(nextPort);
      return;
    }

    throw error;
  });
}

startServer(initialPort);
