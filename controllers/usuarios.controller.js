const { usuario, rol, Sequelize } = require('../models')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

let self = {}

self.getAll = async function (req, res) {
    const email = req.params.email
    const data = await usuario.findOne({
        where: { email: email },
        raw: true,
        attributes: ['id', 'email', 'nombre', [Sequelize.col('rol.nombre'), 'rol']],
        include: { model: rol, attributes: [] }
    })
    return res.status(200).json(data)
}

self.get = async function (req, res) {
    const email = req.params.email
    const data = await usuario.findOne({
        where: { email: email },
        raw: true,
        attributes: ['id', 'email', 'nombre', [Sequelize.col('rol.nombre'), 'rol']],
        include: { model: rol, attributes: [] }
    })
    if (data)
        return res.status(200).json(data)
    return res.status(404).send()
}

self.create = async function (req, res) {
    try {
        const rolusuario = await rol.findOne({where: { nombre: req.body.rol }})
        console.log(rolusuario.id)

        const data = await usuario.create({
            id: crypto.randomUUID(),
            email: req.body.email,
            passwordhash: await bcrypt.hash(req.body.password, 10),
            nombre: req.body.nombre,
            rolid: rolusuario.id,
        })
        return res.status(201).json({
            id: data.id,
            email: data.email,
            nombre: data.nombre,
            rolid: rolusuario.nombre
        })
    } catch (error) {
        console.log(error)
    }
}

self.update = async function (req, res) {
    
}

self.delete = async function (req, res) {}

module.exports = self
