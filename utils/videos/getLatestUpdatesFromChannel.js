const _ = require('lodash');
const moment = require('moment');
const logger = require('../chuneLogger');
const axios = require('axios')
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const apiKey = process.env.YOUTUBE_API_KEY;

const fetchItems = (url, channel, items = [], dateLimit = moment().subtract(1, 'year')) => {
  return axios.get(url).then(result => {
    const newItems = result.data.items.filter(item => {
      return moment(item.snippet.publishedAt).isAfter(dateLimit);
    })
    items = items.concat(newItems);
    nextPageToken = result.data.nextPageToken;

    if (!nextPageToken || newItems.length == 0 || items.length > 3000) { // 3000 is just a made-up upper limit so as not to overfetch
      console.log("Final return");
      return items;
    } else {
      console.log("Recusring", items.length, nextPageToken);
      url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${channel.uploadsPlaylistId}&part=snippet&maxResults=50&pageToken=${nextPageToken}`
      return fetchItems(url, channel, items, dateLimit);
    }
  });
}

const getLatestUpdatesFromChannel = (channel, lastUpdatedTime) => {
  console.log("Start fetching for channel => ", channel.name)

  let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${channel.uploadsPlaylistId}&part=snippet&maxResults=50`;
  return fetchItems(url, channel, [], moment(lastUpdatedTime).add(1, 'seconds')).then(results => {
    return results;
  }).catch(err => {
    console.log("ERR fetching channel => ", channel.name);
    console.error(err);
  });
}

module.exports = getLatestUpdatesFromChannel;
