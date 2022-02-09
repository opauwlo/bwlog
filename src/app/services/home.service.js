const { Posts } = require('../repositories/posts.repository');

const cache = require('../utils/cache');

module.exports = {
  home: {
    // render home page
    index: async (req, res) => {
      try {
        let currentPage = req.query.page || 1;
        let postsPerPage = 10;

        const cachePageLimit = await cache.get('cachePageLimit');
        if (!cachePageLimit) {
          if (currentPage == 1 ) {
            var countAllPosts = await Posts.countPosts();
            var PageLimit = Math.ceil(countAllPosts.count / postsPerPage);
            if (PageLimit == 0) {
              PageLimit = 1
            }
            cache.set('cachePageLimit', PageLimit, 11 );
          }
        } else {
          PageLimit = parseInt(cachePageLimit);
        }


        if (currentPage > cache.get('cachePageLimit')) {
          currentPage = cache.get('cachePageLimit');
        }

        let offset = (currentPage * postsPerPage) - postsPerPage;

        
        const cachedPosts = await cache.get(`posts_${currentPage}`);
        if (!cachedPosts) {
          var isCached = false;
          var posts = await Posts.fromHome(offset);
          cache.set(`posts_${currentPage}`, posts, 11);

        } else {
          isCached = true;
          posts = cachedPosts;
        }
        res.render("pages/home/",{
          pagination: {
            page: currentPage,
            limit: PageLimit,
            totalRows: PageLimit,
          },
          isCached: isCached,
          posts: posts,
          user: posts.user,
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({
          message: e.message,
        });
      }
    },
  },
};
