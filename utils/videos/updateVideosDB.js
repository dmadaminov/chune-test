const getLatestUpdatesFromAllChannels = require('../videos/getLatestUpdatesFromAllChannels');
const insertVideos = require('../videos/insertVideos');
const channelsWithUploads = require('../videos/channelsWithUploads.json').data;
const moment = require('moment');
const { Video } = require('../../server/models/index');
const { Op } = require('sequelize');

const MAXIMUM_STALE_PERIOD_IN_MINTUES = 15;

const updateVideosDB = () => {
  return Video.findOne({
    order: [['lastFetchedAt', 'DESC']]
  }).then(res => {
    console.log("Videos last fetched at " + moment().diff(moment(res.lastFetchedAt), 'minutes') + "ago.");
    const staledMinutes = moment().diff(moment(res.lastFetchedAt), 'minutes');
    if (staledMinutes >= MAXIMUM_STALE_PERIOD_IN_MINTUES) {
      return getLatestUpdatesFromAllChannels().then(lastUpdates => {
        const now = moment().toDate();
        return Promise.all(lastUpdates.map(lastUpdate => {
          return insertVideos(lastUpdate.videos, lastUpdate.channel, now).catch(err => {
            console.log("Error inserting updates for channel => " + lastUpdate.channel.name);
          });
        }));
      }).then(videos => {
        console.log("Videos DB Updated Again At " + moment().toDate());
        return true;
      });
    } else {
      return Promise.resolve(false);
    }
  })
}

module.exports = updateVideosDB;

// updateVideosDB().then(res => {
//   console.log(res ? "newly updated" : "already up to date")
// })
