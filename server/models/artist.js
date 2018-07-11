'use strict';
module.exports = (sequelize, DataTypes) => {
  var Artist = sequelize.define('Artist', {
    name: DataTypes.STRING,
    artistId: DataTypes.JSON,
    genres: DataTypes.ARRAY(DataTypes.TEXT),
    relatedArtists: DataTypes.ARRAY(DataTypes.JSON),
    events: DataTypes.ARRAY(DataTypes.JSON),
    imageUrl: DataTypes.STRING,
    lastFetchedAt: DataTypes.DATE,
    eventsLastFetchedAt: DataTypes.DATE
  }, {});
  Artist.associate = function(models) {
    // associations can be defined here
  };
  return Artist;
};