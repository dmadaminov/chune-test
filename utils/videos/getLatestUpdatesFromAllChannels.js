const channelsWithUploads = require('./channelsWithUploads.json').data;
const currentChannel = channelsWithUploads[0];
const moment = require('moment');
const _ = require('lodash');
const db = require('../../server/models/index');
const Video = db.Video;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const getLatestUpdatesFromChannel = require('./getLatestUpdatesFromChannel');

// Video.findOne({
//   where: {
//     channelId: `${currentChannel.channelId}`
//   },
//   order: [
//     ['date', 'DESC'],
//   ]
// }).then(res => {
//   console.log(res.title);
//   return getLatestUpdatesFromChannel(channelsWithUploads[0], moment(res.date).subtract(10, 'days').toDate())
// }).then(newResults => {
//   console.log("Newly fetched videos => ", newResults.length);
//   console.log(newResults[0]);
//   return newResults;
// })

const fetchLatestVideos = () => {
  const SQL_1 = ` SELECT DISTINCT ON("channelId") "channelId", id, date, "lastFetchedAt", source
                FROM "Videos"
                ORDER BY "channelId", date DESC;`

  return sequelize.query(SQL_1, { type: sequelize.QueryTypes.SELECT }).then(function (maxVideos) {
    return maxVideos;
  }).then(res => {
    console.log(res.length);
    return Promise.all(
      res.map(latestVideo => {
        const channel = _.find(channelsWithUploads, c => c.channelId == latestVideo.channelId);
        return getLatestUpdatesFromChannel(channel, moment(latestVideo.date).toDate()).then(newResults => {
          console.log("Newly fetched videos => ", newResults.length);
          return {channel: channel, videos: newResults};
        }).catch(err => {
          console.error("Couldn't fetch latest videos for channel", latestVideo.source)
        })
      })
    )
  })
}

module.exports = fetchLatestVideos;
// fetchLatestVideos().then(results => {
//   console.log("Total fetched videos => ",results);
// });
