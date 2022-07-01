const { Textlists } = require("../../repositories/textlists.repository");

module.exports = {
  renderCreate: {
    index: async (req, res) => {
      try {
        const textlist = await Textlists.getTextlist(req.id);
        res.render("pages/post/postCreate", {
          textlist,
          imgProfile: req.profile,
          userName: req.user_name,
          userId: req.id,
          isLoggedIn: req.isLoggedIn
        });
      } catch (e) {}
    },
  },
};
