const { Posts } = require('../repositories/posts.repository');

const { Textlists } = require('../repositories/textlists.repository');

const cache = require('../utils/cache');
module.exports = {
  posts: {
    create: async (req, res) => {
      const { titulo, descricao, conteudo, publicado, textlist } = req.body;
      let user_id = req.id;
      try {
        const success = await Posts.createPost(
          titulo,
          descricao,
          conteudo,
          publicado,
          textlist,
          user_id
        );

        if (success) {
          req.flash("success_msg", "Post criado com sucesso");
          res.redirect("/perfil");
        } else {
          req.flash("error_msg", "Erro ao criar post");
          res.redirect("/cad");
        }
      } catch (e) {}
    },
    update: async (req, res) => {
      const u_id = req.params.u_id;
      const { titulo, descricao, conteudo, publicado, textlist } = req.body;
      try {
        const success = await Posts.updatePost(
          titulo,
          descricao,
          conteudo,
          publicado,
          textlist,
          u_id
        );
        if (success) {
          req.flash("success_msg", "Post atualizado com sucesso");
          res.redirect("/perfil");
        } else {
          req.flash("error_msg", "Erro ao atualizar post");
          res.redirect(`/edit/:id`);
        }
      } catch (e) {}
    },

    delete: async (req, res) => {
      let id = req.params.id;
      try {
        const success = await Posts.deletePost(id);
        if (success) {
          req.flash("success_msg", "Post deletado com sucesso");
          res.redirect("/perfil");
        } else {
          req.flash("error_msg", "Erro ao deletar post");
          res.redirect("/perfil");
        }
      } catch (e) {}
    },
    
    renderPost: async (req, res) => {
      const slug = req.params.slug;

      var textlist = undefined;
      var haveTextlist = undefined;

      const cachedHaveTextlist = await cache.get(`verifyTextlist_${slug}`);
      const cachedTextlist = await cache.get(`textlist_${slug}`);
      const post = await Posts.fromPostPage(slug);
      if (cachedHaveTextlist) {
        textlist = cachedTextlist;
        haveTextlist = cachedHaveTextlist;
      }
      try {
        if (post.length == 0 ) {
          return res.redirect("/404");
        }

        const verifyTextlist = post.textlist_post_owner;

        if (verifyTextlist) {  
          textlist = await Textlists.getOneTextlist(post.textlist_post_owner);
          if (textlist.public == false) {
            haveTextlist = false;
          } else {
            haveTextlist = true
          }
        }

        cache.set(`verifyTextlist_${slug}`, haveTextlist, 20)
        cache.set(`textlist_${slug}`, textlist, 20);

        res.render("pages/post/postShow", {
          textlist ,
          haveTextlist,
          post,
          user: post,
        });
      } catch (e) {
      }
    },
    renderCreate: async (req, res) => {
      try {
        let user = req.user_name;
        const textlist = await Textlists.getTextlist(req.id);
        res.render("pages/post/postCreate", {
          user,
          textlist,
        });
      } catch (e) {}
    },
    renderEdit: async (req, res) => {
      const user_id = req.id;
      var postsEdit = await Posts.fromEditPage(req.params.id, user_id);

      if (postsEdit == null) {
        res.redirect("/404");
      }
      try {
        var textlist = await Textlists.getTextlist(req.id);

        var haveTextlist = false;
        const verifyTextlist = postsEdit.textlist_post_owner;

        if (verifyTextlist !== null) {
          haveTextlist = true;
          var textlistPost = await Textlists.getOneTextlist(
            postsEdit.textlist_post_owner
          );
          textlist = await Textlists.getTextlistFromEditPage(textlistPost.id);
        }
        res.render("pages/post/postEdit", {
          post: postsEdit,
          user: postsEdit.user,
          textlist,
          textlistPost,
          haveTextlist,
        });
      } catch (e) {
        console.log(e)
      }
    },
    renderPreview: async (req, res) => {
      try {
        const { post, textlist, haveTextlist } = await Posts.fromPostPreview(req.params.slug);
        res.render("pages/post/postShow", {
          textlist,
          haveTextlist,
          post,
          user: post,
        });
      } catch (e) {
        console.log(e)
      }
    },
    createTextlist: async (req, res) => {
      try {
        const ownerId = req.id;
        const titulo = req.body.titulo;
        const isPublic = req.body.publicado;

        const created = await Textlists.createTextlist(titulo, ownerId, isPublic);
        if (created) {
          req.flash("success_msg", `Textlist criada com sucesso`);
          res.redirect("/perfil");
        } else {
          req.flash("error_msg", `erro ao criar textlist tente novamente`);
          res.redirect("/novo/textlist");
        }
      } catch (e) { console.log(e)}
    },
    renderCreateTextlist: async (req, res) => {
      res.render("pages/textlist/textlistCreate", {});
    },
    renderEditTextlist: async (req, res) => {
      const textlist = await Textlists.getOneTextlist(req.params.id);
      res.render("pages/textlist/textlistEdit", {
        textlist,
      });
    },
    updateTextlist: async (req, res) => {
      const newTitle = req.body.textlist;
      const isPublic = req.body.publicado;
      const id = req.params.id;
      const updateTextlist = await Textlists.updateTextlist(id, newTitle, isPublic);

      if (updateTextlist) {
        req.flash("success_msg", "Textlist atualizada com sucesso");
        res.redirect("/perfil");
      }
    },
    destroyTextlist: async (req, res) => {
      const destroyTextlist = await Textlists.deleteTextlist(req.params.id);
      if (destroyTextlist) {
        req.flash("success_msg", "Textlist deletada com sucesso");
        res.redirect("/perfil");
      }
    },
    renderPostsFromTextlist: async (req, res) => {
      try {
        const posts = await Posts.fromTextlistPage(req.params.id);
        const textlist = await Textlists.getOneTextlist(req.params.id);
        res.render("pages/textlist/textlistShow", {
          posts,
          user: posts,
          textlist,
        });
      } catch (e) {}
    },
  },
};
