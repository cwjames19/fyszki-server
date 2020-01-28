const mongoose = require('mongoose');

const seedUsers = [
  { email: "email1@example.com", password: "password", decks: [] },
  { email: "email2@example.com", password: "password", decks: [] },
  { email: "email3@example.com", password: "password", decks: [] },
];

const seedDecks = [
  { name: "Test Deck 1", description: "My description 1" },
  { name: "Test Deck 2", description: "My description 2" },
  { name: "Test Deck 3", description: "My description 3" },
  { name: "Test Deck 4", description: "My description 4" },
  { name: "Test Deck 5", description: "My description 5" },
  { name: "Test Deck 6", description: "My description 6" },
];

const seedCards = [
  { sideOne: "Hello world", sideTwo: "definition 1" },
  { sideOne: "Hi, planet!", sideTwo: "definition 2" },
  { sideOne: "Three", sideTwo: "definition 3" },
  { sideOne: "Four", sideTwo: "definition 4" },
  { sideOne: "Five", sideTwo: "definition 5" },
  { sideOne: "Six", sideTwo: "definition 6" },
  { sideOne: "Seven", sideTwo: "definition 7" },
  { sideOne: "Eight", sideTwo: "definition 8" },
];

module.exports = {
  seedDecks,
  seedCards,
  seedUsers,
};