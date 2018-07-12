'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return Promise.all([
       queryInterface.addIndex('Videos', { unique: true, fields: ['videoId'], name: "Videos_videosId_unique" }),
       queryInterface.addIndex('Videos', { fields: ['title'], method: 'BTREE', name: "Videos_title_btree" }),
       queryInterface.addIndex('Videos', { fields: ['channelId'], method: 'BTREE', name: "Videos_channelId_btree" }),
     ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeIndex('Videos', "Videos_videosId_unique"),
      queryInterface.removeIndex('Videos', "Videos_title_btree"),
      queryInterface.removeIndex('Videos', "Videos_channelId_btree"),
    ])
  }
};
