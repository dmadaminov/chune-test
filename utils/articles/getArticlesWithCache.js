const { fetchBillboard, fetchPf, fetchHnhh, fetchTsis, fetchEdms, fetchConsequence,fetchStereoGum,
        fetchTinymt, fetchDancingA, fetch2dope, fetchRapRadar, fetchPopJus, fetchMusicBlog, fetchAnr,
        fetchCaesar, fetchEdmNations, fetchIndietronica, fetchKings, fetchLive
 } = require('./fetchArticles')
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
        fetchBillboard(name),
        fetchPf(name),
        fetchHnhh(name),
        fetchTsis(name),
        // fetchEdms(name),
        // fetchConsequence(name),
        // fetchStereoGum(name),
        // fetchTinymt(name),
        // fetchDancingA(name),
        // fetch2dope(name),
        // fetchRapRadar(name),
        // fetchPopJus(name),
        // fetchMusicBlog(name),
        // fetchAnr(name),
        // fetchCaesar(name),
        // fetchEdmNations(name),
        // fetchIndietronica(name),
        // fetchKings(name),
        // fetchLive(name),
      ])
    )
  ).then(matches => {
    var articles = _.flattenDeep(matches);
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

    firestore.collection('artists').doc(artistId).set({ articlesLastFetchedAt: moment().toDate() }, { merge: true });

    return fetchFromStore(artistId);
  }).catch(err => {
    console.log("ERR", err)
  });
}

const fetchFromStore = (artistId, name) => {
  return firestore.collection('articles').where('artistId', '==', artistId).orderBy('date', 'desc').get().then(results => {
    return results.docs.map(doc => doc.data()).map(article => {
      if(article.date) {
        article.date = moment.unix(article.date.seconds).toDate();
      }

      // Fetching content is new feature and we need to check if data in firebase already have scrapped content
      if (!article.content) {
        console.log('SCRAAAAPPPEEE');
        return scrape(name, artistId);
      } else {
        return article;
      }
    });
  });
}

const fetchArticles = (name) => {
 return fetchArtist(name).then(artist => {
   if (artist.articlesLastFetchedAt && moment(artist.articlesLastFetchedAt).isAfter(getValidCacheTime())) {
      console.log('TEST 1: ', artist);
      return fetchFromStore(artist.artistId, name);
      // return scrape(name, artist.artistId);
    } else {
      console.log('TEST 2');
      console.log("Rescraping articles for ", artist.name);
      return scrape(name, artist.artistId);
    }
  })
}

module.exports = fetchArticles;