const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chatdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Chat schema
const chatSchema = new mongoose.Schema({
    user: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Chatbot backend is running');
});

app.post('/api/chat', async (req, res) => {
    const { user, message } = req.body;
    const chatMessage = new Chat({ user, message });
    await chatMessage.save();
    res.status(201).send(chatMessage);
});

app.get('/api/chat', async (req, res) => {
    const chatMessages = await Chat.find().sort({ timestamp: -1 });
    res.status(200).send(chatMessages);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
s