const Post = require('../models/Post');
const User = require('../models/User');

require('../middlewares/checkAuthenticated');

module.exports = {
  
  Users: {

    findOrCreateUser: async (info) => {
      const [user, created] = await User.findOrCreate({
        where: {
          id_user: info.sub
        },
        defaults: {
          name: info.name,
          user_name: info.name,
          email: info.email,
          foto: info.picture,
          descricao: `Olá, me chame de ${info.name}`,
        },
      });
      return [created, user];
    },
    updateUserProfile: async (info, nickname, desc) => {
      let success = null;
      await User.update({
        user_name: nickname,
        descricao: desc,

      }, {
        where: {
          id_user: info.sub,
        },
      }).then(() => {
        success = true;
      }).catch(async (e) => {
        console.log(e);
        success = false;
      });
      return success;
    },
    getUserProfile: async (info) => {
      const UserProfile = await User.findOne({
        where: {id_user: info.sub}
      });
      
      return UserProfile;
    },
    getPublicProfile: async (id) => {
      const PublicProfile = await User.findOne({
        order: [['id', 'DESC']],
        where: {
          id_user: id,
        },
        include: { association: 'posts' }
      });

      return PublicProfile;
    },

    getUserPosts: async (id) => {
      const Posts = await Post.findAll({ where: { user_id: id },
        include: [{
          model: User,
          as: 'user',
          where: { id: id },
        }],
       });
      return Posts;
    }
  }
};