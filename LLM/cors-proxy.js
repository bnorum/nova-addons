const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express(); // ✅ define app first
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/generate', async (req, res) => {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    if (req.body.stream) {
      // Stream response back to client
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Transfer-Encoding', 'chunked');
      response.body.pipe(res);
    } else {
      // Normal JSON response
      const data = await response.json();
      res.json(data);
    }
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: 'Proxy error: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`CORS proxy listening on http://localhost:${PORT}`);
});
