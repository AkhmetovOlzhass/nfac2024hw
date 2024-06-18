import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import connectDB from './db';
import cors from 'cors';
import globalRouter from './routes/global-router';
import { logger } from './logger';
import 'dotenv/config';

connectDB();

const app = express();

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});


const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://nfac2024hw.vercel.app' : 'http://localhost:3000';

// http://localhost:3000
//'https://nfac2024hw.vercel.app'

app.use(cors({
  origin: BASE_URL,
  credentials: true
}));

app.use(express.json());
app.use(logger);
app.use('/api/v5', globalRouter);

const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
  cors: {
    origin: BASE_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  

  socket.on('updateTrack', (data) => {
    io.emit('trackUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

httpServer.listen(5000, () => {
  console.log(`Server running at ${BASE_URL}`);
});