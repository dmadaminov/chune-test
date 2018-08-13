const _ = require('lodash');
const firestore = require('../firebase/firestore');
const moment = require('moment')
const getArticlesWithCache = require('./getArticlesWithCache');
const FetchArtist = require('../fetchArtist');

const articleRef = firestore.collection('articles');
const query = (artistId) => { return articleRef.where('artistId', '==', artistId).orderBy('date', 'desc').get(); };

const FetchArticlesForMultipleArtists = (names) => {
    return Promise.all(
        names.map(name => {
            return FetchArtist(name).then( artist => {
                console.log('Getting articles for artist ', artist.name, ' with ID:', artist.artistId);
                return query(artist.artistId).
                    then(snapshot => {
                        return snapshot.docs.map(doc => doc.data()).map(article => {
                            if (article.date)
                                article.date = moment.unix(article.date.seconds).toDate() 
                            return article;
                        }) 
                    }); 
            });
        })).then(res => {
            console.log('Found articles:', res.length);
            return _.flatten(res); 
        }).catch(err => {
            return [];
        })
};

module.exports = FetchArticlesForMultipleArtists;
