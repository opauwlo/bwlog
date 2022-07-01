const { Posts } = require("../../repositories/posts.repository");

module.exports = {
  forumController: {
    renderForum: async (req, res) => {
      const slug = req.params.slug
      // get title from slug
      const title = await Posts.getTitleFromSlug(slug)
      await res.render('pages/post/forumShow', {
        titulo: title.titulo,
        imgProfile: req.profile,
        userName: req.user_name,
        userId: req.id,
        isLoggedIn: req.isLoggedIn
      });
    },
  },
};