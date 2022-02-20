const { Textlists } = require("../../repositories/textlists.repository");
const { validationResult } = require("express-validator");
const getTitleCase = require("../../utils/getTitileCase");
module.exports = {
  update: {
    index: async (req, res) => {
      const newTitle = req.body.titulo;
      const isPublic = req.body.publicado;
      const id = req.params.id;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("error_msg", "Preencha todos os campos corretamente");
        return res.redirect(`/edit/textlist/${id}`);
      }
      const updateTextlist = await Textlists.updateTextlist(
        id,
        getTitleCase(newTitle),
        isPublic
      );

      if (updateTextlist) {
        req.flash("success_msg", "Textlist atualizada com sucesso");
        res.redirect("/perfil");
      }
    },
  },
};
