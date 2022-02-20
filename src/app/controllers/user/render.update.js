const { Users } = require('../../repositories/users.repository');

module.exports = {
  renderUpdate: {
    index: async (req, res) => {
      let id = req.id;
  
      if (id == req.params.id) {
        try {
          const user = await Users.getUserProfile(id);
          res.render("pages/user/userUpdateProfile", {
            user: user,
            imgProfile: req.profile,
            userName: req.user_name,
            userId: req.id,
            isLoggedIn: req.isLoggedIn
          });
        } catch (e) {}
      } else {
        req.flash("error_msg", "Você não tem permissão para acessar esta página");
        res.redirect("/perfil");
      }
    },
  }
};
