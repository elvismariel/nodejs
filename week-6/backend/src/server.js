const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb://localhost/dropbox', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao mongo com sucesso!');
}).catch((erro) => {
    console.log('Ocorreu um erro ao se conectar com o mongodb: ' + erro);
})

app.use(express.json());    // Define que vai trabalhar com Json
app.use(express.urlencoded({extended: true }));  // Define que vai ser usado arquivos de upload
app.use(require('./routes')); // Define a importacao do arquivo de rotas

app.listen(3333);