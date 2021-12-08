//-------------------------------------------------------------------
// Entregable 10: Formulario Log-In
// Fecha de entrega: 03-13-21
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const {Router} = require('express')
const routerRegister = new Router()
const express = require('express')
routerRegister.use(express.json())
routerRegister.use(express.urlencoded({ extended: true }))

const usuarios = []

/******************  ROUTES  ******************/
// REGISTER
routerRegister.get('/', (req, res) => {
    res.sendFile('register.html', { root: './public/login' })
})

routerRegister.post('/', (req, res) => {
    const { nombre, password, direccion } = req.body
    const usuario = usuarios.find(usuario => usuario.nombre == nombre)
    if (usuario) {
        return res.render('register-error');
    }
    usuarios.push({ nombre, password, direccion })
    res.redirect('/login')
})
  
module.exports={routerRegister, usuarios}