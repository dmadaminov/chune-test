'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Artists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      artistId: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      genres: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      relatedArtists: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      events: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: []
      },
      lastFetchedAt: {
        type: Sequelize.DATE
      },
      eventsLastFetchedAt: {
        type: Sequelize.DATE
      },
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
    return queryInterface.dropTable('Artists');
  }
};