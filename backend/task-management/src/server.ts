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

// Define allowed origins
const allowedOrigins = process.env.CLIENT_URL?.split(',') || ['https://my-react-app-355046145223.us-central1.run.app'];

// Configure Socket.IO with CORS
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 120000 // 2 minutes
  }
});

// CORS middleware for Express - MUST be before routes
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if(!origin) return callback(null, true);
    
    if(allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Options preflight handler for all routes
app.options('*', cors());

app.use(express.json());

// Database connection
connectDB();

// Authentication middleware for HTTP routes - Apply after CORS
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