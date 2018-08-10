#!/usr/bin/env node

const admin = require('../firebase/firebaseAdmin');
const moment = require('moment');
const _ = require('lodash');
const scrapeArtist = require('../articles/scrapeArticlesToCache');
const db = admin.database();

const usersRef = db.ref('users');

const startTime = moment();

usersRef.once('value', (snapshot) => {
    // console.log("Users snapshot", snapshot.val());
    const users = snapshot.val();
    const nameLists = Object.keys(users).map((userId) => {
        const user = users[userId];
        const artists = Object.keys(user.artists);
        return artists;
    });
    const names = _.chain(nameLists).flattenDeep().uniq().value();
    scrapeArtist(names, count)
        .then(results => { process.exit(0) })
        .catch(err => { console.log("", err); });
});
