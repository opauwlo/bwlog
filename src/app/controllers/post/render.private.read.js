const { Posts } = require("../../repositories/posts.repository");
const { Textlists } = require('../../repositories/textlists.repository');

module.exports = {
  renderPrivateRead: {
    index: async (req, res) => {
      try {
        const post = await Posts.getPostFromPrivateRead(req.params.slug);
        var haveTextlist = false;
        const verifyTextlist = post.textlist_post_owner;
        const conteudo = post.conteudo.replace(/`/g, "\\`");

        if (verifyTextlist) {
          var textlist = await Textlists.getOneTextlist(post.textlist_post_owner);
  
          if (textlist.public == false) {
            haveTextlist = false;
          } else {
            haveTextlist = true;
          }
        }
  
        res.render("pages/post/postShow", {
          textlist,
          haveTextlist,
          post,
          conteudo,
          user: post,
          imgProfile: req.profile,
          userName: req.user_name,
          userId: req.id,
          isLoggedIn: req.isLoggedIn
        });
      } catch (e) {
        console.log(e);
      }
    },

  }
};
