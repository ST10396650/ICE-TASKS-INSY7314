const mongoose = require('mongoose'); // this will be used later
const app = require('./app');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const options = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem'),
};

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: "Hello, backend", status: "success" });
});

https.createServer(options, app).listen(PORT, () => {
  console.log('Server running at https://localhost:' + PORT);
});