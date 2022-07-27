const { main, uploadImgService } = require("../../services/post/create");
const { validationResult } = require("express-validator");

module.exports = {
  create: {
    index: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("error_msg", "Preencha todos os campos corretamente");
        return res.redirect("/novo/post");
      }

      const { titulo, descricao, conteudo, publicado, textlist } = req.body;
      const user_id = req.id;
      const files = req.files;
      const expectdedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
        "image/webp",
      ];

      if (files && files.bannerInput) {
        const fileExtension = files.bannerInput.mimetype;
        console.log(fileExtension)
        if (!expectdedMimeTypes.includes(fileExtension)) {
          req.flash("error_msg", "error_msg.post_not_created");
          return res.redirect("/novo/post");
        }
      }
      const createPost = await main(
        titulo,
        descricao,
        conteudo, 
        publicado,
        textlist,
        user_id,
        files
      );

      try {
        if (createPost) {
          req.flash("succses_msg", "succses_msg.post_created");
          return res.redirect("/perfil");
        } else {
          req.flash("error_msg", "error_msg.post_not_created");
        }
      } catch (e) {}
    },
    uploadImg: async (req, res) => {
      const file = req.files.upload;
      if (!file) {
        return res.json({
          "error": {
            "message": "Send a image.",
          },
        });
      }
      let [error, error_msg, url] = await uploadImgService(file);
      if (error) {
        return res.json({
          "error": {
            "message": error_msg,
          },
        });
      }
      return res.json({
        url: url,
      });
    },
  },
};
