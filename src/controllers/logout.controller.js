module.exports = {
    logoutController: {
      logout: (req, res) => {
        res.clearCookie('session-token');
        res.clearCookie('G_AUTHUSER_H');
        res.redirect("/login");
    },
  },
};