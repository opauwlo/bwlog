const profile = require('../../services/user/profile');

module.exports = {
  renderPublicProfile: {
    index: async (req, res) => {
      const id = req.params.id;
      let page = req.query.page || 1;
      const [user, posts, textlists, PageLimit, currentPage] = await profile.public(id, page);
      if (!user) {
        res.redirect('/404');
      }
      try {

        res.render("pages/user/userPublicProfile", {
          posts: posts,
          user: user,
          textlists,
          imgProfile: req.profile,
          userName: req.user_name,
          userId: req.id,
          isLoggedIn: req.isLoggedIn,
          pagination: {
            page: currentPage,
            limit: PageLimit,
            totalRows: PageLimit,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
  }
};