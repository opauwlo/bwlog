const UserServiceCreate = require('../../services/user/create');
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  create: {
    index: async (req, res) => {
      let info = req.user;
      try {
        const createdUserService = await UserServiceCreate.main(info);
        
        const user = createdUserService[1];
        const token = jwt.sign(
          {
            id: user.id,
            nickname: user.user_name,
            profile: user.profile,
            admin: user.is_admin,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        await res.cookie("access_token", token, {
          httpOnly: true,
          sameSite: true,
          overwrite: true,
        });

        if (createdUserService[0]) {
          req.flash(
            "succses_msg",
            "succses_msg.welcome"
          );

          const lastPage = await req.cookies.lastPage;
          await res.clearCookie("lastPage");
          return res.redirect(lastPage || "/perfil");
        } else {
          req.flash("succses_msg", "succses_msg.hello_again");

          const lastPage = await req.cookies.lastPage;
          await res.clearCookie("lastPage");
          return res.redirect(lastPage || "/perfil");
        }
      } catch (e) {}
    },
  },
};
