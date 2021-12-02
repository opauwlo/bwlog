const Sequelize = require('sequelize');
require('dotenv').config();

// Coneckão Com Banco De Dados
const infos = require('../configs/db.config');

const User = require('../models/User');
const Post = require('../models/Post');

const sequelize = new Sequelize(infos);

User.init(sequelize);
Post.init(sequelize);

User.associate(sequelize.models);
Post.associate(sequelize.models);

module.exports = sequelize;