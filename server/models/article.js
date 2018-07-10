'use strict';
module.exports = (sequelize, DataTypes) => {
  var Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    source: DataTypes.STRING,
    url: DataTypes.STRING,
    image: DataTypes.STRING,
    lastFetchedAt: DataTypes.DATE
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};