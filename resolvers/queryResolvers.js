const { combineResolvers } = require('graphql-resolvers');
const User = require('../models/User');
const Deck = require('../models/Deck');
const Card = require('../models/Card');
const { isAuthenticated } = require('./authorization');

/* Resolvers */

/* Resolver Information
In some form or another, every resolver in every language receives these four arguments:
args — Arguments provided to the field
root — Result from the previous / parent type
context — a Mutable object that is provided to all resolvers
info — Field - specific information relevant to the query(used rarely)
*/

const queryResolvers = {
  users: combineResolvers(
    isAuthenticated,
    async () => {
      console.log('QUERYING USERS ENDPOINT');
      return await User.find();
    },
  ),
  user: combineResolvers(
    isAuthenticated,
    async (parent, { _id }) => {
      console.log('QUERYING USER ENDPONT');
      return await User.findById(_id);
    },
  ),
  allDecks: combineResolvers(
    isAuthenticated,
    async () => {
      console.log('QUERYING ALLDECKS ENDPOINT');
      return await Deck.find();
    },
  ),
  decks: combineResolvers(
    isAuthenticated,
    async (parent, { userID }) => {
      console.log('QUERYING DECKS ENDPONIT');
      // const user = await User.findById(userID);
      // const userDecks = await user.decks;
      const decks = await Deck.find({ user: userID });
      return decks;
    },
  ),
  deck: combineResolvers(
    isAuthenticated,
    async (parent, { _id }) => {
      console.log('QUERYING DECK ENDPOINT');
      return await Deck.findById(_id);
    },
  ),
  cards: combineResolvers(
    isAuthenticated,
    async (parent, { deckID }) => {
      console.log('QUERYING CARDS ENDPOINT');
      return await Card.find({ deck: deckID });
    },
  ),
  card: combineResolvers(
    isAuthenticated,
    async (parent, { _id }) => {
      console.log('QUERYING CARD ENDPOINT');
      return await Card.findById(_id);
    },
  ),
};

module.exports = queryResolvers;