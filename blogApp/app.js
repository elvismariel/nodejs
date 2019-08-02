const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routers/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

// Config
  // Sessão
    app.use(session({
      secret: "cursodenode",
      resave: true,
      saveUninitialized: true
    }))
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
  app.use('/admin', admin)

// Outros
const PORT = 8081
app.listen(PORT, () => {
  console.log('O servidor está rodando!')
})
