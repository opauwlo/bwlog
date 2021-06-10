const db = require('./DataBase');

const Post = db.sequelize.define('postagens', {
  titulo: {
    type: db.Sequelize.STRING
  },
  descricao: {
    type: db.Sequelize.TEXT
  },
  conteudo: {
    type: db.Sequelize.TEXT
  }
})

// Post.sync({force: true})

module.exports = Post