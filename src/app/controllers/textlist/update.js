const { validationResult } = require("express-validator");
const TextlistsUpdateService = require("../../services/textlist/update");
module.exports = {
  update: {
    index: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("error_msg", "Preencha todos os campos corretamente");
        return res.redirect(`/edit/textlist/${id}`);
      }
      try {
        const newTitle = req.body.titulo;
        const isPublic = req.body.publicado;
        const id = req.params.id;
        const updateTextlist = await TextlistsUpdateService.main(id, newTitle, isPublic);
        if (updateTextlist) {
          req.flash("succses_msg", "succses_msg.textlist_edited");
          res.redirect("/perfil");
        }
        else {
          req.flash("error_msg", "error_msg.textlist_not_edited");
          res.redirect("/perfil");
        }
      }
      catch (e) {}
    },
  },
};
