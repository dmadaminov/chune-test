'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      videoId: { type: Sequelize.STRING, unique: true },
      date: { type: Sequelize.DATE },
      image: { type: Sequelize.STRING },
      isVideo: { type: Sequelize.BOOLEAN, defaultValue: true },
      lastFetchedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      source: { type: Sequelize.STRING },
      channelId: { type: Sequelize.STRING },
      title: { type: Sequelize.STRING },
      url: { type: Sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Videos');
  }
};