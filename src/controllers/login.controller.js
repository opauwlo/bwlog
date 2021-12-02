const User = require('../models/User');

module.exports = {
    loginController: {
      login: (req, res) => {
        res.render('login');
      },

      veriyUser: async (req, res) => {
        var user = req.user
        console.log('verify user info')
        console.log(user);
        const userExist = await User.findOne({ where: {id_user: user.sub} });
        console.log(userExist);
        if (userExist == null) {
          res.redirect('/signup');
        } else {
          await res.redirect('/perfil');
        }      
      },
      signup: (req, res) => {
        var user = req.user
        res.render('signup');
      },
      createUser:  (req, res) => {
        let user = req.body;
         User.create({
        name: user.name,
        user_name: req.body.nickname,
        email: user.email,
        foto: user.picture,
        descricao: `Olá, meu nome é ${user.name}`
        }).then(() => {
        req.flash('success_msg', 'Atualizado com sucesso :)');
        res.redirect(`/perfil`);
        }).catch(() => {
        req.flash('error_msg', 'username já existe.');
        res.redirect(`/signup`);
        });
      }
    },
  };