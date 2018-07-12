
const { Video } = require('../../server/models/index');
const moment = require('moment');
const _ = require('lodash');
const chuneLogger = require('../../utils/chuneLogger');

const insertVideos = (videos, channel, lastFetchedAt = moment().toDate()) => {
  let models = videos.map(video => {
    return {
      videoId: `${video.snippet.resourceId.kind}:${video.snippet.resourceId.videoId}`,
      date: moment(video.snippet.publishedAt).toDate(),
      source: channel.name,
      url: video.snippet.resourceId.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      image: video.snippet.thumbnails.high.url,
      lastFetchedAt: lastFetchedAt,
      isVideo: true,
      channelId: channel.channelId,
    }
  })
  var originalLength = models.length;
  models = _.uniqBy(models, 'videoId');


  chuneLogger.log({ level: 'info', message: `Total videos for ${channel.name} => original = ${originalLength} : unique = ${models.length}` });
  return Promise.all(models.map(model => {
    return Video.create(model).catch(err => {
      chuneLogger.log({
        level: 'info',
        message: model.videoId + " cannot be created!"
      })
      chuneLogger.log({ level: 'error', message: err });
      return null;
    })
  }));
}

module.exports = insertVideos;

// const channelsWithUploads = require('./channelsWithUploads.json').data;
// const currentChannel = channelsWithUploads[0];
// const sampleVideo = { "kind": "youtube#playlistItem", "etag": "\"DuHzAJ-eQIiCIp7p4ldoVcVAOeY/FJa3WnhWlYsbn7U8wLp6DeZUFlM\"", "id": "VVVVZGgwM3hkdWw5SVRSRXlGR1FwNGR3Lk1OM0h0bFU1RFRz", "snippet": { "publishedAt": "2018-07-05T23:20:12.000Z", "channelId": "UCUdh03xdul9ITREyFGQp4dw", "title": "Interview with \"The Queen Bee\" Madison Rayne (Round Two)", "description": "Watch AMBY's exclusive interview with Madison Rayne! While at the IMPACT One Night Only show in Toronto and after a full weekend of tapings in Windsor, I had the absolute pleasure of catching up with one of my favourite people, Madison Rayne! Learn more ahead of Rayne's massive Slammiversary match against Su Yung where she has the opportunity to become a six-time Knockouts Champion! Dive into the conversation as we discuss being great at arguing, amazing snacks, wrestling her older brothers, boy bands, ignoring internet trolls, shows she's obsessed with, and how her Dad watched our interview. \n\n--\n\nFollow AMBY:\n\nhttp://www.amusicblogyea.com\n\nhttps://www.facebook.com/AMusicBlogYea\n\nhttps://twitter.com/AliciaAtout\n\nhttps://www.instagram.com/amusicblogyea/\n\nhttps://www.instagram.com/aliciaatout/\n\nSubscribe to AMBY ► http://www.youtube.com/amusicblogyea\n\nGet Your AMBY Merch ► http://amusicblogyea.bigcartel.com/", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/MN3HtlU5DTs/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/MN3HtlU5DTs/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/MN3HtlU5DTs/hqdefault.jpg", "width": 480, "height": 360 }, "standard": { "url": "https://i.ytimg.com/vi/MN3HtlU5DTs/sddefault.jpg", "width": 640, "height": 480 }, "maxres": { "url": "https://i.ytimg.com/vi/MN3HtlU5DTs/maxresdefault.jpg", "width": 1280, "height": 720 } }, "channelTitle": "Alicia Atout - AMBY Interviews", "playlistId": "UUUdh03xdul9ITREyFGQp4dw", "position": 0, "resourceId": { "kind": "youtube#video", "videoId": "MN3HtlU5DTs" } } };

// insertVideos([sampleVideo], currentChannel, moment().toDate()).then(res => {
//   console.log("Inserted!");
// });