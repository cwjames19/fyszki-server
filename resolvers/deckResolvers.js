const User = require('../models/User');

const deckResolvers = {
  user: async ({ user }) => {
    return await User.findById(user);
  },
};

module.exports = deckResolvers;