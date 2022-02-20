module.exports = {
  renderCreate: {
    index: async (req, res) => {
      res.render("pages/textlist/textlistCreate", {
        imgProfile: req.profile,
        userName: req.user_name,
        userId: req.id,
        isLoggedIn: req.isLoggedIn
      });
    },
  }
};
