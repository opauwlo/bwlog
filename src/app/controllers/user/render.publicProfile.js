const { Users } = require('../../repositories/users.repository');
const { Textlists } = require('../../repositories/textlists.repository');

module.exports = {
  renderPublicProfile: {
    index: async (req, res) => {
      const id = req.params.id;
      const user = await Users.getUserProfile(id);
      if (!user) {
        res.redirect('/404');
      }
      try {
        const publicProfile = await Users.getPublicProfile(id);
        const textlists = await Textlists.getTextlistPublic(id);
        res.render("pages/user/userPublicProfile", {
          posts: publicProfile,
          user: user,
          textlists,
          imgProfile: req.profile,
          userName: req.user_name,
          userId: req.id,
          isLoggedIn: req.isLoggedIn
        });
      } catch (e) {
        console.log(e);
      }
    },
  }
};
