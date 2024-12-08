const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const lnsRoutes = require('./src/routes/LnSRoute');  // Importing your routes

const app = express();
const port = process.env.PORT || 5000;  // Set port (defaults to 5000 if not in .env)

app.use(cors());  // Enable CORS
app.use(express.json());  // Middleware to parse JSON data

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use Routes
app.use('/api/items', lnsRoutes);  // Prefix routes with /api/items

// Start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
