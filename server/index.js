const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const buddiesRouter = require('./routes/buddies');
app.use('/api/buddies', buddiesRouter);

const profileRouter = require('./routes/profile');
app.use('/api/profile', profileRouter);

const resourcesRouter = require('./routes/resources');
app.use('/api/resources', resourcesRouter);

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/studdybuddy';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  }); 