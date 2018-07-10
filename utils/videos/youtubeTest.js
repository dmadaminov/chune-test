const firestore = require('../firebase/firestore');
var _ = require('lodash');
const moment = require('moment');
const logger = require('../chuneLogger');
const axios = require('axios')
const queryString = require('querystring')
const channels = require('./channels');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const apiKey = process.env.YOUTUBE_API_KEY;

const extractArtistNamesFromTitle = (title, names) => {
  return names.filter(name => {
    return title.toLowerCase().indexOf(name.toLowerCase()) >= 0;
  })
}

const normalizeName = name => {
  return name.split(" ").join("");
}

const sampleChannels = [channels[0]];

const fetchFromYoutube = (names, lastDate = moment().subtract(1, 'year')) => {
  return Promise.all(sampleChannels.map(channel => {

    const url = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channel.channelId}&part=snippet,contentDetails`;
    return axios.get(url).then(result => {
      console.log("Result from channel => ", channel.name);

      let item = {
        ...channel,
        uploadsPlaylistId: result.data.items[0].contentDetails.relatedPlaylists.uploads,
      }

      logger.info(`Fetched ${result.length} videos of channeld ${channel.name}`);
      return item;
    });
  })).then(results => {
    console.log("Result", results[0]);
    fs.writeFile('channelsWithUploads.json', JSON.stringify({data: results}), 'utf8', ()=> console.log("File written"));

  }).catch(err => {
    console.error(err);
  })
}

const fetchItems = (url, items = [], dateLimit = moment().subtract(1, 'year')) => {
  return axios.get(url).then(result => {

    items = items.concat(result.data.items);
    nextPageToken = result.data.nextPageToken;
    const lastPublishedAt = moment(items[items.length-1].snippet.publishedAt);
    
    if (!nextPageToken || lastPublishedAt.isBefore(dateLimit) || items.length > 2000) {
      console.log("Final return");
      return items;
    } else {
      console.log("Recusring", items.length, nextPageToken);
      url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${"UUhi08h4577eFsNXGd3sxYhw"}&part=snippet&maxResults=50&pageToken=${nextPageToken}`
      return fetchItems(url, items);
    }
  });
}

const channelsWithUploads = require('../../channelsWithUploads.json').data;

const fetchOneYearPlaylistItemsForChannel = (channel) => {
  console.log("Start fetching for channel => ", channel.name)
  let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${channel.uploadsPlaylistId}&part=snippet&maxResults=50`;
  return fetchItems(url, []).then(results => {
    console.log("Result", results);
    fs.writeFile(`youtube-data/${channel.name}__${channel.channelId}.json`, JSON.stringify({ data: results }), 'utf8', () => console.log("File written"));
    return results;
  }).catch(err => {
    console.log("ERR fetching channel => ", channel.name);
    console.error(err);
  });
}

Promise.all(channelsWithUploads.map(channel => {
  return fetchOneYearPlaylistItemsForChannel(channel);
})).then(res => {
  console.log("Total saved items => ", _.flatten(res).length);
}).catch(err => {
  console.log("Something big went wrong");
})