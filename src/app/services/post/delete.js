const { Posts } = require("../../repositories/posts.repository");
const cloudinary = require("../../utils/cloudinary");

module.exports = PostsDeleteService = {
    main: async (u_id) => {
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
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
      }
    },
};
