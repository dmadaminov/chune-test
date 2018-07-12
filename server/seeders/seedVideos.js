#!/usr/bin/env node

const {Video,Artist} = require('../models/index');
const moment  = require('moment');
const chuneLogger = require('../../utils/chuneLogger');
const _ = require('lodash');
const channel = {
  "channelId": "UChi08h4577eFsNXGd3sxYhw",
  "name": "The Breakfast Club",
  "uploadsPlaylistId": "UUhi08h4577eFsNXGd3sxYhw"
};

const insertVideosForChannel = (channel, lastFetchedAt) => {
  const videos = require(`./youtube-data/${channel.name}__${channel.channelId}`).data;
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
  // return Promise.all(models.map(model => {
  //   return Video.create(model).catch(err => {
  //     chuneLogger.log({
  //       level: 'info',
  //       message: model.videoId + " cannot be created!"
  //     })
  //     chuneLogger.log({ level: 'error', message: model.videoId + " cannot be created!" });
  //     console.log("ERR creating model with videoId => ", model.videoId);
  //     console.log(err);
  //     return null;
  //   })
  // }));
  return Video.bulkCreate(models);
}
const lastFetchedAt = moment().toDate();

const channelsWithUpload = require('../../utils/videos/channelsWithUploads.json').data;

Promise.all(
  channelsWithUpload.map(channel => {
    chuneLogger.log({ level: 'info', message: "About to process videos for channel => " + channel.name });
    return insertVideosForChannel(channel).then(res => {
      return Video.findAll({where: {channelId: channel.channelId}});
    }).then(results => {
      chuneLogger.info(results.length + "rows inserted for channel => "+ channel.name);
    }).catch(err => {
      chuneLogger.error("Error inserting for channel => " + channel.name);
      chuneLogger.error(err);
    });
  })
).then(res => {
  chuneLogger.info("Imported all videos", res);
})
