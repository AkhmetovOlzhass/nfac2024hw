import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import connectDB from './db';
import cors from 'cors';
import globalRouter from './routes/global-router';
import { logger } from './logger';

connectDB().catch(err => {
  console.error("Database connection failed", err);
  process.exit(1);
});

const app = express();

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(cors({
  origin: 'https://nfac2024hw-ehsp.vercel.app',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(logger);
app.use('/api/v5', globalRouter);

const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
  cors: {
    origin: "https://nfac2024hw-ehsp.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

httpServer.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at https://nfac2024hw-ehsp.vercel.app on port ${process.env.PORT || 5000}`);
});