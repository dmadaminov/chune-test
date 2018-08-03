const articleSources = require('./fetchArticles')
const { getValidCacheTime } = require('../globalHelpers'); 
const firestore = require('../firebase/firestore');
const axios = require('axios');
const moment = require('moment');
const crypto = require('crypto');

const fetchArtist = require('../fetchArtist');
const _ = require('lodash');



const fetchFromStore = (artistId) => {
  return firestore.collection('articles').where('artistId', '==', artistId).orderBy('date', 'desc').get().then(results => {
    return results.docs.map(doc => doc.data()).map(article => {
      if(article.date) {
        article.date = moment.unix(article.date.seconds).toDate();
      }
      return article;
    });
  });
}


module.exports = fetchFromStore;
