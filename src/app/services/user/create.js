const { Users } = require("../../repositories/users.repository");

const cloudinary = require("../../utils/cloudinary");
require("dotenv").config();

module.exports = UserServiceCreate = {
  main: async (userInfo) => {
    cloudinary.image("woman.jpg", {gravity: "face", height: 150, width: 150, crop: "thumb"})
    let resultProfile = await cloudinary.uploader.upload(userInfo.picture, {
      gravity: "face",
      height: 110,
      width: 110,
      crop: "thumb",
      quality: 80,
      fetch_format: "auto",
    });
    let profile = resultProfile.secure_url;
    let profile_id = resultProfile.public_id;
    let resultBanner = await cloudinary.uploader.upload(
      "https://i.ibb.co/D5K1PGm/city-7049028-1920-min.jpg",
      {
        quality: 40,
        fetch_format: "auto",
      }
    );
    let banner = resultBanner.secure_url;
    let banner_id = resultBanner.public_id;
    let verify_user = process.env.VERIFY_USER;
    try {
      const create = await Users.findOrCreateUser(
        userInfo,
        profile,
        profile_id,
        banner,
        banner_id,
        verify_user
      );
      let user = create[1];

      if (create[0]) {
        return [true, user];
      } else {
        await cloudinary.uploader.destroy(profile_id);
        await cloudinary.uploader.destroy(banner_id);
        return [false, user];
      }
    } catch (e) {}
  },
};
