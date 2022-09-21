const knex = require('../connection');
const loginSchema = require('..');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const { email, senha } = req.body
    try{
        
        const selectUser = await knex('users').where('email', email).first();

        if(selectUser === undefined){
            return res.status(400).json("Este email não está cadastrado, por favor crie uma conta em nosso banco!")
        }

        const verifyPassword = await bcrypt.compare(senha, selectUser.senha) 

        const token = await jwt.sign({ id: selectUser.id }, "yamin", { expiresIn: '8h' });
    
        return res.status(200).json({
            nome: selectUser.nome,
            email: selectUser.email,
            id: selectUser.id,
            token: token
        })
    } catch (error){
        return res.status(500).json(error.message)
    }
}

module.exports = login