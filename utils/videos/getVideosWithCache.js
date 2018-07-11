const moment = require('moment');
const crypto = require('crypto');
const _ = require('lodash');
const firestore = require('../firebase/firestore');
const fetchFromYoutube = require('./fetchFromYoutube');
const fetchArtist = require('../fetchArtist');
const { getValidCacheTime } = require('../globalHelpers');

// const fetchFromStore = (artist) => {
//   return firestore.collection('artists').doc(artist.artistId).get().then(doc => {
//     if(artist.videos) {
//       var videos = doc.data().videos.map(video => {
//         video.lastFetchedAt = moment.unix(video.lastFetchedAt.seconds).toDate();
//         video.date = moment.unix(video.date.seconds).toDate();
//         return video;
//       })
//       return videos;
//     } else {
//       return []
//     }
    
//   });
// }

// const getVideos = (name) => {
//   return fetchArtist(name).then(artist => {
//     //check if videos last fetched time is within 24 hours
//     if (artist.videosLastFetchedAt && moment(artist.videosLastFetchedAt).isAfter(getValidCacheTime()) ) {
//       return artist.videos;
//     } else {
//       // otherwise fetch from youtube again
//       console.log("There are no old videos or old videos are out of date");
//       return fetchFromYoutube([name]).then(videos => {
//         return firestore.collection('artists').doc(artist.artistId).set({videos: videos, videosLastFetchedAt: moment().toDate()}, {merge: true});
//       }).then((_result) => {
//         return fetchArtist(name);
//       }).then(artrist => {
//         return artist.videos;
//       });
//       return [];
//     }
//   })
// }
const { Video } = require('../../server/models/index');
const { Op } = require('sequelize');

const mapToOldFormat = (video, artist) => {
  return {
    ID: video.videoId,
    artists: [artist],
    date: video.date,
    image: video.image,
    isVideo: video.isVideo,
    lastFetchedAt: video.lastFetchedAt,
    source: video.source,
    title: video.title,
    url: video.url,
  };
}

const getVideos = (name) => {
  return Video.findAll({
    where: {
      title: {
        [Op.iLike]: `%${name}%`
      }
    },
    order: [
      ['date', 'DESC']
    ]
  }).then(res => {
    return Promise.resolve(res.map(video => {
        return mapToOldFormat(video, name);
      })
    )
  });
}

module.exports = getVideos;

// getVideos("Adele").then(res => {
//   console.log("Res => ", res.length);
//   console.log(res.map( r => r.date));
// }).catch(err => {
//   console.log(err);
// })