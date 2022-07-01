const { Posts } = require("../../repositories/posts.repository");

module.exports = homeServiceRender = {
  main: async (currentPage) => {
    try {
      let postsPerPage = 50;

      var countAllPosts = await Posts.countPosts();
      var PageLimit = Math.ceil(countAllPosts / postsPerPage);
      if (PageLimit == 0) {
        PageLimit = 1;
      }
      
      if (currentPage >= PageLimit) {
        currentPage = PageLimit;
      }
      let offset = currentPage * postsPerPage - postsPerPage;
      var { posts } = await Posts.getPostsFromHome(offset);
      return [posts, PageLimit, currentPage];
    } catch (e) {
      console.error(e);
    }
  },
};
