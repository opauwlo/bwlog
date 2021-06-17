const db = require('./DataBase');

const Users = db.sequelize.define('users', {
  autor : {
    type: db.Sequelize.STRING
  },
  email: {
    type: db.Sequelize.STRING
  },
  foto : {
    type: db.Sequelize.STRING
  }
})

// Users.sync({force: true})

module.exports = Users