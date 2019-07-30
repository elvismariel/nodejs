const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');


// Config
  // Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

  // Body parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

  // Conexão com o banco de dados
  const sequelize = new Sequelize('cadastro', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  })

// Rotas
  app.get('/cad', (req, res) => {
    res.render('formulario')
    //res.send('Rota de cadastro de posts')
  })

  app.post('/add', (req, res) => {
    req.body.conteudo

    res.send('Formulario recebido: ' + req.body.conteudo)
  })






app.listen(3000, function(){
  console.log('Servidor Rodando na porta 3000');
});
