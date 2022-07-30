const { Posts } = require("../../repositories/posts.repository");
const { Textlists } = require('../../repositories/textlists.repository');

module.exports = {
  renderUpdate: {
    index: async (req, res) => {
      const user_id = req.id;
      var postsEdit = await Posts.getPostFromUpdate(req.params.u_id, user_id);
  
      if (postsEdit == null) {
        res.redirect("/404");
      }
      try {
        var textlist = await Textlists.getTextlistFromOwner(req.id);
  
        var haveTextlist = false;
        const verifyTextlist = postsEdit.textlist_post_owner;
  
        if (verifyTextlist !== null) {
          haveTextlist = true;
          var textlistPost = await Textlists.getOneTextlist(
            postsEdit.textlist_post_owner
          );
          textlist = await Textlists.getTextlistFromEditPage(textlistPost.id);
        }
        let conteudo = postsEdit.conteudo;
        conteudo = conteudo.replace(/`/g, "\\`");
        res.render("pages/post/postEdit", {
          post: postsEdit,
          conteudo,
          user: postsEdit.user,
          textlist,
          textlistPost,
          haveTextlist,
          imgProfile: req.profile,
          userName: req.user_name,
          userId: req.id,
          isLoggedIn: req.isLoggedIn
        });
      } catch (e) {
        console.log(e)
      }
    },

  }
};
