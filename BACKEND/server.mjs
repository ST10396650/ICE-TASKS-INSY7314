const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const fruitsRoutes = require('./routes/fruit');

const app = express();
const PORT = 3000;

// SSL Certificate options
const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
};

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// CORS headers middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

// Routes
app.use('/fruit', fruitsRoutes);
app.use('/user', userRoutes);

// Create HTTPS server
let server = https.createServer(options, app);

const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const { ObjectId } = require('mongodb');

const router = express.Router();

// Create a new record (Protected route)
router.post('/upload', checkAuth, async (req, res) => {
    try {
        const newDocument = {
            user: req.body.user,
            content: req.body.content,
            image: req.body.image
        };
        
        const collection = await db.collection("posts");
        const result = await collection.insertOne(newDocument);
        
        res.send(result).status(204);
        
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a record by id (Protected route)
router.patch('/update/:id', checkAuth, async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                name: req.body.name,
                comment: req.body.comment
            }
        };
        
        const collection = await db.collection("posts");
        const result = await collection.updateOne(query, updates);
        
        res.send(result).status(200);
        
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
