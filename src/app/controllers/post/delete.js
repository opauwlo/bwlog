const PostsDeleteService = require("../../services/post/delete");

module.exports = {
  deletePost: {
    index: async (req, res) => {
      let u_id = req.params.u_id;
      const deletePost = await PostsDeleteService.main(u_id);
      try {
        if (deletePost) {
          req.flash("succses_msg", "succses_msg.post_deleted");
          res.redirect("/perfil");
        } else {
          req.flash("error_msg", "error_msg.post_not_deleted");
          res.redirect("/perfil");
        }
      } catch (e) {}
    },
  },
};
