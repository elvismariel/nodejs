const Sequelize = require('sequelize');

/* Conexão com o banco de dados */
const sequelize = new Sequelize('postapp', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize.authenticate().then(function(){
  console.log('Conectado com sucesso!');
}).catch(function(erro){
  console.log('Falha ao se conectar: ' + erro);
})

/* Exportação dos modulos */
module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}

/* Tabela de Modelo no banco de dados
const Postagem = sequelize.define('postagens', {
  titulo: {
    type: Sequelize.STRING
  },
  conteudo:{
    type: Sequelize.TEXT
  }
})
*/

/* Exemplo de insert na tabela Postagem
Postagem.create({
  titulo: 'Post 1',
  conteudo: 'Teste de insert'
})
*/

/* Tabela de Modelo no banco de dados
const Usuario = sequelize.define('usuarios', {
  nome: {
    type: Sequelize.STRING
  },
  sobrenome: {
    type: Sequelize.STRING
  },
  idade: {
    type: Sequelize.INTEGER
  },
  email: {
    type: Sequelize.STRING
  }
})
*/

/* Exemplo de insert na tabela Usuario
Usuario.create({
  nome: 'Elvis',
  sobrenome: 'Carvalho',
  idade: 34,
  email: 'elvis@gmail.com'
})
*/

/* Executa a criação das tabelas no banco de dados */
//Postagem.sync({force: true})
//Usuario.sync({force: true})
