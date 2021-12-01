require('../middlewares/checkAuthenticated');

const User = require('../models/User');

module.exports = {
    loginController: {
      login: (req, res) => {
        res.render('login');
      },

      createProfile: async (req, res) => {
        await User.findOrCreate({
          where: { id_user: user.sub },
          defaults: {
            name: user.name,
            email: user.email,
            foto: user.picture,
            descricao: `Olá, meu nome é ${user.name}`
          }
        });
        res.redirect('/perfil');
      }
    },
  };