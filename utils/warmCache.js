const admin = require('./firebase/firebaseAdmin');
const _ = require('lodash');
const getVideosForMultipleArtists = require('./videos/getVideosForMultipleArtists');
const getArticlesForMultipleArtists = require('./articles/getArticlesForMultipleArtists');

// This script uses firebase admin SDK to fetch all users following artists
// and then fetching all articles and videos for those artists.
// This is essentially warming the cache. 
// If we're seeing slow loading of articles and videos in the future (when there are many users),
// please set up a cron job that will run this script automatically on every X mins or so.
// Depending on how often you want to warm the cache and how long did you set up the cache burst time
const db = admin.database();

const usersRef = db.ref('users');

usersRef.once('value', (snapshot) => {
  // console.log("Users snapshot", snapshot.val());
  const users = snapshot.val();
  const nameLists = Object.keys(users).map((userId) => {
    const user = users[userId];
    const artists = Object.keys(user.artists);
    return artists;
  });
  const names = _.chain(nameLists).flattenDeep().uniq().value();
  Promise.all([
    getArticlesForMultipleArtists(names),
    getVideosForMultipleArtists(names),
  ]).then(results => {
    console.log("Filled all caches");
  }).catch(err => {
    console.log("Err filling all caches", err);
  })
})