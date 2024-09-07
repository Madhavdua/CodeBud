const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

// Load environment variables
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// OpenAI API key and endpoint
const apiKey = process.env.API_KEY; // Use environment variable
const apiUrl = 'https://api.cohere.ai/v1/generate';

// Route to handle query requests
app.post('/api/query', async (req, res) => {
  try {
      const { query } = req.body;
      const response = await axios.post(
          apiUrl,
          {
              prompt: query,
              max_tokens: 50  // Adjust as needed
          },
          {
              headers: {
                  'Authorization': `Bearer ${apiKey}`,
                  'Content-Type': 'application/json'
              }
          }
      );

      // Send the generated text back to the client
      res.json(response.data);
  } catch (error) {
      console.error('Error generating text:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


