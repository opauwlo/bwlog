const { Posts } = require("../../repositories/posts.repository");
const { Textlists } = require('../../repositories/textlists.repository');
const cache = require('../../utils/cache');
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

let md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping;
  },
  html: true,
  linkify: true,
  typography: true,
  breaks: true,        // Convert '\n' in paragraphs into <br>
});
md.use(require('markdown-it-sub'));
md.use(require('markdown-it-sup'));
md.use(require('markdown-it-footnote'));
md.use(require('markdown-it-deflist'));
md.use(require('markdown-it-abbr'));
md.use(require('markdown-it-emoji'));
md.use(require('markdown-it-mark'));
md.use(require('markdown-it-ins'));
md.use(require('markdown-it-task-lists'));

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
        const conteudo = DOMPurify.sanitize(md.render(post.conteudo));
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
