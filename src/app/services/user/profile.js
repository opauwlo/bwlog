const { Users } = require("../../repositories/users.repository");
const Textlists = require("../../services/textlist/show");

module.exports = ProfileService = {
  private: async (id, currentPage) => {
    try {
      const user = await Users.getUserProfile(id);
      let postsPerPage = 50;

      let countAllPosts = await Users.countPostsFromProfile(id);
      let PageLimit = Math.ceil(countAllPosts / postsPerPage);
      if (currentPage > PageLimit) {
        currentPage = PageLimit;
      }

      let offset = currentPage * postsPerPage - postsPerPage;
      const posts = await Users.getUserPosts(id, offset);
      const textlists = await Textlists.fromOwner(id);
      return [user, posts, textlists, PageLimit, currentPage];

    } catch (e) {
    }
  },
  public: async (id, currentPage) => {
    const user = await Users.getUserProfile(id);
    let postsPerPage = 50;


    let countAllPosts = await Users.countPostsFromProfile(id);
    let PageLimit = Math.ceil(countAllPosts / postsPerPage);  

    if (currentPage > PageLimit) {
      currentPage = PageLimit;
    }

    let offset = currentPage * postsPerPage - postsPerPage;
    const posts = await Users.getPublicProfile(id, offset);
    const textlists = await Textlists.publicForOwner(id);
    return [user, posts, textlists, PageLimit, currentPage];
  }
};
