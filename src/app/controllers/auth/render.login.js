module.exports = {
  renderLogin: {
    index: async (req, res) => {
      try {
        return await res.render("pages/auth/login", {
          imgProfile: req.profile,
          userName: req.user_name,
          userId: req.id,
          isLoggedIn: req.isLoggedIn
        });
  
      } catch (error) {
        console.log(error);
      }
    },
  }
};
