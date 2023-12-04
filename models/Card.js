const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    supertype: { type: String, required: true },
    types: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    rarity: { type: String, required: true },
    setId: { type: String, ref: 'Set' },
    image: { type: String, required: true },
    marketPrices: { type: Number, required: true },
    amount: { type: Number, default: 10 },
  });
const Card = mongoose.model('Card', cardSchema);
module.exports = Card