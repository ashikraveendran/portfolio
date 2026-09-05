const express = require('express');
const path = require('path');
const chatHandler = require('./api/chat');

const app = express();
const preferredPort = Number(process.env.PORT) || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.post('/api/chat', chatHandler);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'portfolio-chatbot' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Portfolio app running on http://localhost:${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.warn(`Port ${port} is busy, retrying on ${nextPort}`);
      if (nextPort <= preferredPort + 10) {
        startServer(nextPort);
        return;
      }
      console.error('No free port found in the fallback range.');
      process.exit(1);
    }
    throw error;
  });
}

startServer(preferredPort);
