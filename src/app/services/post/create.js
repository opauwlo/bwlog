const { Posts } = require("../../repositories/posts.repository");
const { Users } = require("../../repositories/users.repository");
const cloudinary = require("../../utils/cloudinary");
const getTitleCase = require("../../utils/getTitileCase");
const createSharedImg = require("../../utils/creteSharedImg");
const del = require("del");
const dir = "tmp";

module.exports = PostsCreateService = {
    main: async (titulo, descricao, conteudo, publicado, textlist, user_id, files) => {
      const user = await Users.getUserProfile(user_id);
      const imgProfile = user.profile;
      const nameProfile = user.user_name;

      const expectdedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
        "image/webp",
      ];

      if (files && files.bannerInput) {
        const fileExtension = files.bannerInput.mimetype;

        if (!expectdedMimeTypes.includes(fileExtension)) {
          return false;
        }
        var banner_img = files.bannerInput;
        let bannerResult = await cloudinary.uploader.upload(
          banner_img.tempFilePath,
          {
            quality: 60,
          }
        );
        banner_img = bannerResult.secure_url;
        var banner_id = bannerResult.public_id;
      } else {
        const image = await createSharedImg(
          getTitleCase(titulo),
          imgProfile,
          nameProfile
        );
        var sharedImg = await cloudinary.uploader.upload(image, {
          quality: 60,
        });
        var shared_img = sharedImg.secure_url;
        var shared_id = sharedImg.public_id;
      }

      try {
        await del(dir);
        const success = await Posts.createPost(
          getTitleCase(titulo),
          banner_img,
          banner_id,
          shared_img,
          shared_id,
          descricao,
          conteudo,
          publicado,
          textlist,
          user_id
        );

        if (success) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    uploadImgService: async (file) => {
      const expectdedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
        "image/webp",
      ];

      const fileExtension = file.mimetype;
      const fileSize = file.size;
      if (!expectdedMimeTypes.includes(fileExtension)) {
        let error = true;
        let error_msg = "Only images are allowed";
        return [error , error_msg , null];
      }
      if (fileSize > 5000000) {
        let error = true;
        let error_msg =  "Max file size is 5MB";
        return [error, error_msg , null];
      }

      imgbb = await cloudinary.uploader.upload(file.tempFilePath, {
        quality: 80,
      });
      await del(dir);
      const url = await imgbb.secure_url;
      let error = false;
      let error_msg = null;
      return [error, error_msg, url];
    },
};
