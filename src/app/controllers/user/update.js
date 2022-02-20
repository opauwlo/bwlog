const { Users } = require("../../repositories/users.repository");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const cloudinary = require("../../utils/cloudinary");
const del = require("del");
const dir = "tmp";
require("dotenv").config();

module.exports = {
  update: {
    index: async (req, res) => {
      let id = req.id;
      let user = await Users.getUserProfile(id);
      let { user_name, descricao } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("error_msg", "Preencha todos os campos corretamente");
        return res.redirect(`/edit/${id}`);
      }

      if (req.files != null && req.files.profile_img) {
        const expectdedMimeTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/jpg",
          "image/webp",
        ];
        const fileExtension = req.files.profile_img.mimetype;
  
        if (!expectdedMimeTypes.includes(fileExtension)) {
          req.flash("error_msg", "Apenas imagens são permitidas");
          await del(dir);
          return res.redirect(`edit/${id}`);
        }
        var profile = req.files.profile_img;
  
        await cloudinary.uploader.destroy(user.profile_id);
  
        var profileResult = await cloudinary.uploader.upload(
          profile.tempFilePath,
          { quality: 60, fetch_format: "auto" }
        );
        profile = profileResult.secure_url;
        var profile_id = profileResult.public_id;
      }
      if (req.files && req.files.banner_img) {
        const expectdedMimeTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/jpg",
          "image/webp",
        ];
        const fileExtension = req.files.banner_img.mimetype;
  
        if (!expectdedMimeTypes.includes(fileExtension)) {
          req.flash("error_msg", "Apenas imagens são permitidas");
          await del(dir);
          return res.redirect(`edit/${id}`);
        }
  
        var banner = req.files.banner_img;
  
        await cloudinary.uploader.destroy(user.banner_id);
  
        var bannerResult = await cloudinary.uploader.upload(banner.tempFilePath, {
          flags: "lossy",
          fetch_format: "auto",
        });
        banner = bannerResult.secure_url;
        var banner_id = bannerResult.public_id;
      }
  
      try {
        await del(dir);
        const success = await Users.updateUserProfile(
          user_name,
          descricao,
          profile,
          profile_id,
          banner,
          banner_id,
          id
        );
        let userImg = await Users.getUserImg(id);
        const token = jwt.sign(
          {
            id: user.id,
            nickname: user_name,
            profile: userImg.profile
          },
          process.env.JWT_SECRET,
          {
            expiresIn: 86400,
          }
        );
        await res.cookie("access_token", token, {
          overwrite: true,
          expiresIn: 86400,
        });
        if (success == true) {
          req.flash("success_msg", "Perfil atualizado com sucesso!");
          res.redirect("/perfil");
        } else {
          await req.flash("error_msg", "Houve um erro :( tente novamente");
          res.redirect("/perfil");
        }
      } catch (e) {
        console.log(e);
      }
    },
  }
};
