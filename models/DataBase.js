const Sequelize = require('sequelize');

// Coneckão Com Banco De Dados
const sequelize = new Sequelize('postapp', 'root', 'opauwlo', {
  host: "localhost",
  dialect: 'mysql'
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
} 