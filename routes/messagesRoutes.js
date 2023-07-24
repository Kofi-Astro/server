const express = require('express');
const router = express.Router();
const Message = require('../models/message');


// Create a new message
router.post('/', async (req, res) => {
    try {
        const { content, sender, recipient, timestamp, attachment } = req.body;
        const newMessage = new Message({
            content,
            sender,
            recipient,
            timestamp,
            attachment,
        });

        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.error('Message creation error: ', error);
    }
});


// Get all messages between two users(sender and recipient)
router.get('/:sender/:recipient', async (req, res) => {
    try {
        const { sender, recipient } = req.params;
        const messages = await Message.find({
            $or: [
                {
                    sender, recipient
                },
            ],
        }).sort({ timestamp: 1 }); // Sort by timestamp in ascending order
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log(`Error getting message for ${sender} to ${recipient}: `, error);
    }
});


module.exports = router;
















