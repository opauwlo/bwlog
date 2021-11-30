const db = require('../configs/db.config');

const Post = db.sequelize.define('postagens', {
  titulo: {
    type: db.Sequelize.STRING
  },
  slug: {
    type: db.Sequelize.STRING
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
  editado: {
    type: db.Sequelize.BOOLEAN
  },

});


// Post.sync({force: true})

module.exports = Post