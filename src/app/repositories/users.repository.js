const Post = require("../../database/models/Post");
const User = require("../../database/models/User");

const cache = require("../utils/cache");
const slugify = require("slugify");

require("../middlewares/checkAuthenticated");

module.exports = {
  Users: {
    findOrCreateUser: async (userInfo, profile, profile_id, banner, banner_id, verify_user) => {
      try {
        const [user, created] = await User.findOrCreate({
          where: {
            id_user: userInfo.sub,
          },
          defaults: {
            name: userInfo.name,
            user_name: slugify(userInfo.name, { lower: true }),
            email: userInfo.email,
            profile: profile,
            profile_id: profile_id,
            banner: banner,
            banner_id: banner_id,
            descricao: userInfo.name,
            verify_user: verify_user,
            is_admin: false,
          },
        });
        return [created, user];

      } catch (e) {
        console.log(e);
      }
    },
    
    updateUserProfile: async (
      user_name,
      descricao,
      profile,
      profile_id,
      banner,
      banner_id,
      id
    ) => {
      var success = null;
      await User.update(
        {
          user_name: slugify(user_name, { lower: true }),
          descricao: descricao,
          profile: profile,
          profile_id: profile_id,
          banner: banner,
          banner_id: banner_id,
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then(() => {
          success = true;
        })
        .catch(async (e) => {
          success = false;
        });
        return success
    },
    getUserProfile: async (id) => {

      try {
        const UserProfile = await User.findOne({
          attributes: [
            "id",
            "user_name",
            "profile",
            "banner",
            "profile_id",
            "banner_id",
            "descricao",
            "created_at",
            "verify_user",
          ],
          where: { id: id },
        });

        return JSON.parse(JSON.stringify(UserProfile));
      } catch (e) {
        console.log(e);
      }
    },
    getUserImg: async (id) => {
      try {
        const UserProfile = await User.findOne({
          attributes: [
            "profile",
          ],
          where: { id: id },
        });
        return JSON.parse(JSON.stringify(UserProfile));
      } catch (e) {
        console.log(e);
      }
    },
    
    getPublicProfile: async (id, offset) => {
      const PublicProfileCached = await cache.get(`public_${id}`);

      if (PublicProfileCached) {
        return PublicProfileCached;
      }
      try {
        const PublicProfile = await Post.findAll({
          order: [["id", "DESC"]],
          attributes: ["titulo", "descricao", "slug", "user_id", "publicado", "banner_img"],
          limit: 50,
          offset: offset,
          include: [
            {
              model: User,
              as: "user",
              attributes: ["user_name"],
              required: true,
            },
          ],
          where: {
            user_id: id,
            publicado: true,
          },
        });
        await cache.set(`public_${id}`, PublicProfile, 9);
        return JSON.parse(JSON.stringify(PublicProfile));
      } catch (e) {}
    },
    countPostsFromProfile: async (id) => {
      const cachedCountPosts = await cache.get(`cachedCountPosts${id}`);

      if (cachedCountPosts) {
        return cachedCountPosts;
      }
      try {
        const CountPosts = Post.count({
          where: {
            user_id: id,
          },
        });
        await cache.set(`cachedCountPosts${id}`, await CountPosts, 15);
        return await CountPosts;
      } catch (e) {}
    },
    getUserPosts: async (id, offset) => {
      try {
        const Posts = await Post.findAll({
          limit: 50,
          offset: offset,
          attributes: [
            "id",
            "titulo",
            "slug",
            "descricao",
            "publicado",
            "u_id",
          ],
          order: [["id", "DESC"]],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["user_name"],
              required: true,
            },
          ],
          where: { user_id: id },
        });
        return JSON.parse(JSON.stringify(Posts));
      } catch (e) {}
    },
  },
};
