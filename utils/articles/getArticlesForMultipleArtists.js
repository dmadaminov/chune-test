const _ = require('lodash');
const getArticlesWithCache = require('./getArticlesWithCache');

const getArticlesForMultipleArtists = (names) => {
  return Promise.all(
    names.map(name => {
        return getArticlesWithCache(name).catch(err => {
        console.error(`Couldn't fetch articls for artist => ${name} err: ${err}`);
        return [];
      }).then(res => {
          console.log(res.length);
          return _.flatten(res); 
      })
    }));
      
};

module.exports = getArticlesForMultipleArtists;
