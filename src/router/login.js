//-------------------------------------------------------------------
// Entregable 10: Formulario Log-In
// Fecha de entrega: 03-13-21
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const {Router} = require('express')
const routerLogin = new Router()
const express = require('express')
routerLogin.use(express.json())
routerLogin.use(express.urlencoded({ extended: true }))
const {usuarios} = require("./register")


routerLogin.get('/user', (req, res) => {
    const usuario = usuarios.find(usuario => usuario.nombre == req.session.nombre)
    if (!usuario) {
      res.json("no se encontro usuario logueado")
    }
    res.json({nombre: usuario.nombre, direccion: usuario.direccion})
})
  
// LOGIN
routerLogin.get('/', (req, res) => {
  res.sendFile('login.html', { root: './public/login' })
})

routerLogin.post('/', (req, res) => {
  const { nombre, password } = req.body
  const usuario = usuarios.find(usuario => usuario.nombre == nombre && usuario.password == password)
  if (!usuario) {
    return res.redirect('login-error');
  }
  req.session.nombre = nombre
  res.redirect("/")
})



module.exports={routerLogin}