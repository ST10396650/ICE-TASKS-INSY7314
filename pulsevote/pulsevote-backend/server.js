const mongoose = require('mongoose'); // this will be used later
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: "Hello, backend", status: "success" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});