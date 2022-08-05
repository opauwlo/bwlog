const { Posts } = require("../../repositories/posts.repository");
const { Textlists } = require('../../repositories/textlists.repository');
const cache = require('../../utils/cache');

module.exports = {
  renderRead: {
    index: async (req, res) => {
      const slug = req.params.slug;
  
      var textlist = undefined;
      var haveTextlist = undefined;
  
      const cachedHaveTextlist = await cache.get(`verifyTextlist_${slug}`);
      const cachedTextlist = await cache.get(`textlist_${slug}`);
      const post = await Posts.getPostFromRead(slug);

      if (cachedHaveTextlist) {
        textlist = cachedTextlist;
        haveTextlist = cachedHaveTextlist;
      }
      try {
        if (!post) {
          return res.redirect("/404");
        }
        
        const verifyTextlist = post.textlist_post_owner;
        const conteudo = post.conteudo.replace(/`/g, "\\`");
        if (verifyTextlist) {
          textlist = await Textlists.getOneTextlist(post.textlist_post_owner);
          if (textlist.public == false) {
            haveTextlist = false;
          } else {
            haveTextlist = true;
          }
        }
        var recommendationsPosts = await Posts.recommendationsPosts(post.titulo, post.slug, post.user.id);
        cache.set(`verifyTextlist_${slug}`, haveTextlist, 20);
        cache.set(`textlist_${slug}`, textlist, 20);
       
        res.render("pages/post/postShow", {
          textlist,
          haveTextlist,
          post,
          conteudo,
          user: post,
          imgProfile: req.profile,
          userName: req.user_name,
          userId: req.id,
          isLoggedIn: req.isLoggedIn,
          recommendations: recommendationsPosts
        });
      } catch (e) {
        console.log(e);
      }
    },
  }
};
