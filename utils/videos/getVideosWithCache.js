const moment = require('moment');
const crypto = require('crypto');
const _ = require('lodash');
const firestore = require('../firebase/firestore');
const fetchFromYoutube = require('./fetchFromYoutube');
const fetchArtist = require('../fetchArtist');
const { convertTimestampToDate } = require('../globalHelpers');

const fetchFromStore = (artist) => {
  return firestore.collection('artists').doc(artist.artistId).get().then(doc => {
    if(artist.videos) {
      var videos = doc.data().videos.map(video => {
        video.lastFetchedAt = moment.unix(video.lastFetchedAt.seconds).toDate();
        video.date = moment.unix(video.date.seconds).toDate();
        return video;
      })
      return videos;
    } else {
      return []
    }
    
  });
}

const getVideos = (name) => {
  return fetchArtist(name).then(artist => {
    //check if videos last fetched time is within 24 hours
    if(artist.videosLastFetchedAt && moment(artist.videosLastFetchedAt).isAfter(moment().subtract(24, 'hours')) ) {
      return artist.videos;
    } else {
      // otherwise fetch from youtube again
      console.log("There are no old videos or old videos are out of date");
      return fetchFromYoutube([name]).then(videos => {
        return firestore.collection('artists').doc(artist.artistId).set({videos: videos, videosLastFetchedAt: moment().toDate()}, {merge: true});
      }).then((_result) => {
        return fetchArtist(name);
      }).then(artrist => {
        return artist.videos;
      });
      return [];
    }
  })
}

module.exports = getVideos;