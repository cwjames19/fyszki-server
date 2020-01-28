const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  decks: [{ type: Schema.Types.ObjectID, ref: 'Deck' }],
});

module.exports = mongoose.model('User', userSchema);