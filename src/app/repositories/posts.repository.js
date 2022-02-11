const Post = require('../../database/models/Post');
const User = require('../../database/models/User');
const { Textlists } = require('./textlists.repository.js')
const slugify = require('slugify');
const random = require('../utils/slugNumbers');

const cache = require('../utils/cache');

module.exports = {

  Posts: {
    createPost: async (titulo, descricao, conteudo, publicado, textlist, user_id) => {

      let success = null;
      
      let u_id = random();

      if (textlist == "NULL") {
        let textlist_null = null;
        textlist = textlist_null;
      }
      await Post.create({
        titulo: titulo,
        u_id: u_id,
        slug: slugify(titulo + - + u_id, {
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

    updatePost: async (titulo, descricao, conteudo, publicado, textlist, u_id) => {
      let success = null;
      if (textlist == "NULL") {
        let textlist_null = null;
        textlist = textlist_null;
      }
      await Post.update({
        titulo: titulo,
        slug: slugify(titulo +-+ u_id, {
          lower: true,
        }),
        descricao: descricao,
        conteudo: conteudo,
        publicado: publicado,
        editado: true,
        textlist_post_owner: textlist,
      }, {
        where: {
          u_id: u_id,
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

      const cachePageLimit = await cache.get('cachePageLimit');
      if (cachePageLimit) {
        return cachePageLimit;
      }
      const CountPosts = Post.count({
        where: {
          publicado: true,
        },
      });
      await cache.set('cachePageLimit', await CountPosts, 15);
      return await CountPosts;
    },
    fromHome: async (offset) => {
      const cachedPosts = await cache.get(`posts`);

      if (cachedPosts) {
        return {posts: cachedPosts, isCached: true};
      }

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
        order: [['id', 'DESC']],
      });
      await cache.set(`posts`, Posts, 15);

      return {posts : JSON.parse(JSON.stringify(Posts))};
    },
    fromPostPage: async (slug) => {

      const cachedPost = await cache.get(`post_${slug}`);
      const cachedHaveTextlist = await cache.get(`verifyTextlist_${slug}`);
      const cachedTextlist = await cache.get(`textlist_${slug}`);
      if (cachedPost) {
        return { post: cachedPost, textlist: cachedTextlist, haveTextlist: cachedHaveTextlist };
      }

      try {
        var haveTextlist = false;

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
           
        const verifyTextlist = PostPage[0].textlist_post_owner;

        if (verifyTextlist != null) {  
          var textlist = await Textlists.getOneTextlist(PostPage[0].textlist_post_owner);
          haveTextlist = true
        }
        await cache.set(`verifyTextlist_${slug}`, haveTextlist, 20)
        await cache.set(`textlist_${slug}`, textlist, 20);
        await cache.set(`post_${slug}`, PostPage, 20);

        return { post: JSON.parse(JSON.stringify(PostPage)), textlist: JSON.parse(JSON.stringify(textlist)), haveTextlist: haveTextlist };
      
      } catch (e) {
        console.log(e)
      }
    },

    fromPostPreview: async (slug) => {
      const cachedPost = await cache.get(`post_preview_${slug}`);

      const cachedHaveTextlist = await cache.get(`verifyTextlistPreview_${slug}`);
      const cachedTextlist = await cache.get(`textlistPreview_${slug}`);
      if (cachedPost) {
        return { post: cachedPost, textlist: cachedTextlist, haveTextlist: cachedHaveTextlist };
      }

      try {
        var haveTextlist = false;

        const PostPreview = await Post.findAll({
          where: {
            slug: slug,
          },
          include: [{
            model: User,
            as: 'user',
          }]
        });

        const verifyTextlist = PostPage[0].textlist_post_owner;

        if (verifyTextlist != null) {  
          var textlist = await Textlists.getOneTextlist(PostPage[0].textlist_post_owner);
          haveTextlist = true
        }
        await cache.set(`verifyTextlistPreview_${slug}`, haveTextlist, 20)
        await cache.set(`textlistPreview_${slug}`, textlist, 20);

        await cache.set(`post_preview_${slug}`, PostPreview, 20);
        return JSON.parse(JSON.stringify(PostPreview));
      
      } catch (e){}
    },

    fromEditPage: async (id, user_id) => {
      
      const Posts = await Post.findOne({
        where: { id: id, user_id: user_id },
        include: [{
          model: User,
          as: 'user'
        }]
      }).then(post => {
        return post;
      }).catch(err => {
        return null;
      });
      return Posts;
    },
    fromTextlistPage: async (id) => {

      const cachedPosts = await cache.get(`posts_textlist_${id}`);
      if (cachedPosts) {
        return cachedPosts;
      }
      try {
        const Posts = await Post.findAll({
          order: [['id', 'DESC']],
          where: { textlist_post_owner: id },
          include: [{
            model: User,
            as: 'user'
          }]
        });
        await cache.set(`posts_textlist_${id}`, Posts, 25);
        return JSON.parse(JSON.stringify(Posts));

      } catch (e) {}
    }
  },
};