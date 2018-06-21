const firestore = require('../firebase/firestore');
var _ = require('lodash');
const moment = require('moment');
const logger = require('../chuneLogger');
const axios = require('axios')
const queryString = require('querystring')
const channels = require('./channels');
const dotenv = require('dotenv');
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

const fetchFromYoutube = (names, lastDate = moment().subtract(1, 'year')) => {
    return Promise.all(channels.map(channel => {
        var apiQuery = {
            key: apiKey,
            channelId: channel.channelId,
            part: 'snippet',
            q: names.map(normalizeName).join('|'),
            maxResults: 10,
            order: 'date',
            type: 'video',
            publishedAfter: lastDate.format(),
        }
        const url = "https://www.googleapis.com/youtube/v3/search?" + queryString.stringify(apiQuery);
        return axios.get(url).then(res => {
          var result = res.data.items.filter(match => {
            return extractArtistNamesFromTitle(match.snippet.title, names).length > 0;
          }).map((match) => {
            return {
              ID: Object.values(match.id).join(":"),
              url: match.id.videoId,
              artists: extractArtistNamesFromTitle(match.snippet.title, names),
              title: match.snippet.title,
              image: match.snippet.thumbnails.high.url,
              date: moment(match.snippet.publishedAt).toDate(),
              source: channel.name,
              isVideo: true,
            };
          })
          
          logger.info(`Fetched ${result.length} videos of channeld ${channel.name}`);
          return result;
        });
    })).then(results => {
      return _.chain(results)
              .flattenDeep()
              .map(item => {
                item.lastFetchedAt = moment().toDate()
                return item;
              })
              .sortBy(match => match.date)
              .reverse().value();
    })
}

module.exports = fetchFromYoutube;