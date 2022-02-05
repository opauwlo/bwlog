const { Posts } = require('../repositories/posts.repository');

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
          var PageLimit = Math.ceil(countAllPosts.count / postsPerPage);
          console.log(countAllPosts.count)
          if (PageLimit == 0) {
            PageLimit = 1
          }
          localStorage.setItem('homePageLimit', PageLimit) 
        }
        console.log(localStorage.getItem('homePageLimit'))
        if (currentPage > localStorage.getItem('homePageLimit')) {
          currentPage = localStorage.getItem('homePageLimit');
        }  else {
          currentPage = req.query.page || 1;
        }

        let offset = (currentPage * postsPerPage) - postsPerPage;

        const posts = await Posts.fromHome(offset);

        res.render("home", {
          pagination: {
            page: currentPage,
            limit: localStorage.getItem('homePageLimit'),
            totalRows: localStorage.getItem('homePageLimit'),
          },
          posts: posts,
          user: posts.user,
        });
      } catch (e) {
        res.status(500).json({
          message: e.message,
        });
      }
    },
  },
};
