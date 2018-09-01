'use strict';
module.exports = (sequelize, DataTypes) => {
  var Artist = sequelize.define('Artist', {
    name: DataTypes.STRING,
    disambiguation: DataTypes.STRING,
    isFollowed: DataTypes.BOOLEAN
  }, {});
  Artist.associate = function(models) {
    // associations can be defined here
  };
  return Artist;
};
