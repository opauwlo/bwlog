const db = require('./DataBase');

const Comment = db.sequelize.define('comments', {
  autor : {
    type: db.Sequelize.STRING
  },
  foto : {
    type: db.Sequelize.STRING
  },
  id_comment: {
    type: db.Sequelize.STRING
  },
  id_user: {
    type: db.Sequelize.STRING
  },
  conteudo: {
    type: db.Sequelize.STRING
  }
})

//Comment.sync({force: true})

module.exports = Comment;