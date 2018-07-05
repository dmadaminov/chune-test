const axios = require('axios');
const firestore = require('../firebase/firestore');
const _ = require('lodash');
const getArticlesWithCache = require('./getArticlesWithCache');
const user_articles = firestore.collection('users')

const getArticlesForMultipleArtists = (names) => {
  return Promise.all(
    names.map(name => {
      return getArticlesWithCache(name).catch(err => {
        console.error("Couldn't fetch articls for artist => "+ name);
        return [];
      });;
    })
  ).then(res => {
    return _.flatten(res);
  });
}

module.exports = getArticlesForMultipleArtists;

// getArticlesForMultipleArtists(["Adele", "Kayne West"]).then(result => {
//   console.log("Result", _.flatten(result).length);
// }).catch(err => {
//   console.log("ERR", err);
// })