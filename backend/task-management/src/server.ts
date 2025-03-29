import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { connectDB } from './config/database';
import taskRoutes from './routes/taskRoutes';
import projectRoutes from './routes/projectRoutes';
import subTaskRoutes from './routes/subTaskRoutes';
import { authMiddleware } from './middleware/authMiddleware';
import { socketHandler } from './socket/socketHandler';
import { errorHandler } from './middleware/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Configure Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL?.split(',') || 'https://my-react-app-355046145223.us-central1.run.app',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 120000 // 2 minutes
  }
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL?.split(',') ||'https://my-react-app-355046145223.us-central1.run.app',
  credentials: true
}));

app.use(express.json());

// Database connection
connectDB();

// Authentication middleware for HTTP routes
app.use(authMiddleware);

// Store io instance for HTTP routes
app.set('io', io);

// Routes
app.use('/api', taskRoutes);
app.use('/api', projectRoutes);
app.use('/api', subTaskRoutes);

// Error handling
app.use(errorHandler);

// Initialize Socket.IO
socketHandler(io);

// Start server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };