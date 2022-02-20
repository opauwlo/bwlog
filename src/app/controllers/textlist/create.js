const { Textlists } = require("../../repositories/textlists.repository");
const { validationResult } = require("express-validator");
const getTitleCase = require("../../utils/getTitileCase");

module.exports = {
  create: {
    index: async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("error_msg", "Preencha todos os campos corretamente");
        return res.redirect(`/novo/textlist`);
      }

      try {
        const ownerId = req.id;
        const titulo = req.body.titulo;
        const isPublic = req.body.publicado;
  
        const created = await Textlists.createTextlist(getTitleCase(titulo), ownerId, isPublic);
        if (created) {
          req.flash("success_msg", `Textlist criada com sucesso`);
          res.redirect("/perfil");
        } else {
          req.flash("error_msg", `erro ao criar textlist tente novamente`);
          res.redirect("/novo/textlist");
        }
      } catch (e) {
        console.log(e);
      }
    },
  }
};
