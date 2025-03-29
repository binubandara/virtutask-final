const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const engagementRoutes = require('./routes/engagement.routes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Set port to 5002
const PORT = process.env.PORT || 8080;

// Frontend origin
const frontendOrigin = process.env.NODE_ENV === 'development' 
  ? 'https://my-react-app-355046145223.us-central1.run.app'  // Vite default port
  : 'https://my-react-app-355046145223.us-central1.run.app'; 

// Configured CORS middleware
const cors = require('cors');

app.use(cors({
  origin: 'https://my-react-app-355046145223.us-central1.run.app', // Allow frontend origin
  credentials: true,  // Allow cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/engagement-hub', engagementRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Engagement Hub API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Engagement Hub server running on port ${PORT}`);
  console.log(`CORS enabled for origin: ${frontendOrigin}`);
});