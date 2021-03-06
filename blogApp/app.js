const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routers/admin')
const usuario = require('./routers/usuario')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

require("./models/Postagem")
const Postagem = mongoose.model("postagens")

require("./models/Categoria")
const Categoria = mongoose.model("categorias")

// Carrega os arquivos de autentificacao
const passport = require("passport")
require("./config/auth")(passport)

// Config
  // Sessão
    app.use(session({
      secret: "cursodenode",
      resave: true,
      saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    /* Middleware */
    app.use((req, res, next) => {
      res.locals.success_msg = req.flash("success_msg")
      res.locals.error_msg = req.flash("error_msg")
      next()
    })

  // Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

  // Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

  // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/blogApp', {
      useNewUrlParser: true
    }).then(() => {
      console.log('Conectado ao mongo com sucesso!');
    }).catch((erro) => {
      console.log('Ocorreu um erro ao se conectar com o mongodb: ' + erro);
    })

  // Public mapeamento dos arquivos staticos css, js ...
  app.use(express.static(path.join(__dirname, 'public')))

// Rotas
  app.get("/", (req, res) => {
    Postagem.find().populate("categoria").sort({data: "desc"}).then((postagens) => {
      res.render("index", {postagens: postagens})
    }).catch((err) =>{
      req.flash("error_msg", "Houve um erro interno")
      res.redirect("/404")
    })
  })

  app.get("/postagem/:slug", (req, res) => {
    Postagem.findOne({slug: req.params.slug}).then((postagem) => {
      if(postagem){
        res.render("postagem/index", {postagem: postagem})
      }else{
        req.flash("error_msg", "Essa postagem nao existe!")
        res.redirect("/")
      }
    }).catch((err) =>{
      req.flash("error_msg", "Erro ao buscar a postagem")
      res.redirect("/")
    })
  })

  app.get("/categorias", (req, res) => {
    Categoria.find().then((categorias) => {
      res.render("categorias/index", {categorias: categorias})
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao listar as categorias")
      res.redirect("/")
    })
  })

  app.get("/categorias/:slug", (req, res) => {
    Categoria.findOne({slug: req.params.slug}).then((categoria) => {
      if(categoria){
        Postagem.find({categoria: categoria.id}).then((postagens) => {
          res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
        }).catch((err) =>{
          req.flash("error_msg", "Houve um erro ao listar as postagens")
          res.redirect("/")
        })
      }else{
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/")
      }
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao carregar a pagina desta categoria")
      res.redirect("/")
    })
  })

  app.get("/404", (req, res) => {
    res.send("Erro 404!")
  })

  app.use('/admin', admin)
  app.use('/usuario', usuario)




// Outros
const PORT = 8081
app.listen(PORT, () => {
  console.log('O servidor está rodando!')
})
