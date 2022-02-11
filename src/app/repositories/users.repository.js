const Post = require('../../database/models/Post');
const User = require('../../database/models/User');

const cache = require('../utils/cache');
const slugify = require('slugify');

require('../middlewares/checkAuthenticated');

module.exports = {
   
  Users: {

    findOrCreateUser: async (info, profile, profile_id, banner, banner_id) => {
      const [user, created] = await User.findOrCreate({
        where: {
          id_user: info.sub
        },
        defaults: {
          name: info.name,
          user_name: slugify(info.name , { lower: true }),
          email: info.email,
          profile: profile,
          profile_id: profile_id,
          banner: banner,
          banner_id: banner_id,
          descricao: `Olá, me chame de ${info.name}`,
        },
      });
      return [created, user];
    },
    updateUserProfile: async (user_name, descricao, profile, profile_id, banner, banner_id,id) => {
      var success = null;
      await User.update({
        user_name: slugify(user_name , { lower: true }),
        descricao: descricao,
        profile:  profile,
        profile_id: profile_id,
        banner : banner,
        banner_id : banner_id  
      }, {
        where: {
          id: id,
        },
      }).then(() => {
        success = true;
      }).catch(async (e) => {
        success = false;
      });
      
    },
    getUserProfile: async (id) => {

      const UserProfileCached =  await cache.get(`user_${id}`);

      if (UserProfileCached) {
        return UserProfileCached;
      }

      try {
        const UserProfile = await User.findOne({
          attributes: ['id', 'user_name', 'profile', 'banner', 'profile_id', 'banner_id', 'descricao'],
          where: {id: id}
        });
        await cache.set(`user_${id}`, UserProfile, 15);

        return JSON.parse(JSON.stringify(UserProfile));

      } catch (e) { 
        console.log(e);
      }
    },
    getPublicProfile: async (id) => {

      const PublicProfileCached =  await cache.get(`public_${id}`);

      if (PublicProfileCached) {
        return PublicProfileCached;
      }
      try {
        const PublicProfile = await Post.findAll({
          order: [['id', 'DESC']],
          attributes: ['titulo', 'descricao', 'slug', 'user_id', 'publicado'],
          include: [{
            model: User,
            as: 'user', 
            attributes: ['user_name'],
            required: true
          }],
          where: {
            user_id: id,
            publicado: true
          },
        });
        await cache.set(`public_${id}`, PublicProfile, 10);
        return JSON.parse(JSON.stringify(PublicProfile));

      } catch (e) {}
    },
    countPostsFromProfile: async (id) => {
      const cachedCountPosts = await cache.get(`cachedCountPosts${id}`);

      if (cachedCountPosts) {
        return cachedCountPosts;
      }
      try {
        const CountPosts = Post.count({
          where: {
            user_id: id
          },
        });
        await cache.set(`cachedCountPosts${id}`, await CountPosts, 25);
        return await CountPosts;

      } catch (e) {}
    },
    getUserPosts: async (id, offset) => {
      const cachedPosts = await cache.get(`getUserPosts${id}`);

      if (cachedPosts) {
        return cachedPosts;
      }
      
      try {
        const Posts = await Post.findAll({
          limit: 50,
          offset: offset,
          attributes: ['id','titulo','slug', 'descricao', 'publicado'],
          order: [['id', 'DESC']],
          include: [{
            model: User,
            as: 'user', 
            attributes: ['user_name'],
            required: true
          }],
          where: { user_id : id },
        });
        await cache.set(`getUserPosts${id}`, Posts, 5);
        return JSON.parse(JSON.stringify(Posts)); 

      } catch (e) {}
    }
  }
};