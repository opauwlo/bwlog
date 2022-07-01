const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const UpadateUserService = require("../../services/user/update");
require("dotenv").config();

module.exports = {
  update: {
    index: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("error_msg", "Preencha todos os campos corretamente");
        return res.redirect(`/edit/${id}`);
      }

      let id = req.id;
      let { user_name, descricao } = req.body;
      let files = req.files;
      const [error, userImg, user, error_msg] = await UpadateUserService.index(id, user_name, descricao, files);
      
      if (error) {
        console.log(error_msg);
        req.flash("error_msg", error_msg);
        return res.redirect("/user/profile");
      }

  
      try {
        const token = jwt.sign(
          {
            id: user.id,
            nickname: user_name,
            profile: userImg.profile
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        await res.cookie("access_token", token, {
          httpOnly: true,
          sameSite: true,
          overwrite: true,
        });
        if (error) {
          req.flash("error_msg", "error_msg.profile_not_edited");
          res.redirect("/perfil");
        } else {
          req.flash("succses_msg", "succses_msg.profile_edited");
          res.redirect("/perfil");
        }
      } catch (e) {
        console.log(e);
      }
    },
  }
};
