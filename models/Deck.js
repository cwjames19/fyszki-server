const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectID;

const deckSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  dateCreate: { type: Date, default: Date.now, required: true },
  cards: [{ type: Schema.Types.ObjectID, ref: 'Card' }],
  user: { type: Schema.Types.ObjectID, ref: 'User', required: true },
  lastSession: { type: Schema.Types.ObjectID, ref: 'Session' }
});

module.exports = mongoose.model('Deck', deckSchema);