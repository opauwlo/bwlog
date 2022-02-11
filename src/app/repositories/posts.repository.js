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
      const cachedPosts = await cache.get(`posts_${offset}`);

      if (cachedPosts) {
        return {posts: cachedPosts};
      }
      try {
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
        await cache.set(`posts_${offset}`, Posts, 15);
  
        return {posts : JSON.parse(JSON.stringify(Posts))};

      } catch (e) { console.log(e) }
    },
    fromPostPage: async (slug) => {
      const cachedPost = await cache.get(`post_${slug}`);

      if (cachedPost) {
        return cachedPost;
      }

      try {
        var haveTextlist = false;

        const PostPage = await Post.findOne({
          where: {
            slug: slug,
            publicado: true,
          },
          include: [{
            model: User,
            as: 'user',
          }],
        });
           
        cache.set(`post_${slug}`, PostPage, 20);
        return JSON.parse(JSON.stringify(PostPage));
      } catch (error) { console.log(error)}
    },

    fromPostPreview: async (slug) => {
      try {
        var haveTextlist = false;

        const PostPreview = await Post.findOne({
          where: {
            slug: slug,
          },
          include: [{
            model: User,
            as: 'user',
          }]
        });

        const verifyTextlist = PostPreview.textlist_post_owner;

        if (verifyTextlist) {  
          var textlist = await Textlists.getOneTextlist(PostPreview.textlist_post_owner);

          if (textlist.public == false) {
            haveTextlist = false;
          } else {
            haveTextlist = true
          }
        } 

        return { post: JSON.parse(JSON.stringify(PostPreview)), textlist: JSON.parse(JSON.stringify(textlist)), haveTextlist: haveTextlist };
      
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
      try {
        const Posts = await Post.findAll({
          order: [['id', 'DESC']],
          where: { textlist_post_owner: id },
          include: [{
            model: User,
            as: 'user'
          }]
        });
        
        return JSON.parse(JSON.stringify(Posts));

      } catch (e) {}
    }
  },
};