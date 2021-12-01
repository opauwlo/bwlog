const User = require('../models/User');
require('../middlewares/checkAuthenticated')

module.exports = {
  profileController: {
    privateProfile: (req, res) => {
      User.findOne({
        order: [['id', 'DESC']],
        where: {
          id_user: user.sub,
        },
        include: { association: 'posts' }
      }).then((posts, user) => {
        res.render('perfil', {
          posts: posts,
          user: user
        });
      });
    }, 

    publicProfile: (req, res) => {
      const id = req.params.id_user;
      User.findOne({
        order: [['id', 'DESC']],
        where: {
          id_user: id,
        },
        include: { association: 'posts' }
        
      }).then((posts, user) => {
        res.render('autor', {
          posts: posts,
          user: user
        });
      });
    }
  },
};