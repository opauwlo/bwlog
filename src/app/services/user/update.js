const { Users } = require("../../repositories/users.repository");
const cloudinary = require("../../utils/cloudinary");
const del = require("del");
const dir = "tmp";

module.exports = UpadateUserService = {
  index: async (id, user_name, descricao, files) => {
    let user = await Users.getUserProfile(id);
    const expectdedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
      "image/webp",
    ];
    let error = null;
    if (files != null && files.profile_img) {
      const fileExtension = files.profile_img.mimetype;
      if (!expectdedMimeTypes.includes(fileExtension)) {
        return [error = true, "Formato de imagem inválido"];
      }
      var profile = files.profile_img;
      await cloudinary.uploader.destroy(user.profile_id);
      var profileResult = await cloudinary.uploader.upload(
        profile.tempFilePath,
        { quality: 80, fetch_format: "auto" }
      );
      profile = profileResult.secure_url;
      var profile_id = profileResult.public_id;
    }

    if (files && files.banner_img) {
      const fileExtension = files.banner_img.mimetype;
      if (!expectdedMimeTypes.includes(fileExtension)) {
        return [error =true, "Formato de imagem inválido"];
      }
      var banner = files.banner_img;
      await cloudinary.uploader.destroy(user.banner_id);
      let bannerResult = await cloudinary.uploader.upload(banner.tempFilePath, {
        quality: 60,
        fetch_format: "auto",
      });
      banner = bannerResult.secure_url;
      var banner_id = bannerResult.public_id;
    }

    try {
      await del(dir);
      const success = await Users.updateUserProfile(
        user_name,
        descricao,
        profile,
        profile_id,
        banner,
        banner_id,
        id
      );
      let userImg = await Users.getUserImg(id);

      if (success) {
        return [error = false, userImg, user];
      } else {
        return [error = true, "houve um erro :( tente novamente"];
      }
    } catch (e) {
      console.log(e);
    }
  },
};
