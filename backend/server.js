const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require('child_process');
const fs = require('fs');

// Load environment variables
require("dotenv").config();

const app = express();
const port = process.env.PORT|| 5000;

app.use(cors());
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// OpenAI API key and endpoint
const apiKey = process.env.API_KEY; // Use environment variable
const apiUrl = "https://api.cohere.ai/v1/generate";

app.post('/run-code', (req, res) => {
    const code = req.body.code;
    // console.log(code);

  
    if (typeof code !== 'string') {
      res.status(400).json({ error: 'Invalid code format' });
      return;
    }
  
    // Create a temporary file to store the code
    const filePath = 'temp.js';
    fs.writeFileSync(filePath, code);
  
    // Execute the code
    exec(`node ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing code: ${error}`);
        res.json({ output: stderr });
        return;
      }
      console.log(`Code executed successfully: ${stdout}`);
      res.json({ output: stdout });
    });
  });
// Route to handle query requests
app.post("/api/query", async (req, res) => {
    const query = req.body.query; // Getting the query from the route parameter
  // console.log(query);
    try {
      // Make a POST request to the API
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

      // Log the response data to the console
    //   console.log("Response from API:", response.data);

      // Send the generated text back to the client
      res.send(response.data); // Assuming you're in an Express.js environment
    }
   catch (error) {
    console.error("Error generating text:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// app.post('',)
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());



// const PORT = 5000;
// app.listen(PORT, () => console.log(Server running on port ${PORT}));