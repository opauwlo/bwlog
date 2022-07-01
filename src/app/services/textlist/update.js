const { Textlists } = require("../../repositories/textlists.repository");
const { Posts } = require("../../repositories/posts.repository");
const getTitleCase = require("../../utils/getTitileCase");

module.exports = TextlistsUpdateService = {
    main: async (id, newTitle, isPublic) => {
      const updateTextlist = await Textlists.updateTextlist(
        id,
        getTitleCase(newTitle),
        isPublic
      );
      return updateTextlist;
    },
    infosForRender: async (id) => {
      const posts = await Posts.getAllPostsFromTextlistPage(id, false);      
      const textlist = await Textlists.getOneTextlist(id);
      return [posts, textlist];
    }
};
