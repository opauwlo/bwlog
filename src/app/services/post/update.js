const { Posts } = require("../../repositories/posts.repository");
const { Users } = require("../../repositories/users.repository");
const cloudinary = require("../../utils/cloudinary");
const { validationResult } = require("express-validator");
const getTitleCase = require("../../utils/getTitileCase");
const createSharedImg = require("../../utils/creteSharedImg");
const del = require("del");
const dir = "tmp";

module.exports = {
  update: {
    index: async (req, res) => {
      const u_id = req.params.u_id;
      const user_id = req.id;
      const user  = await Users.getUserProfile(user_id);
      const imgProfile = user.profile;
      const nameProfile = user.user_name;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("error_msg", "Preencha todos os campos corretamente");
        return res.redirect(`/edit/post/${u_id}`);
      }

      const { titulo, descricao, conteudo, publicado, textlist } = req.body;

      if (req.files && req.files.bannerInput) {
        const expectdedMimeTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/jpg",
          "image/webp",
        ];
        const fileExtension = req.files.bannerInput.mimetype;

        if (!expectdedMimeTypes.includes(fileExtension)) {
          await del(dir);
          req.flash("error_msg", "Apenas imagens são permitidas");
          return res.redirect(`/edit/post/${u_id}`);
        }

        var banner_img = req.files.bannerInput;
        var data = await Posts.getBannerId(u_id);
        if (data.banner_id) {
          await cloudinary.uploader.destroy(data.banner_id);
        }
        var dataShared = await Posts.getSharedId(u_id);
        if (dataShared && dataShared.shared_id) {
          await cloudinary.uploader.destroy(dataShared.shared_id);
        }
        var bannerResult = await cloudinary.uploader.upload(
          banner_img.tempFilePath,
          {
            quality: 60,
          }
        );
        banner_img = bannerResult.secure_url;
        var banner_id = bannerResult.public_id;
      } else {
        var dataShared = await Posts.getSharedId(u_id);

        if (dataShared && dataShared.shared_id) {
          await cloudinary.uploader.destroy(dataShared.shared_id);
        }
        var dataBanner = await Posts.getBannerId(u_id);
        if (dataBanner.banner_id) {
          await cloudinary.uploader.destroy(dataBanner.banner_id);
        }
        var banner_img = '';
        var banner_id = '';
        const image = await createSharedImg(getTitleCase(titulo), imgProfile, nameProfile);

        var sharedImg = await cloudinary.uploader.upload(image, {
          quality: 60
        });

        var shared_img = sharedImg.secure_url;
        var shared_id = sharedImg.public_id;
      }
      try {
        const success = await Posts.updatePost(
          getTitleCase(titulo),
          banner_img,
          banner_id,
          shared_img,
          shared_id,
          descricao,
          conteudo,
          publicado,
          textlist,
          u_id
        );
        await del(dir);
        if (success) {
          req.flash("succses_msg", "succses_msg.post_edited");
          res.redirect("/perfil");
        } else {
          req.flash("error_msg", "error_msg.post_not_edited");
          res.redirect(`/edit/post/${u_id}`);
        }
      } catch (e) {}
    },
  },
};
