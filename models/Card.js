const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  sideOne: { type: String, required: true },
  sideTwo: { type: String, required: true },
  deck: { type: Schema.Types.ObjectID, ref: 'Deck', required: true },
  flips: [{ type: Schema.Types.ObjectID, ref: 'Flip' }],
  color: ['gold', 'green', 'yellow', 'red', 'grey'],
});

module.exports = mongoose.model('Card', cardSchema);