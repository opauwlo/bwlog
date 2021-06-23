const db = require('./DataBase');

const Post = db.sequelize.define('postagens', {
  titulo: {
    type: db.Sequelize.STRING
  },
  slug: {
    type: db.Sequelize.TEXT
  },
  descricao: {
    type: db.Sequelize.TEXT
  },
  conteudo: {
    type: db.Sequelize.TEXT
  },
  publicado: {
    type: db.Sequelize.BOOLEAN
  },
  autor : {
    type: db.Sequelize.STRING
  },
  email: {
    type: db.Sequelize.STRING
  },
  foto : {
    type: db.Sequelize.STRING
  },
  id_user : {
    type: db.Sequelize.STRING
  }
})

// Post.sync({force: true})

module.exports = Post