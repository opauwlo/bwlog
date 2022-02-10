const { Posts } = require("../repositories/posts.repository");

module.exports = {
  home: {
    // render home page
    index: async (req, res) => {
      try {
        let currentPage = req.query.page || 1;
        let postsPerPage = 60;

        if (currentPage == 1) {
          var countAllPosts = await Posts.countPosts();
          var PageLimit = Math.ceil(countAllPosts / postsPerPage);
          if (PageLimit == 0) {
            PageLimit = 1;
          }
        }

        if (currentPage > PageLimit) {
          currentPage = PageLimit;
        }

        let offset = currentPage * postsPerPage - postsPerPage;

        var { posts, isCached } = await Posts.fromHome(offset);

        return res.render("pages/home/", {
          pagination: {
            page: currentPage,
            limit: PageLimit,
            totalRows: PageLimit,
          },
          isCached: isCached,
          posts: posts,
          user: posts,
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
};
