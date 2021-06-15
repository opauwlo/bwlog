const Sequelize = require('sequelize');
// Coneckão Com Banco De Dados
const sequelize = new Sequelize('dbpostapp', 'admin', '88442211', {
  host: 'mysqlserver.cobg4huxvctc.us-east-2.rds.amazonaws.com',
  dialect: 'mysql'
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
} 