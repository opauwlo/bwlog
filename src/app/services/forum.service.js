module.exports = {
  forum: {
    index: async (req, res) => {
      const title = await req.params.slug
      await res.render('pages/post/forumShow', {
        titulo: title
      });
    },
  },
};