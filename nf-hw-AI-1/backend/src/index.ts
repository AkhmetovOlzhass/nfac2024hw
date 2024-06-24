import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import { Message } from './controllers/chatController';



const { setupSocket } = require('./controllers/chatController');

const app = express();
app.use(cors());

app.use(express.json());

const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: "https://nfac2024hw-bbzx.vercel.app",
        methods: ["GET", "POST"]
    }
});

app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.send(messages);
    } catch (error) {
        res.status(500).send("Error fetching messages");
    }
});

setupSocket(io);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));