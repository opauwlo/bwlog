const { Posts } = require("../../repositories/posts.repository");
const cloudinary = require("../../utils/cloudinary");
const getTitleCase = require("../../utils/getTitileCase");
const createSharedImg = require("../../utils/creteSharedImg");
const { validationResult } = require("express-validator");
const del = require("del");
const dir = "tmp";


module.exports = {
  create: {
    index: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("error_msg", "Preencha todos os campos corretamente");
        return res.redirect("/novo/post");
      }

      const {
        titulo,
        descricao,
        conteudo,
        publicado,
        textlist
      } = req.body;
      const user_id = req.id;

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
          const alert = {
            msg: "Apenas imagens são permitidas",
          };
          // for each error, send a flash message
          req.flash("error_msg", alert.msg);
          await del(dir);
          return res.redirect("/novo/post");
        }
        var banner_img = req.files.bannerInput;

        var bannerResult = await cloudinary.uploader.upload(
          banner_img.tempFilePath, {
            quality: 60,
          }
        );

        banner_img = bannerResult.secure_url;
        var banner_id = bannerResult.public_id;
      } else {

        const image = await createSharedImg(getTitleCase(titulo));
        var sharedImg = await cloudinary.uploader.upload(image, {
          fetch_format: "auto",
        });
        var shared_img = sharedImg.secure_url;
        var shared_id = sharedImg.public_id;
      }

      try {
        await del(dir);
        const success = await Posts.createPost(
          getTitleCase(titulo),
          banner_img,
          banner_id,
          shared_img,
          shared_id,
          descricao,
          conteudo,
          publicado,
          textlist,
          user_id
        );

        if (success) {
          req.flash("success_msg", "Post criado com sucesso");
          res.redirect("/perfil");
        } else {
          req.flash("error_msg", "Erro ao criar post");
          res.redirect("/cad");
        }
      } catch (e) {}
    },
  },
};