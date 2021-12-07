module.exports = {
  forum: {
    index: async (req, res) => {
      const title = await req.params.slug
      await res.render('forum', {
        titulo: title
      });
    },
  },
};