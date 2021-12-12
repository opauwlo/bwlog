const { Users } = require('../repositories/users.repository');

const myUrl = require('../utils/upImgBB');

module.exports = {
  profile: {
    private: async (req, res) => {
      try {
        const id = req.id
        const user = await Users.getUserProfile(id)
        const posts = await Users.getUserPosts(id);
        res.render('perfil', {
          user,
          posts: posts,
        });

      }
      catch (e) {
        console.log(e);
        res.status(500).json({
          message: e.message
        });
      }
    },

    public: async (req, res) => {
      try {
        const id = req.params.id;
        const user = await Users.getUserProfile(id)
        const publicProfile = await Users.getPublicProfile(id);
        res.render('autor', {
          posts: publicProfile,
          user: user
        });
      }
      catch (e) {
        console.log(e);
        res.status(500).json({
          message: e.message
        });
      }
    },
    updated: async (req, res) => {

      let id = req.id;
      let { user_name, descricao } = req.body;
      if (req.files != null && req.files.profile_img != null) {
        var profile = req.files.profile_img.data
        profile = profile.toString('base64');
        profile = await myUrl(profile);

      }
      if (req.files != null && req.files.banner_img !=null ) {
        var banner = req.files.banner_img.data
        banner = banner.toString('base64');
        banner = await myUrl(banner);
      }

      try {
        const success = await Users.updateUserProfile(user_name, descricao, profile, banner, id);

        if(success == true) {
          req.flash('success_msg', 'Perfil atualizado com sucesso!');
          res.redirect('/perfil');

        } else {
          await req.flash('error_msg', 'Houve um erro :( tente novamente');
          res.redirect('/perfil');
        }

      } catch (e) {
        console.log(e);
      }
    },
    renderUpdate: async (req, res) => {
      let id = req.id;

      if (id == req.params.id) {
        try {
          const user = await Users.getUserProfile(id);
          res.render('updateProfile', {
            user: user
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        req.flash('error_msg', 'Você não tem permissão para acessar esta página');
        res.redirect('/perfil');
      }
    }
  }
};