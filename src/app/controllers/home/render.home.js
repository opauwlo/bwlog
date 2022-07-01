
const homeServiceRender = require("../../services/home/show");

module.exports = {
  homeController: {
    // render home page
    renderHome: async (req, res) => {
      let page = req.query.page || 1;
      try {
        let [posts, PageLimit, currentPage] = await homeServiceRender.main(page);
        return res.render("pages/home/", {
          pagination: {
            page: currentPage,
            limit: PageLimit,
            totalRows: PageLimit,
          },
          imgProfile: req.profile,
          userName: req.user_name,
          userId: req.id,
          isLoggedIn: req.isLoggedIn,
          posts: posts,
          user: posts,
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
};
