const Sequelize = require('sequelize');
require('dotenv').config();
// Coneckão Com Banco De Dados
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306
  });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}