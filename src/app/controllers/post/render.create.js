const ShowTextlistsService  = require("../../services/textlist/show");

module.exports = {
  renderCreate: {
    index: async (req, res) => {
      try {
        const textlist = await ShowTextlistsService.fromOwner(req.id);
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
