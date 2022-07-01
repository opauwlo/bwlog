const TextlistsUpdateService = require("../../services/textlist/update");

module.exports = {
  renderUpdate: {
    index: async (req, res) => {
      const [posts, textlist] = await TextlistsUpdateService.infosForRender(req.params.id);

      res.render("pages/textlist/textlistEdit", {
        posts,
        user: posts,
        textlist,
        imgProfile: req.profile,
        userName: req.user_name,
        userId: req.id,
        isLoggedIn: req.isLoggedIn
      });
    },

  }
};
