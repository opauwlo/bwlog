'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return await queryInterface.createTable('posts', { 
       id:{
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
       },
       titulo: {
         type: Sequelize.STRING,
         allowNull: false,
       },
       slug: {
          type: Sequelize.STRING,
          allowNull: false,
       },
       descricao: {
         type: Sequelize.TEXT,
         allowNull: false,
       },
       conteudo: {
          type: Sequelize.TEXT,
          allowNull: false,
       },
       publicado: {
         type: Sequelize.BOOLEAN,
       },
       editado: {
         type: Sequelize.BOOLEAN,
       },
       user_id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         references: {model: 'users', key: 'id'},
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE'
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
    return await queryInterface.dropTable('posts');
  }
};