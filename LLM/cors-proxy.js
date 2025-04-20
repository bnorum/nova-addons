const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const app = express();
const PORT = 3000; // or any other free port

app.use(cors()); // Allow all origins
app.use(bodyParser.json());

app.post('/api/generate', async (req, res) => {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`CORS proxy listening on http://localhost:${PORT}`);
});
