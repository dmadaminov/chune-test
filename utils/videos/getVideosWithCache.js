const { Video } = require('../../server/models/index');
const { Op } = require('sequelize');

const mapToOldFormat = (video, artist) => {
  return {
    ID: video.videoId,
    artists: [artist],
    date: video.date,
    image: video.image,
    isVideo: video.isVideo,
    lastFetchedAt: video.lastFetchedAt,
    source: video.source,
    title: video.title,
    url: video.url,
  };
}

const getVideos = (name) => {
  return Video.findAll({
    where: {
      title: {
        [Op.iLike]: `%${name}%`
      }
    },
    order: [
      ['date', 'DESC']
    ]
  }).then(res => {
    return Promise.resolve(res.map(video => {
        return mapToOldFormat(video, name);
      })
    )
  });
}

module.exports = getVideos;
