const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    supertype: { type: String, required: true },
    types: { type: String, required: true },
    set_id: { type: String, ref: 'Set' },
    market_prices: { type: Number, required: true },
    amount: { type: Number, required: true },
  });
const Card = mongoose.model('Card', cardSchema);
module.exports = Card