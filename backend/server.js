const cors = require('cors');
require('dotenv').config();

const crypto = require('crypto');
global.crypto = crypto;

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

// ENV config (we’ll add .env next)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/myapp';
const PORT = process.env.PORT || 3000;

// Mongo connect
mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

app.get('/api', (req, res) => {
  res.send('API working 🚀');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
