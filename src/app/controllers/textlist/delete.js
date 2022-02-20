const { Textlists } = require("../../repositories/textlists.repository");

module.exports = {
  delete: {
    index: async (req, res) => {
      const destroyTextlist = await Textlists.deleteTextlist(req.params.id);
      if (destroyTextlist) {
        req.flash("success_msg", "Textlist deletada com sucesso");
        res.redirect("/perfil");
      }
    },
  }
};
