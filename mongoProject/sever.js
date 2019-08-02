const mongoose = require('mongoose')

/* Configuração do Mongoose */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mongoproject', {
  useNewUrlParser: true
}).then(() => {
  console.log('Conectado com sucesso!');
}).catch((erro) => {
  console.log('Ocorreu um erro ao se conectar com o mongodb: ' + erro);
})

/* Definindo o model Usuario */
const UsuarioSchema = mongoose.Schema({
  nome: {
    type: String, require: true
  },
  sobrenome: {
    type: String, require: true
  },
  email: {
    type: String, require: true
  },
  idade: {
    type: Number, require: true
  },
  pais: {
    type: String
  }
})

/* Criando a collection usuarios e passando o model UsuarioSchema */
mongoose.model('usuarios', UsuarioSchema)

/* Criando uma referencia da collection usuarios */
const Usuario = mongoose.model('usuarios')

/* Criação de um novo usuário na collection usuarios */
new Usuario({
  nome: "Elvis",
  sobrenome: "Mariel",
  email: "elvis@test.com",
  idade: 34,
  pais: "Brasil"
}).save().then(() => {
  console.log('Usuario criado com sucesso');
}).catch((erro) => {
  console.log('Ocorreu um erro ao registrar o usuário no banco mongo');
})
