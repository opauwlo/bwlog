const profile = require('../../services/user/profile');
const localStorage = require("localStorage");

module.exports = {
  renderPrivateProfile: {
    index: async (req, res) => {
      const id = req.id;
      var page = req.query.page || 1;
      try {
        const [user, posts, textlists, PageLimit, currentPage] = await profile.private(id, page);
        res.render("pages/user/userPrivateProfile", {
          textlists,
          user,
          imgProfile: req.profile,
          userName: req.user_name,
          userId: req.id,
          is_admin: req.is_admin,
          isLoggedIn: req.isLoggedIn,
          posts,
          pagination: {
            page: currentPage,
            limit: PageLimit,
            totalRows: PageLimit,
          },
        });
      } catch (e) {}
    },
  }
};
