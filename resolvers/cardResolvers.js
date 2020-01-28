const Deck = require('../models/Deck');

const cardResolvers = {
  deck: async ({ deck }) => {
    return await Deck.findById(deck);
  },
};

module.exports = cardResolvers;