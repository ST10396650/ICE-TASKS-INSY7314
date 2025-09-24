const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ExpressBrute = require('express-brute');
const { ObjectId } = require('mongodb');
const User = require('../models/User');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();


const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);


router.post('/signup', async (req, res) => {
    try {
        const { name, password } = req.body;
        
       
        const hashedPassword = await bcrypt.hash(password, 10);
        
        
        const newDocument = {
            name: req.body.name,
            password: hashedPassword
        };
        
       
        const collection = await db.collection("users");
        const result = await collection.insertOne(newDocument);
        
        console.log(password);
        res.send(result).status(204);
        
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/login', bruteforce.prevent, async (req, res) => {
    try {
        const { name, password } = req.body;
        
        
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        
        
        const token = jwt.sign(
            { 
                userId: user._id,
                name: user.name 
            },
            "this_secret_should_be_longer_than_it_is",
            { expiresIn: '1h' }
        );
        
        res.status(200).json({
            message: 'Authentication successful',
            token: token,
            insertedId: user._id
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const userId = req.params.id;
        
       
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        
        
        const result = await User.findByIdAndDelete(userId);
        
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({ message: 'User deleted successfully' });
        
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;