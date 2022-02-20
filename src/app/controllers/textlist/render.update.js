const { Textlists } = require("../../repositories/textlists.repository");

module.exports = {
  renderUpdate: {
    index: async (req, res) => {
      const textlist = await Textlists.getOneTextlist(req.params.id);
      res.render("pages/textlist/textlistEdit", {
        textlist,
        imgProfile: req.profile,
        userName: req.user_name,
        userId: req.id,
        isLoggedIn: req.isLoggedIn
      });
    },

  }
};
