const Sequelize = require('sequelize');
require('dotenv').config();
// Coneckão Com Banco De Dados
const infos = require('./db.infos')
const sequelize = new Sequelize(infos);

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}