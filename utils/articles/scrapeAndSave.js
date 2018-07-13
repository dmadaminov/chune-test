const articleFetch = require('./fetchArticles')
const firestore = require('../firebase/firestore');
const axios = require('axios');
const moment = require('moment');
const crypto = require('crypto');

const _ = require('lodash');
const fetchArtist = require('../fetchArtist');

const generateSha1Key = (string) => {
  var shasum = crypto.createHash('sha1');
  shasum.update(string);
  return shasum.digest('hex');
}

const scrapeAndSave = (name, artistId) => {
  return Promise.all(
     [name].map(name => 
      Promise.all([
          articleFetch.fetchBillboard(name),
          articleFetch.fetchPf(name),
          articleFetch.fetchHnhh(name),
          articleFetch.fetchTsis(name),
          articleFetch.fetch_your_edm(name),
          articleFetch.fetch_pigeon_planes(name),
          articleFetch.fetch_louder_sound(name),
          articleFetch.fetch_ucr(name),
          articleFetch.fetch_cmt(name)
      ])
    )
  ).then(matches => {
    var articles =_.flattenDeep(matches)
    articles = articles.map( match => {
      match.artistId = artistId;
      match.lastUpdatedAt = moment().toDate();
      match.date = match.date ? moment(match.date).toDate() : null;
      return match;
    })
    return Promise.all(articles.map(article => {
      return firestore.collection('articles').doc(generateSha1Key(`${artistId}:${article.url}`)).set(article, {merge: true})
    }))
  }).then(results => {

    firestore.collection('last_updates').doc(artistId).set({articlesUpdated: moment().toDate(), name: name}).then(
      ref => console.log("Last update time updated for articles of artist => " + artistId )
    )
    return artistId;
  }).catch(err => {
    console.log("ERR", err)
  });
}

var fs = require('fs');

const scrapeAndSaveMultiple = (names) => {
  console.log("START =>", moment().toISOString());
  return Promise.all(names.map(name => {
    return fetchArtist(name);
  })).then(artists => {
    return Promise.all(artists.map(artist => {
      return scrapeAndSave(artist.name, artist.artistId);
    }));
  }).then(results => {
    console.log("END =>", moment().toISOString());
    console.log("Scraped total artists of count => ", results);
  })
}

module.exports = {
  scrapeAndSave,
  scrapeAndSaveMultiple,
}
