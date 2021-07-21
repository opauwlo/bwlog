const express = require("express");
const Sequelize = require("sequelize");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const slugify = require("slugify");
const random = require("./public/js/slugNumbers");
const Post = require("./models/Post");
const seedrandom = require("seedrandom");
const session = require("express-session");
const flash = require("connect-flash");
const moment = require("moment");
const Op = Sequelize.Op;
const app = express();
// Google
const CLIENT_ID = process.env.CLIENT_ID;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);
require("./public/js/auth");
require("dotenv").config();

// Configs
//Session
app.use(
  session({
    secret: "88442211pV#",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
//Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");  
  next();
});
// Random
rng = seedrandom("adddsdddsfs437adsasadsd dsdsa.", {
  entropy: true,
});

//static
app.use(express.static(__dirname + "/public"));

// Template
app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
    helpers: {
      formatDate: (createdAt) => {
        return moment(createdAt).format("DD/MM/YYYY");
      },
    },
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
//home
//render the home
app.get(`/`, (req, res) => {
  Post.findAll({
    order: [["id", "DESC"]],
    where: {
      publicado: true,
    },
  }).then((posts) => {
    res.render("home", {
      posts: posts,
    });
  });
});
//get login infos s
app.post(`/`, (req, res) => {
  let token = req.body.token;
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
  }
  verify()
    .then(() => {
      res.cookie("session-token", token);
      res.send("success");
    })
    .catch(console.error);
});

//login page
app.get("/login", (req, res) => {
  res.render("login");
});

//logout for clean coockie session
app.get("/logout", (req, res) => {
  res.clearCookie('session-token');
  res.clearCookie('G_AUTHUSER_H');
  res.redirect("/login");
});

//profile page
app.get("/perfil", checkAuthenticated, (req, res) => {
  let user = req.user;
  Post.findAll({
    order: [["id", "DESC"]],
    where: {
      id_user: user.sub,
    },
  }).then((posts) => {
    res.render("perfil", {
      posts: posts,
      user: user,
    });
  });
});

//profile public page
app.get("/autor/:id_user", (req, res) => {
  const id = req.params.id_user;
  Post.findAll({
    order: [["id", "DESC"]],
    where: {
      id_user: id,
      publicado: true,
    },
  }).then((posts) => {
    res.render("autor", {
      posts: posts,
    });
  });
});

//page to creat posts
app.get(`/cad`, checkAuthenticated, (req, res) => {
  let user = req.user;
  res.render("form", {
    user,
  });
});

//page to send your posts infos
app.post(`/add`, checkAuthenticated, (req, res) => {
  let user = req.user;
  Post.create({
    autor: user.name,
    email: user.email,
    foto: user.picture,
    titulo: req.body.titulo,
    slug: slugify(req.body.titulo + - + random(), {
      lower: true,
    }),
    descricao: req.body.descricao,
    conteudo: req.body.conteudo,
    publicado: req.body.publicado,
    editado: req.body.editado,
    id_user: user.sub,
  })
    .then(() => {
      req.flash("success_msg", "Publicado com sucesso :)");
      res.redirect(`/perfil`);
    })
    .catch(() => {
      req.flash(
        "erro_msg",
        " Houve um erro, não foi possível fazer a publicação:("
      );
      res.redirect(`/cad`);
    });
});

//page to show a post from somone else
app.get(`/posts/:slug`, (req, res) => {

  Post.findAll({
    where: {
      slug: req.params.slug,
      publicado: true
    }
  })
    .then(function(post, comments) {
      res.render("posts", {
        posts: post,
        comments: comments
      });
    });
});

app.get(`/posts/preview/:slug`, (req, res) => {
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
//page to insert new infos in some post
app.get(`/edit/:id`, checkAuthenticated, (req, res) => {
  Post.findAll({
    where: {
      id: req.params.id,
    },
  }).then((post, user) => {
    var user = req.user;
    res.render("edit", {
      edit: post,
      info: {
        user,
      },
    });
  });
});

//page to post posts updates
app.post(`/update/:id`, checkAuthenticated, (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: {
      id: id,
    },
  })
    .then(() => {
      req.flash("success_msg", "Atualizado com sucesso :)");
      res.redirect(`/perfil`);
    })
    .catch(() => {
      req.flash(
        "erro_msg",
        " Houve um erro, não foi possível fazer a publicação:("
      );
      res.redirect(`/edit/:id`);
    });
});

//page to delet some post
app.post(`/deletar/:id`, (req, res) => {
  Post.destroy({
    where: {
      slug: req.params.id,
    },
  })
    .then(() => {
      res.redirect(`/perfil`);
    })
    .catch(function(erro) {
      res.send("Erro ao deletar posategem!" + erro);
    });
});

//function to auth
function checkAuthenticated(req, res, next) {
  let token = req.cookies["session-token"];

  let user = {};
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    user.name = payload.name;
    user.sub = payload.sub;
    user.email = payload.email;
    user.picture = payload.picture;
  }
  verify()
    .then(() => {
      req.user = user;
    
      next();
    })
    .catch((err) => {
      res.redirect(`/login`)
    });
}
//404
app.get(`*`, (req, res) => {
  let { term } = req.query;
  res.render("404");
});
app.listen(process.env.PORT || 8000, () => {
  console.log(`Servidor Rodando`);
});
