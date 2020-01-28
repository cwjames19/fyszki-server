const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');
const User = require('../models/User');
const Deck = require('../models/Deck');
const onError = require('../errorHandling/onError');
const { isAuthenticated, isDeckOwner } = require('./authorization');

/* Helpers, for now */
const generatePasswordHash = async function (password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const validatePassword = async function (passwordParam, password) {
  return await bcrypt.compare(passwordParam, password)
};

const createToken = async function (user, secret, expiresIn) {
  console.log('CREATETOKEN!');
  const { _id, email } = user;
  return await jwt.sign({ _id, email }, secret, { expiresIn });
};


/* Resolvers */

/* Resolver Information
In some form or another, every resolver in every language receives these four arguments:
args — Arguments provided to the field
root — Result from the previous / parent type
context — a Mutable object that is provided to all resolvers
info — Field - specific information relevant to the query(used rarely)
*/
const mutationResolvers = {
  signUp: async (parent, { email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      return new Error('Passwords must match');
    } else if (password.length < 8 || password.length > 32) {
      return new Error('Password must be between 8 and 32 characters');
    } else if (password.match(/\s/)) {
      return new Error('Password can not contain any white space');
    }
    const sameEmailUser = await User.findOne({ email });
    if (sameEmailUser) {
      return new Error('A user with that email already exists');
    }

    const passwordHash = await generatePasswordHash(password);

    return await User.insertMany([{ email, password: passwordHash }])
      .then((results) => {
        const secret = process.env.JWT_SECRET;
        return { token: createToken(results[0], secret, '90m'), username: email };
      })
      .catch(err => {
        onError(err);
      })
  },
  signIn: async (parent, { email, password: passwordParam }) => {
    const user = await User.findOne({ email });

    if (!user) {
      return new Error('Email/password combination is incorrect');
    }

    const { password } = user;
    const isValid = await validatePassword(passwordParam, password);

    if (!isValid) {
      return new Error('Email/password combination is incorrect');
    }

    const secret = process.env.JWT_SECRET;
    return { token: createToken({ email }, secret, '90m'), username: email };
  },
  createDeck: combineResolvers(
    isAuthenticated,
    async (parent, { name, description }, { authenticatedUser: { email } }) => {
      const user = await User.findOne({ email }).exec();
      console.log('user: ', user);
      return await Deck.insertMany([{ user: user._id, name, description }], { rawResult: true })
        .then(({ ops }) => {
          return ops[0];
        })
        .catch(err => {
          console.log('error in createDeck()');
          onError(err);
        });
    },
  ),
  deleteDeck: combineResolvers(
    isAuthenticated,
    isDeckOwner,
    async (parent, { _id }) => {
      try {
        console.log('gonna try to delete!');
        await Deck.findOneAndDelete({ _id }).exec();
      } catch (err) {
        throw new Error('An unknown error occurred while attempting to delete this deck.');
      }
      return true;
    }
  ),
}

module.exports = mutationResolvers;