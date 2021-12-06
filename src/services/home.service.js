const { Posts } = require('../repositories/posts.repository');

module.exports = {
  home: {
    // render home page
    index: async (req, res) => {
      try {
        const posts = await Posts.fromHome();
          res.render('home', {
            posts: posts,
            user: posts.user
          });
      }
      catch (e) {
        res.status(500).json({
          message: e.message
        });      }
    },

  }
};