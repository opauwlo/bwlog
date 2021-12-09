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
          user_name: info.name.replace(/\s/g, ''),
          email: info.email,
          foto: info.picture,
          descricao: `Olá, me chame de ${info.name}`,
        },
      });
      return [created, user];
    },
    updateUserProfile: async (id, nickname, desc) => {
      let success = null;
      await User.update({
        user_name: nickname,
        foto: foto,
        descricao: desc,
        
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
      return success;
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

    getUserPosts: async (id) => {
      const Posts = await Post.findAll({
        order: [['id', 'DESC']],
        include: [{
          model: User,
          as: 'user', 
          required: true
        }],
        where: { user_id : id },
       });
      return Posts;
    }
  }
};