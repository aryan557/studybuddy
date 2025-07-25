const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String },
  interests: [{ type: String }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  buddies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // New field
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 