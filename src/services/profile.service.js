const { Users } = require('../repositories/users.repository');

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
      let info = req.user;
      let nickname = req.body.nickname;
      let desc = req.body.desc;
      try {
        await Users.updateUserProfile(info, nickname, desc);

        if(success) {
          req.flash('success_msg', 'Perfil atualizado com sucesso!');
          res.redirect('/perfil');

        } else {
          console.log(e);
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