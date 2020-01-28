const queryResolvers = require('./queryResolvers.js');
const userResolvers = require('./userResolvers');
const deckResolvers = require('./deckResolvers');
const cardResolvers = require('./cardResolvers');
const mutationResolvers = require('./mutationResolvers');

const resolvers = {
  Query: queryResolvers,
  User: userResolvers,
  Deck: deckResolvers,
  Card: cardResolvers,
  Mutation: mutationResolvers,
};

module.exports = resolvers;