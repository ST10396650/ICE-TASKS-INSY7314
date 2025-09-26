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

app.use(
helmet.contentSecurityPolicy({
    directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://apis.google.com"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'", "http://localhost:5000"], // or whichever port you use
    },
})
);

app.get('/', (req, res) => {
res.send('PulseVote API running!');
});

const organisationRoutes = require("./routes/organisationRoutes");

app.use("/api/organisations", organisationRoutes);

const pollRoutes = require("./routes/pollRoutes");

app.use("/api/polls", pollRoutes);

const express = require('express');


app.set('trust proxy', 1);

app.use(express.json());

app.get('/health', (req, res) => 
res.status(200).json({
    ok: true,
    ts: Date.now()
}));

module.exports = app;