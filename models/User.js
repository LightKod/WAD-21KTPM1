const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    role: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  });

const User = mongoose.model('User', userSchema);
module.exports = User;