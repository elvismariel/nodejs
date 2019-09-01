const mongoose = require("mongoose")
const Schema = mongoose.Schema;

/* Definindo o model Categoria */
const Usuario = new Schema({
  nome: {
    type: String, required: true
  },
  email: {
    type: String, required: true
  },
  admin:{
    type: Number, default: 0
  },
  senha: {
    type: String, required: true
  }
})

mongoose.model('usuarios', Usuario)
