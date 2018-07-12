'use strict';
module.exports = (sequelize, DataTypes) => {
  var Video = sequelize.define('Video', {
    videoId      : { type: DataTypes.STRING, unique: true },
    date         : { type: DataTypes.DATE },
    image        : { type: DataTypes.STRING },
    channelId    : { type: DataTypes.STRING },
    lastFetchedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    source       : { type: DataTypes.STRING },
    title        : { type: DataTypes.STRING },
    description  : { type: DataTypes.TEXT },
    url          : { type: DataTypes.STRING },
  },
    { 
      indexes: [
        { unique: true, fields: ['videoId'] },
        { fields: ['title'], method: 'BTREE' },
        { fields: ['channelId'], method: 'BTREE' },
      ],
    }
  );
  Video.associate = function(models) {
    // associations can be defined here
  };
  return Video;
};