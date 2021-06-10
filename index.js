const express = require('express');
const app = express();
const Post = require('./models/Post')
const handlebars = require('express-handlebars');
require('dotenv').config()

// Config
// Template Engine
app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
// BodyParser
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())
// Rotas
app.get(`/cad`, function (req, res) {
  res.render('form')
})
app.get(`/`, function (req, res) {
  Post.findAll(({order: [['id','DESC']]})).then(function(posts){
    res.render('home', {posts: posts})

  })
})
app.post(`/add`, function (req, res) {
  Post.create({
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    conteudo: req.body.conteudo
  }).then(function () {
    res.redirect(`/`)
  }).catch(function (erro) {
    res.send(`falha ao criar post: `+ erro)
  })

})

app.get(`/deletar/:id`, function(req, res){
  Post.destroy({where: {'id': req.params.id}}).then(function (){
    res.redirect(`/`)
  }).catch(function (erro){
    res.send('Erro ao deletar posategem!' + erro)
  })
})

app.get(`/posts/:titulo`, function (req, res) {
  Post.findAll({where: {'titulo': req.params.titulo}}).then(function(post){
    res.render('posts', {posts: post})

  })
})

app.listen(process.env.PORT || 8005, function () {
  console.log(`Servidor Rodando`)
})