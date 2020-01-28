const express = require('express');
// const cors = require('cors');
const jwt = require('jsonwebtoken');
// const graphqlHTTP = require('express-graphql');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./schema/schema');
const dotenv = require('dotenv');
// const { seedUsers, seedCards, seedDecks } = require('./data/seedData');
const onError = require('./errorHandling/onError');
// const User = require('./models/User');
// const Deck = require('./models/Deck.js');
dotenv.config();


// Authorization setup
const getAuthenticatedUser = async req => {
  const token = req.headers['authorization'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new AuthenticationError(
        'Your session has expired. Please sign in again.'
      );
    }
  }
  return undefined;
}

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authenticatedUser = await getAuthenticatedUser(req);

    return {
      authenticatedUser,
      secret: process.env.JWT_SECRET,
    }
  },
  // rootValue,
});

const app = express();

server.applyMiddleware({ app, cors: true, })

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
});


/* Connect to local mongoDB instance */
// Connection URL
// const url = `mongodb://${process.env.LOCAL_MONGO_USERNAME}:${process.env.LOCAL_MONGO_PASSWORD}@localhost:27017/myNewDb?authSource=admin`;
// Use connect method to connect to the Server
// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .catch((error) => {
//     console.log('error: ', error);
//   });

/* Connect to mLab database */
// Connection URL
const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .catch((error) => {
    console.log('error: ', error);
  });


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));

db.once('open', async function () {
  try {
    // await User.insertMany([...seedUsers], async function (err, results) {
    //   if (err) {
    //     console.log('catch statement 1');
    //     onError(err);
    //   } else {
    //     const cameron = results.find(user => user.email === "email1@example.com");
    //     const decks = seedDecks.map(deck => Object.assign({}, { ...deck }, { user: cameron._id }));
    //     await Deck.insertMany(
    //       decks,
    //       function (e) {
    //         if (e) {
    //           console.log('catch statement 2');
    //           onError(e)
    //         }
    //       }
    //     );
    //   }
    // });

    console.log('CONNECTED TO DATABASE');
  } catch (err) {
    console.log('catch statement end');
    if (err) { onError(err) }
  }

});

