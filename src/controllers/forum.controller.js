module.exports = {
  forumControler: {
    forum: (req, res) => {
      const title = req.params.slug
      res.render('forum', {
        titulo: title
      });
    },
  },
};