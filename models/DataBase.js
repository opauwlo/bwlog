const Sequelize = require('sequelize');
// Coneckão Com Banco De Dados
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DEB_PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql'
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
} 