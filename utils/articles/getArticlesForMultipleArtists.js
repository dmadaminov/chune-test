const _ = require('lodash');
const getArticlesWithCache = require('./getArticlesWithCache');

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
