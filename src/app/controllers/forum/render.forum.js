module.exports = {
  forumController: {
    renderForum: async (req, res) => {
      const title = await req.params.slug
      await res.render('pages/post/forumShow', {
        titulo: title,
        imgProfile: req.profile,
        userName: req.user_name,
        userId: req.id,
        isLoggedIn: req.isLoggedIn
      });
    },
  },
};