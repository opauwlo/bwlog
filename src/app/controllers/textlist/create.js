const { validationResult } = require("express-validator");
const TextlistCreateService = require("../../services/textlist/create");

module.exports = {
  create: {
    index: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("error_msg", "Preencha todos os campos corretamente");
        return res.redirect(`/novo/textlist`);
      }
      const ownerId = req.id;
      const titulo = req.body.titulo;
      const isPublic = req.body.publicado;
      
      try {
        const created = await TextlistCreateService.main(ownerId, titulo, isPublic);

        if (created) {
          req.flash("succses_msg", "succses_msg.textlist_created");
          res.redirect("/perfil");
        } else {
          req.flash("error_msg", `error_msg.textlist_not_created`);
          res.redirect("/novo/textlist");
        }
      } catch (e) {
        console.log(e);
      }
    },
  }
};
