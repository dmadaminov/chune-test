'use strict';
module.exports = (sequelize, DataTypes) => {
  var Alias = sequelize.define('Alias', {
    description: DataTypes.STRING,
    artist_id: DataTypes.INTEGER
  }, {});
  Alias.associate = function(models) {
    // associations can be defined here
  };
  return Alias;
};
