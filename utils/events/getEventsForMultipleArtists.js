const axios = require('axios');
const firestore = require('../firebase/firestore');
const _ = require('lodash');
const getEventsWithCache = require('./getEventsWithCache');
const user_articles = firestore.collection('users')

const getEventsForMultipleArtists = (names) => {
  return Promise.all(
    names.map(name => {
      return getEventsWithCache(name).catch(err => {
        console.error("Couldn't fetch events for artist => " + name, err);
        return [];
      });
    })
  ).then(res => {
    return _.flatten(res);
  });
}

module.exports = getEventsForMultipleArtists;