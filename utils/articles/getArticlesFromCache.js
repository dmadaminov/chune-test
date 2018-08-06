const articleSources = require('./fetchArticles')
const { getValidCacheTime } = require('../globalHelpers'); 
const firestore = require('../firebase/firestore');
const axios = require('axios');
const moment = require('moment');
const crypto = require('crypto');

const fetchArtist = require('../fetchArtist');
const _ = require('lodash');

const generateSha1Key = (string) => {
  var shasum = crypto.createHash('sha1');
  shasum.update(string);
  return shasum.digest('hex');
}

const scrape = (name, artistId) => {
  return Promise.all(
     [name].map(name => 
      Promise.all([
          articleSources.fetchBillboard(name),
          articleSources.fetchPf(name),
          articleSources.fetchHnhh(name),
          articleSources.fetchTsis(name),
          articleSources.fetch_your_edm(name),
          //articleSources.fetch_pigeon_planes(name),
          articleSources.fetch_louder_sound(name),
          articleSources.fetch_ucr(name),
          articleSources.fetch_cmt(name)
      ])
    )
  ).then(matches => {
    var articles = _.flattenDeep(matches);
    return articles.map( match => {
      match.artistId = artistId;
      match.lastUpdatedAt = moment().toDate();
      match.date = match.date ? moment(match.date).toDate() : null;
      return match;
    })
  }).catch(err => {
    console.log("ERR", err)
  });
}



const fetchArticles = (name) => {
 return fetchArtist(name).then(artist => {
      console.log("Rescraping articles for [", artist.name, "]");
      return scrape(name, artist.artistId);
  })
}

module.exports = fetchArticles;
