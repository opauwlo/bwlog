const { Users } = require("../../repositories/users.repository");
const jwt = require("jsonwebtoken");

const cloudinary = require("../../utils/cloudinary");
require("dotenv").config();
const localStorage = require('localStorage');

module.exports = {
  create: {
    index: async (req, res) => {
      let info = req.user;
      // get result from cloudinary
      let resultProfile = await cloudinary.uploader.upload(info.picture, {
        flags: "lossy",
        fetch_format: "auto",
      });
      let profile = resultProfile.secure_url;
      let profile_id = resultProfile.public_id;
  
      let resultBanner = await cloudinary.uploader.upload(
        "https://i.ibb.co/PtVc2fH/edxwm3uchch1e2sltrce-1.jpg",
        { flags: "lossy", fetch_format: "auto" }
      );
      let banner = resultBanner.secure_url;
      let banner_id = resultBanner.public_id;
  
      try {
        const create = await Users.findOrCreateUser(
          info,
          profile,
          profile_id,
          banner,
          banner_id
        );
        let user = create[1];
        const token = jwt.sign(
          {
            id: user.id,
            nickname: user.user_name,
            profile: user.profile
          },
          process.env.JWT_SECRET,
          {
            expiresIn: 86400,
          }
        );
        await res.cookie("access_token", token, {
          overwrite: true,
        });

        if (create[0]) {
          req.flash(
            "welcome_msg",
            "bem-vinda(o), agora você pode editar o seu perfil"
          );
          const lastPage = req.cookies.lastPage;
          return res.redirect(lastPage || '/perfil');
        } else {
          await cloudinary.uploader.destroy(profile_id);
          await cloudinary.uploader.destroy(banner_id);
          req.flash("hello_again_msg", "olá, novamente");
          const lastPage = req.cookies.lastPage;
          await res.clearCookie("lastPage");
          return res.redirect(lastPage || '/perfil');
        }
      } catch (e) {}
    },
  }
};
