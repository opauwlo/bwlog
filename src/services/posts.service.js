const { Posts } = require('../repositories/posts.repository');
const { Users } = require('../repositories/users.repository');

module.exports = {
  posts: {
    create: async (req, res) => {

      const { titulo, descricao, conteudo, publicado, editado } = req.body;
      let user_id = req.id
      console.log(titulo);
      try {
       const success = await Posts.createPost(titulo, descricao, conteudo, publicado, editado, user_id);

        if(success) {
          req.flash('success_msg', 'Post criado com sucesso');
          res.redirect('/perfil');
        } else {
          req.flash('error_msg', 'Erro ao criar post');
          res.redirect('/cad');
        }
      } catch (e) {
        console.log(e);
      }
    },
    update: async (req, res) => {
      const id = req.params.id;
      try { 
        const success = await Posts.updatePost(req.body, id);
        if (success) {
          req.flash('success_msg', 'Post atualizado com sucesso');
          res.redirect('/perfil');
        } else { 
          req.flash('error_msg', 'Erro ao atualizar post');
          res.redirect(`/edit/:id`);
        }
      } catch (e) {
        console.log(e);
      }
    },
    delete: async (req, res) => {
      let id = req.params.id;
      try {
        const success = await Posts.deletePost(id);
        if (success) {
          req.flash('success_msg', 'Post deletado com sucesso');
          res.redirect('/perfil');
        } else {
          req.flash('error_msg', 'Erro ao deletar post');
          res.redirect('/perfil');
        }
      } catch (e) {
        console.log(e);
      }
    },
    renderPost: async (req, res) => {
      try {
        const post = await Posts.fromPostPage(req.params.slug);

          res.render('posts', {
            posts: post,
            user: post
          });
        
      } catch (e) {
        console.log(e);
      }
    },
    renderCreate: async (req, res) => {
      try {
        let user =  req.user_name;
        res.render('form', {
          user
        });
      } catch (e) {
        console.log(e)
      }
    },
    renderEdit: async (req, res) => {
      try {
        const postsEdit = await Posts.fromEditPage(req.params.id)
        res.render('edit', {
          post: postsEdit,
          user: postsEdit.user,
        });
      } catch (e) {
        console.log(e)
      }
    },
    renderPreview: async (req, res) => {
      try {
        const postPreview = await Posts.fromPostPreview(req.params.slug);
        res.render('posts', {
          posts: postPreview,
          user: postPreview
        });

      } catch (e) {
        console.log(e)
      }    
    }
  }
};