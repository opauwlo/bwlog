const Sequelize = require('sequelize');
require('dotenv').config();

// Coneckão Com Banco De Dados
const infos = require('../configs/db.config');

const User = require('./models/User');
const Post = require('./models/Post');
const Textlist = require('./models/Textlist');

const sequelize = new Sequelize(infos);
//sequelize.sync({force:true})
User.init(sequelize);
Post.init(sequelize);
Textlist.init(sequelize);

User.associate(sequelize.models);
Post.associate(sequelize.models);
Textlist.associate(sequelize.models);

module.exports = sequelize;