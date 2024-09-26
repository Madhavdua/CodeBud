const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require('child_process');
const fs = require('fs');

// Load environment variables
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// CORS setup: Allow requests from specific origins if needed, else default to allowing all.
app.use(cors({
  origin: '*'  // In production, change '*' to a specific domain (e.g., 'https://yourdomain.com')
}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Check if the API key is available
if (!process.env.API_KEY) {
  console.error("No API key found. Please set the API_KEY in the environment variables.");
  process.exit(1);
}

const apiKey = process.env.API_KEY;
const apiUrl = "https://api.cohere.ai/v1/generate";

// Route to execute user-submitted code
app.post('/run-code', (req, res) => {
  const code = req.body.code;

  if (typeof code !== 'string') {
    res.status(400).json({ error: 'Invalid code format' });
    return;
  }

  const filePath = 'temp.js';
  
  try {
    // Write the code to a temporary file
    fs.writeFileSync(filePath, code);

    // Execute the code using Node.js
    exec(`node ${filePath}`, (error, stdout, stderr) => {
      // Clean up the temporary file after execution
      fs.unlinkSync(filePath);

      if (error) {
        console.error(`Execution error: ${error}`);
        res.status(500).json({ output: stderr });
        return;
      }

      res.json({ output: stdout });
    });

  } catch (err) {
    console.error('Error handling code execution:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to handle query requests
app.post("/api/query", async (req, res) => {
  const query = req.body.query;

  if (!query || typeof query !== 'string') {
    res.status(400).json({ error: 'Invalid query format' });
    return;
  }

  try {
    const response = await axios.post(
      apiUrl,
      {
        prompt: query,
        max_tokens: 200, // Adjust as needed
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Send the generated text back to the client
    res.send(response.data);

  } catch (error) {
    console.error("Error generating text:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
