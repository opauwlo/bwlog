const Post = require('../../models/Post');
const User = require('../../models/User');

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
          user_name: info.name.replace(/\s/g, ''),
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
        user_name: user_name.replace(/\s/g, ''),
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
        console.log(e);
        success = false;
      });
      
    },
    getUserProfile: async (id) => {
      const UserProfile = await User.findOne({
        where: {id: id}
      });
      
      return UserProfile;
    },
    getPublicProfile: async (id) => {
      const PublicProfile = await Post.findAll({
        order: [['id', 'DESC']],
        include: [{
          model: User,
          as: 'user', 
          required: true
        }],
        where: {
          user_id: id,
          publicado: true
        },
      });

      return PublicProfile;
    },
    countPosts: async (id) => {
      const CountPosts = Post.findAndCountAll({
        attributes: ['id'],
        where: {
          user_id: id
        },
      });
      return CountPosts;
    },
    getUserPosts: async (id, offset) => {
      const Posts = await Post.findAll({
        limit: 50,
        offset: offset,
        attributes: ['id','titulo','slug', 'descricao', 'publicado', 'createdAt'],
        order: [['id', 'DESC']],
        include: [{
          model: User,
          as: 'user', 
          attributes: ['id','user_name', 'profile', 'banner', 'descricao'],
          required: true
        }],
        where: { user_id : id },
       });
      return Posts;
    }
  }
};