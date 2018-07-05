const axios = require('axios');
const firestore = require('../firebase/firestore');
const _ = require('lodash');
const getVideosWithCache = require('./getVideosWithCache');
const user_articles = firestore.collection('users')

const getVideosForMultipleArtists = (names) => {
  return Promise.all(
    names.map(name => {
      return getVideosWithCache(name).catch(err => {
        console.error("Couldn't fetch videos for artist => " + name);
        return [];
      });;
    })
  ).then(res => {
    return _.flatten(res);
  }).catch(err => {
    console.log("Couldn't fetched videos", err);
  });
}

module.exports = getVideosForMultipleArtists;
