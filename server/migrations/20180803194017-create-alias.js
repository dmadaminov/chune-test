'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Aliases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      artist_id: {
          type: Sequelize.INTEGER,
          //references: {
          //    model: 'Artist',
          //    key: 'id',
          //    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
          //}
          allowNull: false
      },
      createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Aliases');
  }
};
