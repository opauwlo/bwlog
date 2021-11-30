'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('users', { 
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },      
      autor : {
        type: db.Sequelize.STRING
      },
      email: {
        type: db.Sequelize.STRING
      },
      foto : {
        type: db.Sequelize.STRING
      },
      id_user : {
        type: db.Sequelize.STRING
      }    
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('users');
  }
};
