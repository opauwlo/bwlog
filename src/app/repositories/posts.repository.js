const Post = require('../../models/Post');
const User = require('../../models/User');

const slugify = require('slugify');
const random = require('../utils/slugNumbers');

module.exports = {

  Posts: {
    createPost: async (titulo, descricao, conteudo, publicado, textlist, user_id) => {

      let success = null;
      
      if (textlist == "NULL") {
        let textlist_null = null;
        textlist = textlist_null;
      }
      await Post.create({
        titulo: titulo,
        slug: slugify(titulo + -+random(), {
          lower: true,
        }),
        descricao: descricao,
        conteudo: conteudo,
        publicado: publicado,
        editado: false,
        textlist_post_owner: textlist,
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

    updatePost: async (titulo, descricao, conteudo, publicado, textlist, id) => {
      let success = null;
      
      if (textlist == "NULL") {
        let textlist_null = null;
        textlist = textlist_null;
      }
      await Post.update({
        titulo: titulo,
        slug: slugify(titulo + -+random(), {
          lower: true,
        }),
        descricao: descricao,
        conteudo: conteudo,
        publicado: publicado,
        editado: true,
        textlist_post_owner: textlist,
      }, {
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
    countPosts: async () => {
      const CountPosts = Post.findAndCountAll({
        attributes: ['id'],
        where: {
          publicado: true,
        },
      });
      return CountPosts;
    },
    fromHome: async (offset) => {
      const Posts = await Post.findAll({
        limit: 50,
        offset: offset,
        attributes: ['titulo', 'slug', 'descricao', 'publicado', 'createdAt'],
        include: [{
          model: User,
          attributes: ['user_name'],
          as: 'user',
        }],
        where: {
          publicado: true,
        },
        order: [['createdAt', 'DESC']],
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
      }).then(post => {
        return post;
      }).catch(err => {
        console.log(err);
      });
      return Posts;
    },
    fromTextlistPage: async (id) => {
      const Posts = await Post.findAll({
        order: [['id', 'DESC']],
        where: { textlist_post_owner: id },
        include: [{
          model: User,
          as: 'user'
        }]
      });
      return Posts;
    }
  },
};