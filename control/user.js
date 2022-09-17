const knex = require('../connection');
const { registerUserSchema } = require('../validations/userSchemas');
const bcrypt = require('bcrypt');


const createUser = async (req, res) => {
    const { nome, email, senha, cpf } = req.body
    try {
        await registerUserSchema.validate(req.body)
    
        const selectUser = await knex('users').where('email', email).first();

        if(selectUser !== undefined){
            return res.status(400).json("Este email já está cadastrado no banco")
        }

        const passwordEncrypted = await bcrypt.hash(senha, 10);

        const userData = {
            nome, email, senha: passwordEncrypted, cpf, saldo: 0
        }

        const insertUser = await knex('users').insert(userData);

        return res.status(200).json(`Bem-vindo ${nome}, cadastrado com sucesso!!`)

    return res.send("Rota ok")
    } catch (error){
        return res.status(500).json(error.message)
    }
}

const getUser = async (req, res) => {
    return res.send("Rota ok")
}

const updateUser = async (req, res) => {
    return res.send("Rota ok")
}

const deleteUser = async (req, res) => {
    return res.send("Rota ok")
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}