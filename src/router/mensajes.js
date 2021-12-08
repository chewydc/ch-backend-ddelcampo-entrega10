//-------------------------------------------------------------------
// Entregable 10: Formulario Log-In
// Fecha de entrega: 03-13-21
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const {Router} = require('express')
const routerMensajes = new Router()

const ContenedorMsjs = require('./ContenedorArchivo')
const mensajesApi = new ContenedorMsjs("./DB/mensajes.txt")

// Normalizacion
const { normalize,schema } = require('normalizr');
const authorNormalizerSchema = new schema.Entity('author',{},{
    idAttribute: 'mail'
})
const textNormalizerSchema = new schema.Entity('text',{author: authorNormalizerSchema}, {idAttribute: 'id'} )
const messagesNormalizerSchema = [textNormalizerSchema];


//-------------------------------------------
// Rutas de la api rest Mensajes
routerMensajes.get('/', async (req, res) => {
    let msjs= await mensajesApi.getAll()
    res.json(normalize(msjs, messagesNormalizerSchema, {idAttribute: 'email'}))
  })
routerMensajes.post('/', async (req, res) => {
    res.json(` ${await mensajesApi.save(req.body)}!`)
  })

module.exports={routerMensajes}