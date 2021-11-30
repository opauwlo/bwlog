const Sequelize = require('sequelize');
const dbConfig = require('../configs/db.config');

const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;