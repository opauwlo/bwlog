const { Posts } = require("../repositories/posts.repository");
const localStorage = require('localStorage');

module.exports = {
  home: {
    // render home page
    index: async (req, res) => {
      try {
        let currentPage = req.query.page || 1;
        let postsPerPage = 50;

        if (currentPage == 1) {
          var countAllPosts = await Posts.countPosts();
          var PageLimit = Math.ceil(countAllPosts / postsPerPage);
          if (PageLimit == 0) {
            PageLimit = 1;
          }
          localStorage.setItem('homePageLimit', PageLimit) // set the page limit in local storage
          PageLimit = localStorage.getItem('homePageLimit') // get the page limit from local storage
        }

        if (currentPage > PageLimit) {
          currentPage = PageLimit;
        }

        let offset = currentPage * postsPerPage - postsPerPage;

        var { posts } = await Posts.fromHome(offset);

        return res.render("pages/home/", {
          pagination: {
            page: currentPage,
            limit: PageLimit,
            totalRows: PageLimit,
          },
          posts: posts,
          user: posts,
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
};
