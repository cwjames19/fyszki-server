const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  date: { type: Date, required: true, default: Date.now },
  flips: [{ type: Schema.Types.ObjectId, ref: 'Flip' }],
  deck: { type: Schema.Types.ObjectId, ref: 'Deck', required: true },
})