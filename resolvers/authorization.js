const { ForbiddenError } = require('apollo-server');
const { skip } = require('graphql-resolvers');
const Deck = require('../models/Deck');

const isAuthenticated = (parent, args, { authenticatedUser }) => (
  authenticatedUser
    ? skip
    : new ForbiddenError('Not authenticated as user.')
);

const isDeckOwner = async (parent, { _id }, { authenticatedUser }) => {
  const { email } = authenticatedUser;
  const deck = await Deck.findById(_id).populate('user').exec();
  return deck.user.email === email
    ? skip
    : new ForbiddenError('You are not authorized to do this.')
}

module.exports = {
  isAuthenticated,
  isDeckOwner,
};
