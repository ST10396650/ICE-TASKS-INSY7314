const express = require('express');
const cors = require('cors'); // this will be discussed later
const helmet = require('helmet'); // this will be discussed later
const dotenv = require('dotenv');
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use(cors({
  origin: "https://localhost:5173",
  credentials: true
}));

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: `Welcome, user ${req.user.id}! You have accessed protected data.`,
    timestamp: new Date()
  });
});

app.get('/', (req, res) => {
res.send('PulseVote API running!');
});


module.exports = app;