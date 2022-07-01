const { Posts } = require("../../repositories/posts.repository");

const { Textlists } = require("../../repositories/textlists.repository");

module.exports = {
  renderFromTextlist: {
    index: async (req, res) => {
      try {
        const posts = await Posts.getAllPostsFromTextlistPage(req.params.id, true);
        const textlist = await Textlists.getOneTextlist(req.params.id);
        res.render("pages/textlist/textlistShow", {
          posts,
          user: posts,
          textlist,
          imgProfile: req.profile,
          userName: req.user_name,
          userId: req.id,
          isLoggedIn: req.isLoggedIn
        });
      } catch (e) {}
    },
  }
};
