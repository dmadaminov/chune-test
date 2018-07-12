
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
