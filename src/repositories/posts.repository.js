const Post = require('../models/Post');
const User = require('../models/User');

const slugify = require('slugify');
const random = require('../utils/slugNumbers');

module.exports = {

  Posts: {
    createPost: async (titulo, descricao, conteudo, publicado, editado, user_id) => {

      let success = null;

      await Post.create({
        titulo: titulo,
        slug: slugify(titulo + -+random(), {
          lower: true,
        }),
        descricao: descricao,
        conteudo: conteudo,
        publicado: publicado,
        editado: editado,
        user_id: user_id
      })
        .then(() => {
          success = true;
        })
        .catch(() => {
          success = false;
        });
      
      return success;
    },

    updatePost: async (args, id) => {
      let success = null;

      await Post.update(args, {
        where: {
          id: id,
        },
      })
        .then(() => {
          success = true;

        })
        .catch(() => {
          success = false;
        });
      return success;
    },

    deletePost: async (id) => {
      let success = null;
      await Post.destroy({
        where: {
          id: id,
        },
      })
        .then(() => {
          success = true;
        })
        .catch(() => {
          success = false;
        });
      return success;
    },
    fromHome: async () => {
      const Posts = await Post.findAll({
        order: [['id', 'DESC']],
        include: [{
          model: User,
          as: 'user',
        }],
        where: {
          publicado: true,
        },
      });
      return Posts;
    },
    fromPostPage: async (slug) => {
      const PostPage = await Post.findAll({
        where: {
          slug: slug,
          publicado: true,
        },
        include: [{
          model: User,
          as: 'user',
        }],
      });
      return PostPage;
    },
    fromPostPreview: async (slug) => {
      const PostPreview = await Post.findAll({
        where: {
          slug: slug,
        },
        include: [{
          model: User,
          as: 'user',
        }]
      });

      return PostPreview
    },

    fromEditPage: async (id) => {
      const Posts = await Post.findOne({
        where: { id: id },
        include: [{
          model: User,
          as: 'user'
        }]
      });
      return Posts;
    },
  },
};