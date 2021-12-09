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
      name : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: false,
        unique: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      foto : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_user : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('users');
  }
};
