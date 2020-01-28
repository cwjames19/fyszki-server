const Deck = require('../models/Deck');

const userResolvers = {
  decks: async (parent) => {
    const { _id } = parent;
    const decks = await Deck.find({ user: _id });
    return decks;
  },
};

module.exports = userResolvers;