const Sequelize = require('sequelize');
require('dotenv').config();

// Coneckão Com Banco De Dados
const infos = require('../configs/db.config');

const User = require('../models/User');
const Post = require('../models/Post');

const sequelize = new Sequelize(infos);
// sequelize.sync({force:true})
User.init(sequelize);
Post.init(sequelize);

Post.associate(sequelize.models);
User.associate(sequelize.models);

module.exports = sequelize;