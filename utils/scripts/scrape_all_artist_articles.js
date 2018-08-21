#!/usr/bin/env node

const moment = require('moment');
const _ = require('lodash');
const ScrapeArticles = require('../articles/scrape_articles_to_cache');
const db = require('../firebase/firestore');
const SeedArtist = require('../fetchArtist');
const Seed = require('./artist_seed_list');
const artistRef = db.collection('artists');

const startTime = moment();

artistRef.get().then(snapshot => {
    let names = []; 
    snapshot.forEach(a => {
        names.push(a.data());
    })
    
    // Here we seed the initial list of artists we want to scrape. This should only run once.
    // We want to move to Postgres as soon as possible, but doesn't make sense to have duplicate
    // follow lists
    if (names.length < Seed.length) {
        Seed.forEach(artist => {
            SeedArtist(artist).catch(err => { console.log('Cannot fetch article: ', err); });
        })
    }
   
    return ScrapeArticles(names)
        .then(res => { 
            console.log('Processed: ', names.length, ' artists');
            process.exit(0) 
        })
        .catch(err => { console.log("Scrape Error: ", err); });
});
