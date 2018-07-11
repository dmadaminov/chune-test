const firestore = require('../firebase/firestore');
var _ = require('lodash');
const moment = require('moment');
const logger = require('../chuneLogger');
const axios = require('axios')
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const apiKey = process.env.YOUTUBE_API_KEY;

const fetchItems = (url, channel, items = [], dateLimit = moment().subtract(1, 'year')) => {
  return axios.get(url).then(result => {

    items = items.concat(result.data.items);
    nextPageToken = result.data.nextPageToken;
    const lastPublishedAt = moment(items[items.length-1].snippet.publishedAt);
    
    if (!nextPageToken || lastPublishedAt.isBefore(dateLimit) || items.length > 3000) {
      console.log("Final return");
      return items;
    } else {
      console.log("Recusring", items.length, nextPageToken);
      url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${channel.uploadsPlaylistId}&part=snippet&maxResults=50&pageToken=${nextPageToken}`
      return fetchItems(url, channel, items, dateLimit);
    }
  });
}

const channelsWithUploads = require('../../channelsWithUploads.json').data;

const fetchOneYearPlaylistItemsForChannel = (channel) => {
  console.log("Start fetching for channel => ", channel.name)
  let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${channel.uploadsPlaylistId}&part=snippet&maxResults=50`;
  return fetchItems(url, channel, [], moment().subtract(1, 'year')).then(results => {
    console.log("Result", results);
    fs.writeFile(`youtube-data/${channel.name}__${channel.channelId}.json`, JSON.stringify({ data: results }), 'utf8', () => console.log("File written"));
    return results;
  }).catch(err => {
    console.log("ERR fetching channel => ", channel.name);
    console.error(err);
  });
}

const startTime = moment();

Promise.all(channelsWithUploads.map(channel => {
  return fetchOneYearPlaylistItemsForChannel(channel);
})).then(res => {
  const endTime = moment();
  console.log("Total time => ", endTime.diff(startTime, 'seconds'))
  console.log("Total saved items => ", _.flatten(res).length);
}).catch(err => {
  console.log("Something big went wrong");
})