const Source = require('./scrape_sources')
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
                       Source.fetchBillboard(name),
                       Source.fetchPf(name),
                       Source.fetchHnhh(name),
                       Source.fetchTsis(name),
                       Source.fetch_your_edm(name),
                       Source.fetch_pigeon_planes(name),
                       Source.fetch_louder_sound(name),
                       Source.fetch_ucr(name),
                       Source.fetch_cmt(name)
                   ])))
        .then(matches => {
            return _.flattenDeep(matches).map(article => { 
                article.artistId = artistId;
                article.lastUpdatedAt = moment().toDate();
                article.date = article.date ? moment(article.date).toDate() : null;

                if (article.date) {
                    article.hash = `${artistId}:${article.url}`;  
                }
                return article;
            });
        }).catch(err => {
            console.log("ERR", err);
        })
};


const scrapeArticles = (artists) => {
    return Promise.all(artists.map(artist => {
        return scrape(artist.name, artist.artistId)
            .catch(err => { console.log("Failed to scrape artist:", err); });
    }));
}

module.exports = scrapeArticles;
