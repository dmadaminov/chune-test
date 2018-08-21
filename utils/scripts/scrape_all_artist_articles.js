#!/usr/bin/env node

const moment = require('moment');
const ScrapeArticles = require('../articles/scrape_articles_to_cache');
const db = require('../firebase/firestore');
const admin = require('../firebase/firebaseAdmin');
const SeedArtist = require('../fetchArtist');
const Seed = require('./artist_seed_list');
const artistRef = db.collection('artists');
const articleRef = db.collection('articles');
const difference = require('lodash/difference');
const dedup = require('../articles/deduplication');
const startTime = moment();

const DeduplicationRatio = 0.5;

//const merge = (a, b) => {
//    result = new Set(a);
//    b.forEach(i => { if(!result.has(b)) result.add(b) });
//}

artistRef.get().then(snapshot => {
    let names = [];
    let idx = 0;
    snapshot.forEach(a => {
        if(names.length == 0) {
            names.push(a.data());
        }
    })
    
    
    // Here we seed the initial list of artists we want to scrape. This should only run once.
    // We want to move to Postgres as soon as possible, but doesn't make sense to have duplicate
    // follow lists
    /*if (names.length < Seed.length) {
        Seed.forEach(artist => {
            SeedArtist(artist).catch(err => { console.log('Cannot fetch article: ', err); });
        })
    }*/
 
    var scrape = ScrapeArticles(names)
        /*.then(result => {
            console.log('Scraped: ', names.length, ' artists and', result.length, ' articles');
            scrape = result; 
        })
        .catch(err => { 
            console.log("Scrape Error: ", err); 
        });*/
    
    var articles = []
    articleRef.get().then(snapshot => {
        snapshot.forEach(a => {
            articles.push(a.data);
        });
        
        console.log("Retrieved ", articles.length, ' from Firestore');

        // We merge the articles from firestore and scrape 
        var cleaned = dedup(difference(articles, scrape));
        
        console.log("After deduplication there are: ", cleaned.length, ' articles'); 

        // Db batch save
        var batch = admin.batch();
        batch.collection('articles').set(cleaned);
        batch.commit().then(() => {   
        });
        process.exit(0);
        
    });
            
  
});
