#!/usr/bin/env node

const moment = require('moment');
const _ = require('lodash');
const ScrapeArticles = require('../articles/scrape_articles_to_cache');
const db = require('../firebase/firestore');

const artistRef = db.collection('artists');

const startTime = moment();

artistRef.get().then(snapshot => {
    let names = [];
    snapshot.forEach(a => {
        names.push(a.data());
    })
    count = 0; 
    return ScrapeArticles(names, count)
        .then(res => { 
            console.log('Processed: ', names.length, ' artists');
            process.exit(0) })
        .catch(err => { console.log("Scrape Error: ", err); });
});
