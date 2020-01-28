const { makeExecutableSchema } = require('graphql-tools');
// const graphql = require('graphql');
// const { buildSchema } = require('graphql');
// const _ = require('lodash');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const resolvers = require('../resolvers');
// const User = require('../models/User');
// const Deck = require('../models/Deck');
// const Card = require('../models/Card');
// const onError = require('../errorHandling/onError');
// const queryResolvers = require('./queryResolvers.js');

/* use _id instead of id as property on User and Card types to match out of the box id
   assignment by mongoDB */
const typeDefs = `
  type User {
    _id: ID
    email: String
    password: String
    decks: [Deck]
  }

  type Token {
    token: String!
    username: String!
  }

  type Deck {
    _id: ID
    name: String!
    description: String
    user: User
  }

  type Card {
    _id: ID
    sideOne: String!
    sideTwo: String!
    deck: Deck!
}

  type Query {
    users: [User]
    user(_id: String!): User
    allDecks: [Deck]
    decks(userID: String!): [Deck]
    deck(_id: String!): Deck
    cards(deckID: String!): [Card]
    card(_id: String!): Card
  }

  type Mutation {
    signUp(email: String!, password: String!, confirmPassword: String!): Token!
    signIn(email: String!, password: String!): Token!
    createDeck(name: String!, description: String): Deck!
    deleteDeck(_id: String!): Boolean!
  }
`;




// type Session {
//   _id: ID
//   timestamp: String
//   deck: Deck
//   flips: [Flip]
// }

// type Flip {
//   _id: ID
//   card: Card
//   result: Boolean
// }


/* Can be exported and included in the graphql-express server creation's options object but
   to be honest, I don't understand exactly what it does. It defines the rootValue passed
   to the executor for every query (?). Every resolver gets passed for arguments (obj, args, context, and info).
   The obj is the result of calling the resolver on the parent field. If a top-level query is being called, it
   instead receives the rootValue */
// const rootValue = {
// ...queryResolvers,
// signuUp: function ({ name, email, password }) {
//   return {};
// },
// updateUserName: function ({ _id, name }) {
//   const cloneUSERS = _.cloneDeep(USERS);
//   const index = cloneUSERS.findIndex(user => user._id === _id);
//   if (index === -1) {
//     return null;
//   } else {
//     cloneUSERS[index] = Object.assign({}, cloneUSERS[_id], { name });
//     console.log('cloneUSERS: ', cloneUSERS);
//     return cloneUSERS[index];
//   }
// }
// };

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = {
  typeDefs,
  resolvers,
  schema,
  // rootValue,
};