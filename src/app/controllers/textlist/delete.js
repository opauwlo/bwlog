const TextlistsDeleteService = require("../../services/textlist/delete");
module.exports = {
  delete: {
    index: async (req, res) => {
      const destroyTextlist = await TextlistsDeleteService.main(req.params.id);
      if (destroyTextlist) {
        req.flash("succses_msg", "succses_msg.textlist_deleted");
        res.redirect("/perfil");
      }
      else {
        req.flash("error_msg", "error_msg.textlist_not_deleted");
        res.redirect("/perfil");
      }
    },
  }
};
