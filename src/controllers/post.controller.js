const Post = require('../models/Post');
const User = require('../models/User');
const { posts } = require('../services/posts.service');



module.exports = {
  postController: {
    create: posts.create,
    update: posts.update,
    delete: posts.delete,
    //render pages
    renderPost: posts.renderPost,
    showCreatePost: async (req, res) => {
      let info = req.user;
      let user =  await User.findOne({where: {id_user: info.sub}});
      res.render('form', {
        user
      });
    },
    showEditPost: (req, res) => {
      Post.findAll({
        where: {
          id: req.params.id,
        },
      }).then((post) => {
        let userInfo = req.user;
        res.render('edit', {
          edit: post,
          info: {
            userInfo,
          },
        });
      });
    },
    showPereviewPost: (req, res) => {
      Post.findAll({
        where: {
          slug: req.params.slug,
        },
      }).then(function (post) {
        res.render('posts', {
          posts: post,
        });
      });
    },
  },
};
