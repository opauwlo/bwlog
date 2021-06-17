const express = require("express");
const app = express();
const Post = require("./models/Post");
const handlebars = require("express-handlebars");
const cookieParser = require('cookie-parser')
// Google
const CLIENT_ID = '485040018311-t4628pim6j74ssva2ctso0qapn65hts9.apps.googleusercontent.com'
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
require("dotenv").config();

// Config
//static
app.use(express.static(__dirname + "/public"));
// Template
app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
// BodyParser
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cookieParser());
// Rotas
app.get(`/`, function(req, res) {
  let name = req.body.name;
  Post.findAll({
    order: [["id", "DESC"]],
    where: {
      publicado: 1
    }
  }).then((posts)=> {
    
    res.render("home",
    {
      posts: posts
    });
  });
});

app.post(`/`, (req, res)=>{
  let token = req.body.token
  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,

    }); 
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log(payload);
  }
  verify()
  .then(()=>{
    res.cookie('session-token', token );
    res.send('success');
  }).catch(console.error);
})

app.get('/logout', (req, res)=>{
  res.clearCookie('session-token');
  res.redirect('/');
})
app.get('/perfil', checkAuthenticated, (req, res)=>{
  let user = req.user;

  res.render("perfil", {
    user
  });
})

app.get(`/cad`, checkAuthenticated, function(req, res) {
  let user = req.user;
  res.render("form", {user});
});

app.post(`/add`, checkAuthenticated, function(req, res) {
  Post.create({
    autor: req.body.autor,
    email: req.body.email,
    foto: req.body.foto,
    slug: req.body.slug,
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    conteudo: req.body.conteudo,
    publicado: req.body.publicado,
  })
    .then(function() {
      res.redirect(`/`);
    })
    .catch(function(erro) {
      res.send(`falha ao criar post: ` + erro);
    });
});

app.post(`/update/:id`, checkAuthenticated, function(req, res) {
  const id = req.params.id;

  Post.update(req.body, {
    where: {
      id: id,
    },
  })
    .then(function() {
      res.redirect(`/`);
    })
    .catch(function(erro) {
      res.send(`falha ao atualizar post: ` + erro);
    });
});

app.get(`/edit/:id`, checkAuthenticated, function(req, res) {
  
  Post.findAll({
    where: {
      id: req.params.id,
    },
  }).then((post, user)=> {
    var user = req.user;
    res.render("edit", {
      edit: post,
      info: {user}
    });
  });
});

app.get(`/deletar/:id`, function(req, res) {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(function() {
      res.redirect(`/`);
    })
    .catch(function(erro) {
      res.send("Erro ao deletar posategem!" + erro);
    });
});

app.get(`/posts/:slug`, function(req, res) {
  Post.findAll({
    where: {
      slug: req.params.slug,
    },
  }).then(function(post) {
    res.render("posts", {
      posts: post,
    });
  });
});

function checkAuthenticated(req, res, next){

  let token = req.cookies['session-token'];

  let user = {};
  async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      user.name = payload.name;
      user.email = payload.email;
      user.picture = payload.picture;
    }
    verify()
    .then(()=>{
        req.user = user;
        next();
    })
    .catch(err=>{
        res.redirect('/')
    })

}


app.listen(process.env.PORT || 8005, function() {
  console.log(`Servidor Rodando`);
});
