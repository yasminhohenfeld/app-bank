const knex = require('../connection');
const jwt = require('jsonwebtoken');
const depositSchema = require('../validations/depositSchemas');
const bcrypt = require('bcrypt')


const deposit = async (req, res) =>{
    const { authorization } = req.headers
    const token = authorization.substring(7);
    const {id} = jwt.verify(token, 'yamin');

    try{        
        await depositSchema.validate(req.body);
        const selectUser = await knex('users').where("id", id).first();

        const verifyPassword = await bcrypt.compare(req.body.senha, selectUser.senha);


        if (verifyPassword === false){
            return res.status(400).json("Senha incorreta!")
        }

        const addSaldo = req.body.valor + selectUser.saldo

        const updateBalance = await knex('users').update('saldo', addSaldo).where({ id })

        return res.status(200).send (`Depósito de ${req.body.valor} realizado, obrigada por usar o nosso banco, ${selectUser.nome}!`)
    } catch (error){
        return res.status(500).json(error.message)
    }
   
}

module.exports = deposit