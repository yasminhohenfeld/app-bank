const knex = require('../connection');
const depositSchema = require('../validations/depositSchemas');
const bcrypt = require('bcrypt')


const deposit = async (req, res) =>{
    
    const id = req.user 
    try{        
        await depositSchema.validate(req.body);
        const selectUser = await knex('users').where("id", id).first();

        const verifyPassword = await bcrypt.compare(req.body.senha, selectUser.senha);


        if (verifyPassword === false){
            return res.status(400).json("Senha incorreta!")
        }

        const saldo = req.body.valor + selectUser.saldo

        const updateBalance = await knex('users').update('saldo', saldo).where({ id })

        return res.status(200).send (`Depósito de ${req.body.valor} realizado, obrigada por usar o nosso banco, ${selectUser.nome}!`)
    } catch (error){
        return res.status(500).json(error.message)
    }
   
}

module.exports = deposit