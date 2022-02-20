const { Users } = require("../../repositories/users.repository");
const { Textlists } = require("../../repositories/textlists.repository");
const localStorage = require("localStorage");

module.exports = {
  renderPrivateProfile: {
    index: async (req, res) => {
      try {
        const id = req.id;
        const user = await Users.getUserProfile(id);
  
        let currentPage = req.query.page || 1;
        let postsPerPage = 50;
  
        if (currentPage == 1) {
          var countAllPosts = await Users.countPostsFromProfile(id);
          var PageLimit = Math.ceil(countAllPosts / postsPerPage);
          if (PageLimit == 0) {
            PageLimit = 1;
          }
          PageLimit = localStorage.setItem("profilePageLimit", PageLimit);
        }
  
        if (currentPage > PageLimit) {
          currentPage = PageLimit;
        }
  
        let offset = currentPage * postsPerPage - postsPerPage;
  
        const posts = await Users.getUserPosts(id, offset);
        const textlists = await Textlists.getTextlist(id);
        res.render("pages/user/userPrivateProfile", {
          textlists,
          user,
          imgProfile: req.profile,
          userName: req.user_name,
          userId: req.id,
          isLoggedIn: req.isLoggedIn,
          posts,
          pagination: {
            page: currentPage,
            limit: localStorage.getItem("profilePageLimit"),
            totalRows: countAllPosts,
          },
        });
      } catch (e) {
        res.status(500).json({
          message: e.message,
        });
      }
    },
  }
};
