const { Posts } = require("../../repositories/posts.repository");
const cloudinary = require("../../utils/cloudinary");

module.exports = {
  deletePost: {
    index: async (req, res) => {
      let u_id = req.params.u_id;
      try {
        var dataBanner = await Posts.getBannerId(u_id);
        var dataShared = await Posts.getSharedId(u_id);

        if (dataShared && dataShared.shared_id) {
          cloudinary.uploader.destroy(dataShared.shared_id);
        }
        
        if (dataBanner && dataBanner.banner_id) {
          cloudinary.uploader.destroy(dataBanner.banner_id);
        }
        
        const delele = await Posts.deletePost(u_id);

        if (delele) {
          req.flash("success_msg", "Post deletado com sucesso");
          res.redirect("/perfil");
        } else {
          req.flash("error_msg", "Erro ao deletar post");
          res.redirect("/perfil");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
