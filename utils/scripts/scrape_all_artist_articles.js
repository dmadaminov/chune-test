#!/usr/bin/env node

const moment = require('moment');
const _ = require('lodash');
const ScrapeArticles = require('../articles/scrape_articles_to_cache');
const db = require('../firebase/firestore');
const SeedArtist = require('../fetchArtist');
const Seed = require('./artist_seed_list');
const Dedup = require('../articles/deduplication/deduplication')
const fs = require('fs');
const artistRef = db.collection('artists');
const articleRef = db.collection('articles');

const startTime = moment();

artistRef.get().then(snapshot => {
    let names = [];
    let idx = 0;
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

    
    /*articleRef.get().then(snapshot => {
        let articles = []
        snapshot.forEach(a => {
            articles.push(JSON.parse(a.data))
        });
        
    });*/
    
   
    
    
  /* 
    return ScrapeArticles(names)
        .then(res => { 
            console.log('Processed: ', names.length, ' artists and', res.length, ' articles');
            process.exit(0) })
        .catch(err => { console.log("Scrape Error: ", err); });*/
});
