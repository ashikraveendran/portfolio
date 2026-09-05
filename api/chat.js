const path = require('path');
const context = require(path.join(__dirname, 'portfolio-context.json'));

const permissionDeniedMessage = 'Permission denied.';
const offensiveMessage = 'Wait a minute, WHO ARE YOU!';
const portfolioFallback = "I'm Ashik Raveendran's portfolio chatbot. I can help with his profile, education, experience, skills, and projects.";

function isRestrictedRequest(message) {
  return /\b(sudo|admin(?:istrator)?|root access|superuser|chmod|rm\s+-rf|bypass(?:\s+security)?|delete all)\b/i.test(message);
}

function isOffensiveRequest(message) {
  return /\b(fuck|shit|bitch|asshole|bastard|idiot|moron|obscene)\b/i.test(message);
}

module.exports = async function handler(req, res) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  if (req.method !== 'POST') {
    console.warn('[api/chat] Method not allowed');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== 'string' || !message.trim()) {
    console.warn('[api/chat] Missing or invalid message body');
    return res.status(400).json({ error: 'Message is required.' });
  }

  console.log('[api/chat] Incoming request:', message.slice(0, 120));

  if (isRestrictedRequest(message)) {
    console.warn('[api/chat] Restricted request blocked');
    return res.status(200).json({ reply: permissionDeniedMessage, image: 'whoru.jpg' });
  }

  if (isOffensiveRequest(message) && !/\b(suicide|suicidal|kill myself|self[- ]harm)\b/i.test(message)) {
    console.warn('[api/chat] Offensive request redirected');
    return res.status(200).json({ reply: offensiveMessage, image: 'whoru.jpg' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('[api/chat] GROQ_API_KEY is missing');
    return res.status(500).json({ error: 'GROQ_API_KEY is not configured.' });
  }

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
    `- Work experience: ${context.profile.experience.join('; ')}`,
    `- Technical skills: ${context.profile.technicalSkills.join(', ')}`,
    `- Projects: ${context.profile.projects.join(', ')}`,
  ].join('\n');

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: systemText },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 220,
        top_p: 1,
      }),
    });

    if (!groqResponse.ok) {
      const text = await groqResponse.text();
      console.error('[api/chat] Groq API error:', groqResponse.status, text);
      return res.status(502).json({ error: text || 'Groq request failed.' });
    }

    const data = await groqResponse.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || portfolioFallback;
    const image = /^i\s+don't\s+know\b/i.test(reply) ? 'idk.jpg' : undefined;

    console.log('[api/chat] Groq reply preview:', reply.slice(0, 120));
    return res.status(200).json({ reply, ...(image ? { image } : {}) });
  } catch (error) {
    console.error('[api/chat] Unhandled error:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
};
