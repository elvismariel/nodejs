const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")

router.get("/login", (req, res) => {
  res.render("usuario/login")
})

router.get("/registro", (req, res) => {
  res.render("usuario/registro")
})

router.post("/registro", (req, res) => {
  var erros = []

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
    erros.push({texto: "Nome inválido"})
  }
  if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
    erros.push({texto: "Email inválido"})
  }
  if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
    erros.push({texto: "Senha inválido"})
  }
  if(req.body.senha.length < 4){
    erros.push({texto: "Senha muito curta"})
  }
  if(req.body.senha != req.body.senha2){
    erros.push({texto: "As senha são diferentes, tente novamente!"})
  }

  if(erros.length > 0){
    res.render("usuario/registro", {erros: erros})
  }else{
    Usuario.findOne({email: req.body.email}).then((usuario) =>{
      if(usuario){
        req.flash("error_msg", "Já existe uma conta cadastrada para esse e-mail")
        res.redirect("/usuario/registro")
      }else{
        const usuario = new Usuario({
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha
        })

        bcrypt.genSalt(10, (erro, salt) => {
          bcrypt.hash(usuario.senha, salt, (erro, hash) => {
            if(erro){
              req.flash("error_msg", "Houve um erro ao tentar salvar o usuário")
              res.redirect("/")
            }
            usuario.senha = hash
            usuario.save().then(() => {
              req.flash("success_msg", "Usuario registrado com sucesso!")
              res.redirect("/")
            }).catch((err) =>{
              req.flash("error_msg", "Erro ao tentar criar o usuário")
              res.redirect("/usuario/registro")
            })
          })
        })
      }
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao validar o usuário")
      res.redirect("/")
    })
  }
})

router.get("/login", (req, res) => {
  res.render("usuario/login")
})

module.exports = router
