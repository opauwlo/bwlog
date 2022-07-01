const { Posts } = require("../../repositories/posts.repository");

const { Textlists } = require("../../repositories/textlists.repository");

module.exports = PostsFromTextlistService = {
    main: async (id) => {
      try {
        const posts = await Posts.getAllPostsFromTextlistPage(id, true);
        const textlist = await Textlists.getOneTextlist(id);
        return [ posts, textlist ];
      } catch (e) {}
    },
};
