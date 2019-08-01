const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post')

// Config
  // Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

  // Body parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

// Rotas
  /* Pagina home */
  app.get('/', (req, res) => {
    Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
      res.render('home', {posts: posts})
      //res.render('home', {nome: 'victor', conteudo: 'teste de conteudo'})
    })
  })

  /* Pagina de Formulário de cadastro */
  app.get('/cad', (req, res) => {
    res.render('formulario')
    //res.send('Rota de cadastro de posts')
  })

  /* Recebe os dados do formulário e cadastra no banco de dados */
  app.post('/add', (req, res) => {
    Post.create({
      titulo: req.body.titulo,
      conteudo: req.body.conteudo
    }).then(() => {
      console.log('Post criado com sucesso!')
      res.redirect('/')
    }).catch(() => {
      res.send('Houve um erro: ' + erro)
    })
  })

  /* Remove postagem */
  app.get('/del/:id', (req, res) => {
    Post.destroy({where: {'id': req.params.id}}).then(() => {
      res.send('Postagem deletada com sucesso')
    }).catch((erro) => {
      res.send('Postagem não existe!')
    })
  })





app.listen(3000, function(){
  console.log('Servidor Rodando na porta 3000');
});
