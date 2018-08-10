#!/usr/bin/env node
// This script uses firebase admin SDK to fetch all users following artists
// and then fetching all articles for those artists.
// This is essentially warming the cache. 
// If we're seeing slow loading of articles in the future (when there are many users),
// please set up a cron job that will run this script automatically on every X mins or so.
// Depending on how often you want to warm the cache and how long did you set up the cache burst time.
// When deciding to run this on cronb job,
// please keep in mind that the script run time will grow with the number of artists in the system.
// Might not be worth it to run very frequently. Servers could freeze up.

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
  Promise.all(
      names.map(name => {
          return scrapeArtist(name);
      })
  ).then(results => {
    const endTime = moment();
    console.log("Filled all article caches. Time taken in seconds => ", endTime.diff(startTime, 'seconds'));
  }).catch(err => {
    console.log("Err filling all caches", err);
  })
});
