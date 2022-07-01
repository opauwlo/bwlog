module.exports = {
  errorController: {
    renderError: (req, res) => {
      res.render('pages/error/', {
        imgProfile: req.profile,
        userName: req.user_name,
        userId: req.id,
        isLoggedIn: req.isLoggedIn
      }) ;
    },
  },
};