const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
    console.log("ok");
});

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
app.use("/files", express.static(path.resolve(__dirname, "..","tmp"))); // Libera acesso aos arquivos staticos da pasta tmp

server.listen(3333);