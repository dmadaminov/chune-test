#!/usr/bin/env node

const admin = require('../firebase/firebaseAdmin');
const moment = require('moment');
const _ = require('lodash');
const ScrapeArticles = require('../articles/scrape_articles_to_cache');
const db = admin.database();

const usersRef = db.ref('users');

const startTime = moment();

usersRef.once('value', (snapshot) => {
    const users = snapshot.val();
    const nameLists = Object.keys(users).map((userId) => {
        const user = users[userId];
        const artists = Object.keys(user.artists);
        return artists;
    });
    const names = _.chain(nameLists).flattenDeep().uniq().value();
    ScrapeArticles(names)
        .then(results => { process.exit(0) })
        .catch(err => { console.log("Scrape Error: ", err); });
});
