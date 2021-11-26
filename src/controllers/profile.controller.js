const Post = require('../models/Post');
require('../middlewares/checkAuthenticated')

module.exports = {
  profileController: {
    privateProfile: (req, res) => {
      let user = req.user;
      Post.findAll({
        order: [['id', 'DESC']],
        where: {
          id_user: user.sub,
        },
      }).then((posts) => {
        res.render('perfil', {
          posts: posts,
          user: user,
        });
      });
    }, 

    publicProfile: (req, res) => {
      const id = req.params.id_user;
      Post.findAll({
        order: [['id', 'DESC']],
        where: {
          id_user: id,
          publicado: true,
        },
      }).then((posts) => {
        res.render('autor', {
          posts: posts,
        });
      });
    }
  },
};