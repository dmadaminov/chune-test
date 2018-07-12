#!/usr/bin/env node
const moment = require('moment');
const updateVideosDB = require('../videos/updateVideosDB');
const getLatestUpdatesFromAllChannels = require('../videos/getLatestUpdatesFromAllChannels');
const insertVideos = require('../videos/insertVideos');

getLatestUpdatesFromAllChannels().then(lastUpdates => {
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